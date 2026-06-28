// ballot-generator.ts
import {
  AlignmentType,
  BorderStyle,
  convertMillimetersToTwip,
  Document,
  ImageRun,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
} from 'docx';
import * as QRCode from 'qrcode';

const FONT = 'Times New Roman';
const MARGIN_MM = 15;
const PAGE_W_MM = 210;
const USABLE_W_MM = PAGE_W_MM - 2 * MARGIN_MM;

// x = 20mm — сторона QR-ячейки и ячеек голосования
// Отступ QR→За = 10% x = 2mm; между ячейками = 5% x = 1mm
// [QR(x), текст, gap(0.1x), За(x), gap(0.05x), Против(x), gap(0.05x), Воздержался(x)]
const QR_CELL_SIZE_MM = 20;
const COLUMN_WIDTHS = [
  QR_CELL_SIZE_MM, // col0: QR-код строки
  96, // col1: текст вопроса
  2, // col2: отступ 10% x
  QR_CELL_SIZE_MM, // col3: ЗА
  1, // col4: отступ 5% x
  QR_CELL_SIZE_MM, // col5: ПРОТИВ
  1, // col6: отступ 5% x
  QR_CELL_SIZE_MM, // col7: ВОЗДЕРЖАЛСЯ
];

const FONT_SIZES = {
  xs: 14,
  sm: 16,
  md: 18,
  nm: 20,
  lg: 24,
  xl: 28,
  title: 32,
};

function millimetersToTwips(value: number): number {
  return convertMillimetersToTwip(value);
}

function createColumnWidth(mm: number) {
  return { size: millimetersToTwips(mm), type: WidthType.DXA };
}

function millimetersToPixels(mm: number): number {
  return Math.round((mm * 96) / 25.4);
}

function sanitizeText(input: string | null | undefined): string {
  if (!input) {
    return '';
  }

  let result = String(input);
  result = result.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  result = result.replace(/[""]/g, '"');
  result = result.replace(/['']/g, "'");
  result = result.replace(/\s+/g, ' ').trim();

  return result;
}

function createSafeTextRun(
  text: string | null | undefined,
  options: {
    bold?: boolean;
    size?: number;
    italic?: boolean;
    color?: string;
  } = {},
): TextRun {
  const safeText = sanitizeText(text);

  return new TextRun({
    text: safeText || ' ',
    font: FONT,
    size: options.size ?? FONT_SIZES.nm,
    bold: options.bold,
    italics: options.italic,
    color: options.color,
  });
}

const BORDER_NONE = { style: BorderStyle.NONE, size: 0, color: 'auto' };
const BORDER_THICK = { style: BorderStyle.SINGLE, size: 4, color: '000000' };

const BORDERS_NONE = {
  top: BORDER_NONE,
  bottom: BORDER_NONE,
  left: BORDER_NONE,
  right: BORDER_NONE,
};

const BORDERS_ALL = {
  top: BORDER_THICK,
  bottom: BORDER_THICK,
  left: BORDER_THICK,
  right: BORDER_THICK,
};

async function generateQRCode(data: string, sizePx = 120): Promise<Buffer> {
  try {
    return await QRCode.toBuffer(data, {
      width: sizePx,
      margin: 2,
      errorCorrectionLevel: 'H',
      color: { dark: '#000000', light: '#ffffff' },
    });
  } catch (error) {
    console.error('QR generation error:', error);
    return Buffer.from('');
  }
}

function createParagraph(
  children: TextRun[],
  alignment: string = AlignmentType.LEFT,
  spacing = 0,
): Paragraph {
  return new Paragraph({
    alignment: alignment as any,
    spacing: { before: spacing, after: spacing },
    children: children.length > 0 ? children : [createSafeTextRun(' ')],
  });
}

function createEmptyParagraph(): Paragraph {
  return new Paragraph({
    children: [createSafeTextRun(' ', { size: FONT_SIZES.sm })],
  });
}

function createTableCell(
  children: (Paragraph | Table)[],
  options: {
    span?: number;
    widthMm?: number;
    borders?: object;
    verticalAlign?: string;
    fill?: string;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
  } = {},
): TableCell {
  const cellChildren =
    children.length > 0 ? children : [createEmptyParagraph()];

  return new TableCell({
    children: cellChildren,
    columnSpan: options.span || 1,
    width:
      options.widthMm !== undefined
        ? createColumnWidth(options.widthMm)
        : undefined,
    borders: options.borders ?? BORDERS_ALL,
    verticalAlign: (options.verticalAlign ?? VerticalAlign.CENTER) as any,
    shading: options.fill
      ? { fill: options.fill, type: ShadingType.CLEAR, color: options.fill }
      : undefined,
    margins: {
      top: options.marginTop ?? 40,
      bottom: options.marginBottom ?? 40,
      left: options.marginLeft ?? 80,
      right: options.marginRight ?? 80,
    },
  });
}

function createQRCell(
  buffer: Buffer,
  sizeMm: number,
  options: {
    span?: number;
    borders?: object;
    fill?: string;
  } = {},
): TableCell {
  if (!buffer || buffer.length === 0) {
    return createTableCell(
      [
        createParagraph(
          [createSafeTextRun('[QR]', { size: FONT_SIZES.sm })],
          AlignmentType.CENTER,
        ),
      ],
      {
        span: options.span || 1,
        borders: options.borders ?? BORDERS_ALL,
        fill: options.fill,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
      },
    );
  }

  const sizePx = millimetersToPixels(sizeMm);

  try {
    return new TableCell({
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new ImageRun({
              data: buffer,
              type: 'png',
              transformation: { width: sizePx, height: sizePx },
            } as any),
          ],
        }),
      ],
      columnSpan: options.span || 1,
      borders: options.borders ?? BORDERS_ALL,
      verticalAlign: VerticalAlign.CENTER,
      margins: { top: 10, bottom: 10, left: 10, right: 10 },
      shading: options.fill
        ? { fill: options.fill, type: ShadingType.CLEAR, color: options.fill }
        : undefined,
    });
  } catch (error) {
    console.error('Error creating QR cell:', error);

    return createTableCell(
      [
        createParagraph(
          [createSafeTextRun('[QR Error]', { size: FONT_SIZES.sm })],
          AlignmentType.CENTER,
        ),
      ],
      {
        span: options.span || 1,
        borders: options.borders ?? BORDERS_ALL,
        fill: options.fill,
      },
    );
  }
}

function createTableRow(cells: TableCell[], heightMm?: number): TableRow {
  return new TableRow({
    children: cells,
    tableHeader: false,
    height: heightMm
      ? { value: millimetersToTwips(heightMm), rule: 'atLeast' }
      : undefined,
  });
}

function formatSnils(input: string | null | undefined): string {
  if (!input) {
    return '';
  }

  const digits = input.replace(/\D/g, '');

  if (digits.length === 11) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 9)} ${digits.slice(9, 11)}`;
  }

  return sanitizeText(input);
}

function formatDate(value: string | Date | null | undefined): string {
  if (!value) {
    return '';
  }

  try {
    const date = new Date(value);

    if (isNaN(date.getTime())) {
      return sanitizeText(String(value));
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  } catch {
    return sanitizeText(String(value));
  }
}

function getInitials(fullName: string): string {
  const parts = (fullName || '').trim().split(/\s+/);

  if (parts.length < 2) {
    return fullName || '';
  }

  const [lastName, firstName, middleName] = parts;
  const firstNameInitial = firstName ? firstName[0] + '.' : '';
  const middleNameInitial = middleName ? middleName[0] + '.' : '';

  return `${lastName} ${firstNameInitial}${middleNameInitial}`;
}

function getSnilsGroups(snils: string | null | undefined): string[] {
  if (!snils) {
    return ['   ', '   ', '   ', '  '];
  }

  const digits = snils.replace(/\D/g, '');

  if (digits.length === 11) {
    return [
      digits.slice(0, 3),
      digits.slice(3, 6),
      digits.slice(6, 9),
      digits.slice(9, 11),
    ];
  }

  return ['   ', '   ', '   ', '  '];
}

export async function generateBallotBuffer(
  meeting: {
    id: string;
    number: string | null;
    building: { address: string };
    startDate: string | Date | null;
    endDate: string | Date | null;
    agendaItems: Array<{
      id: string;
      orderNumber: number;
      customBulletinText?: string | null;
      customProtocolText?: string | null;
      question?: {
        bulletinText?: string | null;
        shortTitle?: string | null;
      } | null;
    }>;
  },
  owner: {
    id: string;
    fullName: string;
    snils?: string | null;
    ownershipRights: Array<{
      share?: string | null;
      registrationDate?: string | null;
      titleDocument?: string | null;
      premise?: {
        number?: string | null;
        area?: number | null;
        cadastralNumber?: string | null;
      } | null;
    }>;
  },
): Promise<Buffer> {
  const safeMeeting = {
    id: meeting?.id || 'unknown',
    number: meeting?.number || '1',
    building: { address: meeting?.building?.address || 'Адрес не указан' },
    startDate: meeting?.startDate || null,
    endDate: meeting?.endDate || null,
    agendaItems: meeting?.agendaItems || [],
  };

  const safeOwner = {
    id: owner?.id || 'unknown',
    fullName: owner?.fullName || 'Собственник',
    snils: owner?.snils || null,
    ownershipRights: owner?.ownershipRights || [{ share: '1/1' }],
  };

  const rights = safeOwner.ownershipRights[0] || {};
  const premise = rights?.premise || {};
  const address = safeMeeting.building.address;

  const qrData = `B|${safeMeeting.id.split('-')[0]}|${safeOwner.id.split('-')[0]}`;
  const snilsQR = await generateQRCode(qrData, 120);
  const headerQR = await generateQRCode(qrData, 120);

  const questionQRs: Buffer[] = [];

  for (const item of safeMeeting.agendaItems) {
    const qr = await generateQRCode(
      `V|${safeMeeting.id.split('-')[0]}|${safeOwner.id.split('-')[0]}|${item.orderNumber}`,
      90,
    );
    questionQRs.push(qr);
  }

  const shareParts = (rights?.share ?? '1/1').split('/');
  const shareNumerator = shareParts[0]?.trim() || '1';
  const shareDenominator = shareParts[1]?.trim() || '1';

  const premiseArea = (() => {
    if (premise?.area == null) {
      return '';
    }

    if (Number.isInteger(premise.area)) {
      return String(premise.area);
    }

    return premise.area.toFixed(1);
  })();

  const premiseNumber = premise?.number || '';
  const premiseDisplayText =
    premiseNumber + (premiseArea ? ` (${premiseArea}м²)` : '');

  const registrationNumber = rights?.titleDocument || '';
  const registrationDate = formatDate(rights?.registrationDate);
  const cadastralNumber = premise?.cadastralNumber || '';

  let rightsDescription = 'Сведения о документе на право собственности: ';

  if (cadastralNumber) {
    rightsDescription += cadastralNumber + ', ';
  }

  if (registrationNumber) {
    rightsDescription += registrationNumber;
  }

  if (registrationDate) {
    rightsDescription += ` от ${registrationDate}`;
  }

  rightsDescription += `, доля ${shareNumerator}/${shareDenominator}`;

  const startDateFormatted = formatDate(safeMeeting.startDate);
  const endDateFormatted = formatDate(safeMeeting.endDate);

  const meetingPeriod =
    startDateFormatted && endDateFormatted
      ? `${startDateFormatted} по ${endDateFormatted}`
      : startDateFormatted || endDateFormatted || '';

  const snilsGroups = getSnilsGroups(safeOwner.snils);
  const ownerInitials = getInitials(safeOwner.fullName);

  const totalColumns = COLUMN_WIDTHS.length;
  const columnWidths = COLUMN_WIDTHS;

  const createFullSpanCell = (
    children: Paragraph[],
    options: {
      borders?: object;
      fill?: string;
      marginTop?: number;
      marginBottom?: number;
      marginLeft?: number;
      marginRight?: number;
    } = {},
  ) =>
    createTableCell(children, {
      span: totalColumns,
      borders: options.borders ?? BORDERS_ALL,
      fill: options.fill,
      marginTop: options.marginTop,
      marginBottom: options.marginBottom,
      marginLeft: options.marginLeft ?? 80,
      marginRight: options.marginRight ?? 80,
    });

  const createDigitCell = (character: string): TableCell => {
    return new TableCell({
      children: [
        createParagraph(
          [
            createSafeTextRun(character || ' ', {
              size: FONT_SIZES.nm,
              bold: true,
            }),
          ],
          AlignmentType.CENTER,
        ),
      ],
      width: createColumnWidth(7),
      borders: BORDERS_ALL,
      verticalAlign: VerticalAlign.CENTER,
      margins: { top: 20, bottom: 20, left: 20, right: 20 },
    });
  };

  const createSeparatorCell = (text: string): TableCell => {
    return new TableCell({
      children: [
        createParagraph(
          [createSafeTextRun(text || ' ', { size: FONT_SIZES.nm })],
          AlignmentType.CENTER,
        ),
      ],
      width: createColumnWidth(4),
      borders: BORDERS_NONE,
      verticalAlign: VerticalAlign.CENTER,
      margins: { top: 20, bottom: 20, left: 0, right: 0 },
    });
  };

  const snilsInnerTable = new Table({
    width: { size: millimetersToTwips(60), type: WidthType.DXA },
    borders: {
      top: BORDER_NONE,
      bottom: BORDER_NONE,
      left: BORDER_NONE,
      right: BORDER_NONE,
    },
    rows: [
      new TableRow({
        children: [
          ...Array.from(snilsGroups[0] || '   ').map((character) =>
            createDigitCell(character),
          ),
          createSeparatorCell('-'),
          ...Array.from(snilsGroups[1] || '   ').map((character) =>
            createDigitCell(character),
          ),
          createSeparatorCell('-'),
          ...Array.from(snilsGroups[2] || '   ').map((character) =>
            createDigitCell(character),
          ),
          createSeparatorCell(' '),
          ...Array.from(snilsGroups[3] || '  ').map((character) =>
            createDigitCell(character),
          ),
        ],
      }),
    ],
  });

  const rows: TableRow[] = [];

  rows.push(
    createTableRow([
      createFullSpanCell(
        [
          createParagraph(
            [
              createSafeTextRun('РЕШЕНИЕ СОБСТВЕННИКА', {
                bold: true,
                size: FONT_SIZES.xl,
              }),
            ],
            AlignmentType.CENTER,
            40,
          ),
          createParagraph(
            [
              createSafeTextRun(
                'по вопросам Общего собрания собственников помещений в многоквартирном доме',
                { size: FONT_SIZES.sm },
              ),
            ],
            AlignmentType.CENTER,
          ),
          createParagraph(
            [
              createSafeTextRun(`по адресу: ${address}`, {
                size: FONT_SIZES.sm,
              }),
            ],
            AlignmentType.CENTER,
          ),
          ...(meetingPeriod
            ? [
                createParagraph(
                  [
                    createSafeTextRun(
                      `проводимом в форме очно-заочного голосования в период с ${meetingPeriod}`,
                      { size: FONT_SIZES.sm },
                    ),
                  ],
                  AlignmentType.CENTER,
                ),
              ]
            : []),
        ],
        { marginTop: 60, marginBottom: 40 },
      ),
    ]),
  );

  rows.push(
    createTableRow(
      [
        createTableCell(
          [
            createParagraph(
              [
                createSafeTextRun('№ помещения', {
                  size: FONT_SIZES.sm,
                  italic: true,
                }),
              ],
              AlignmentType.CENTER,
            ),
          ],
          { span: totalColumns - 2, borders: BORDERS_ALL },
        ),
        createTableCell(
          [
            createParagraph(
              [
                createSafeTextRun('количество голосов', {
                  size: FONT_SIZES.xs,
                  italic: true,
                }),
              ],
              AlignmentType.CENTER,
            ),
          ],
          { span: 2, borders: BORDERS_ALL },
        ),
      ],
      8,
    ),
  );

  rows.push(
    createTableRow(
      [
        createTableCell(
          [
            createParagraph(
              [
                createSafeTextRun(premiseDisplayText || '—', {
                  bold: true,
                  size: FONT_SIZES.xl,
                }),
              ],
              AlignmentType.CENTER,
            ),
          ],
          { span: totalColumns - 2, borders: BORDERS_ALL },
        ),
        createTableCell(
          [
            createParagraph(
              [
                createSafeTextRun(premiseArea || '—', {
                  bold: true,
                  size: FONT_SIZES.lg,
                }),
              ],
              AlignmentType.CENTER,
            ),
          ],
          { span: 2, borders: BORDERS_ALL },
        ),
      ],
      10,
    ),
  );

  rows.push(
    createTableRow([
      createFullSpanCell(
        [
          createParagraph(
            [
              createSafeTextRun('Ф. И. О. собственника', {
                size: FONT_SIZES.xs,
                italic: true,
              }),
            ],
            AlignmentType.CENTER,
          ),
        ],
        { marginTop: 30, marginBottom: 10 },
      ),
    ]),
  );

  rows.push(
    createTableRow([
      createFullSpanCell(
        [
          createParagraph(
            [
              createSafeTextRun(safeOwner.fullName, {
                bold: true,
                size: FONT_SIZES.lg,
              }),
            ],
            AlignmentType.CENTER,
            20,
          ),
        ],
        { marginTop: 30, marginBottom: 30 },
      ),
    ]),
  );

  rows.push(
    createTableRow(
      [
        createQRCell(snilsQR, 15),
        createTableCell(
          [
            createParagraph(
              [createSafeTextRun('СНИЛС', { bold: true, size: FONT_SIZES.nm })],
              AlignmentType.CENTER,
            ),
          ],
          {
            borders: BORDERS_ALL,
            verticalAlign: VerticalAlign.CENTER,
            marginLeft: 60,
            marginRight: 40,
          },
        ),
        createTableCell([new Paragraph({ children: [] }), snilsInnerTable], {
          span: totalColumns - 2,
          borders: BORDERS_ALL,
          verticalAlign: VerticalAlign.CENTER,
        }),
      ],
      12,
    ),
  );

  rows.push(
    createTableRow(
      [
        createFullSpanCell(
          [
            createParagraph(
              [
                createSafeTextRun(
                  'Ф. И. О. представителя собственника / реквизиты документа',
                  { size: FONT_SIZES.xs, italic: true },
                ),
              ],
              AlignmentType.CENTER,
            ),
            createParagraph(
              [createSafeTextRun('', { size: FONT_SIZES.nm })],
              AlignmentType.LEFT,
            ),
          ],
          { borders: BORDERS_ALL, marginTop: 10, marginBottom: 10 },
        ),
      ],
      10,
    ),
  );

  rows.push(
    createTableRow([
      createFullSpanCell(
        [
          createParagraph(
            [createSafeTextRun(rightsDescription, { size: FONT_SIZES.sm })],
            AlignmentType.CENTER,
          ),
        ],
        { marginTop: 40, marginBottom: 40 },
      ),
    ]),
  );

  rows.push(
    createTableRow([
      createFullSpanCell(
        [
          createParagraph(
            [
              createSafeTextRun(
                'В каждом вопросе выберите ОДИН ответ, проставив знак "Х" в нужную ячейку.',
                {
                  bold: true,
                  size: FONT_SIZES.nm,
                },
              ),
            ],
            AlignmentType.CENTER,
            20,
          ),
          createParagraph(
            [
              createSafeTextRun('Остальные ячейки оставьте пустыми. ', {
                bold: true,
                size: FONT_SIZES.nm,
              }),
              createSafeTextRun(
                'Проставлять несколько ответов на один вопрос НЕЛЬЗЯ!',
                {
                  bold: true,
                  size: FONT_SIZES.nm,
                },
              ),
            ],
            AlignmentType.CENTER,
            0,
          ),
        ],
        { marginTop: 40, marginBottom: 40 },
      ),
    ]),
  );

  rows.push(
    createTableRow([
      createFullSpanCell(
        [
          createParagraph(
            [
              createSafeTextRun(
                `Передать заполненное решение вы можете: ${address}`,
                { size: FONT_SIZES.sm },
              ),
            ],
            AlignmentType.CENTER,
          ),
        ],
        { marginTop: 20, marginBottom: 20 },
      ),
    ]),
  );

  // ── Строка-заголовок секции голосования: QR слева и справа от названия ──────
  rows.push(
    createTableRow(
      [
        // col0: левый калибровочный QR бюллетеня
        createQRCell(headerQR, QR_CELL_SIZE_MM - 2, { borders: BORDERS_ALL }),
        // col1–col6 span: надпись + номер собрания по центру
        createTableCell(
          [
            createParagraph(
              [
                createSafeTextRun('Вопросы для голосования', {
                  bold: true,
                  size: FONT_SIZES.nm,
                }),
                createSafeTextRun(`   №\u00a0${safeMeeting.number}`, {
                  size: FONT_SIZES.sm,
                }),
              ],
              AlignmentType.CENTER,
            ),
          ],
          {
            span: 6,
            borders: BORDERS_ALL,
            verticalAlign: VerticalAlign.CENTER,
          },
        ),
        // col7: правый калибровочный QR бюллетеня
        createQRCell(headerQR, QR_CELL_SIZE_MM - 2, { borders: BORDERS_ALL }),
      ],
      14,
    ),
  );

  // ── Строка-шапка колонок ЗА / ПРОТИВ / ВОЗДЕРЖАЛСЯ ───────────────────────
  rows.push(
    createTableRow(
      [
        // col0: пустая ячейка над QR-колонкой
        createTableCell([createEmptyParagraph()], {
          widthMm: columnWidths[0],
          borders: BORDERS_ALL,
          verticalAlign: VerticalAlign.CENTER,
        }),
        // col1: заголовок текстовой колонки
        createTableCell(
          [
            createParagraph(
              [
                createSafeTextRun('Содержание вопроса', {
                  bold: true,
                  size: FONT_SIZES.sm,
                }),
              ],
              AlignmentType.CENTER,
            ),
          ],
          {
            widthMm: columnWidths[1],
            borders: BORDERS_ALL,
            verticalAlign: VerticalAlign.CENTER,
          },
        ),
        // col2: пустой отступ
        createTableCell([createEmptyParagraph()], {
          widthMm: columnWidths[2],
          borders: BORDERS_NONE,
        }),
        // col3: ЗА
        createTableCell(
          [
            createParagraph(
              [createSafeTextRun('ЗА', { bold: true, size: FONT_SIZES.sm })],
              AlignmentType.CENTER,
            ),
          ],
          {
            widthMm: columnWidths[3],
            borders: BORDERS_ALL,
            verticalAlign: VerticalAlign.CENTER,
          },
        ),
        // col4: пустой отступ
        createTableCell([createEmptyParagraph()], {
          widthMm: columnWidths[4],
          borders: BORDERS_NONE,
        }),
        // col5: ПРОТИВ
        createTableCell(
          [
            createParagraph(
              [
                createSafeTextRun('ПРОТИВ', {
                  bold: true,
                  size: FONT_SIZES.sm,
                }),
              ],
              AlignmentType.CENTER,
            ),
          ],
          {
            widthMm: columnWidths[5],
            borders: BORDERS_ALL,
            verticalAlign: VerticalAlign.CENTER,
          },
        ),
        // col6: пустой отступ
        createTableCell([createEmptyParagraph()], {
          widthMm: columnWidths[6],
          borders: BORDERS_NONE,
        }),
        // col7: ВОЗДЕРЖАЛСЯ
        createTableCell(
          [
            createParagraph(
              [
                createSafeTextRun('ВОЗДЕРЖ.', {
                  bold: true,
                  size: FONT_SIZES.sm,
                }),
              ],
              AlignmentType.CENTER,
            ),
          ],
          {
            widthMm: columnWidths[7],
            borders: BORDERS_ALL,
            verticalAlign: VerticalAlign.CENTER,
          },
        ),
      ],
      8,
    ),
  );

  for (let index = 0; index < safeMeeting.agendaItems.length; index++) {
    const item = safeMeeting.agendaItems[index];
    const questionText = sanitizeText(
      item.customBulletinText ??
        item.customProtocolText ??
        item.question?.bulletinText ??
        item.question?.shortTitle ??
        `Вопрос ${item.orderNumber}`,
    );

    rows.push(
      createTableRow(
        [
          // col0: QR вопроса (V|m8|o8|N)
          createQRCell(
            questionQRs[index] || (await generateQRCode('ERROR', 90)),
            QR_CELL_SIZE_MM - 2,
            { borders: BORDERS_ALL },
          ),
          // col1: текст вопроса
          createTableCell(
            [
              createParagraph([
                createSafeTextRun(`Вопрос № ${item.orderNumber}. `, {
                  bold: true,
                  size: FONT_SIZES.nm,
                }),
                createSafeTextRun(questionText || '—', { size: FONT_SIZES.nm }),
              ]),
            ],
            {
              widthMm: columnWidths[1],
              borders: BORDERS_ALL,
              verticalAlign: VerticalAlign.CENTER,
            },
          ),
          // col2: отступ 10% x (без рамки)
          createTableCell([createEmptyParagraph()], {
            widthMm: columnWidths[2],
            borders: BORDERS_NONE,
          }),
          // col3: ЗА
          createTableCell([createEmptyParagraph()], {
            widthMm: columnWidths[3],
            borders: BORDERS_ALL,
          }),
          // col4: отступ 5% x (без рамки)
          createTableCell([createEmptyParagraph()], {
            widthMm: columnWidths[4],
            borders: BORDERS_NONE,
          }),
          // col5: ПРОТИВ
          createTableCell([createEmptyParagraph()], {
            widthMm: columnWidths[5],
            borders: BORDERS_ALL,
          }),
          // col6: отступ 5% x (без рамки)
          createTableCell([createEmptyParagraph()], {
            widthMm: columnWidths[6],
            borders: BORDERS_NONE,
          }),
          // col7: ВОЗДЕРЖАЛСЯ
          createTableCell([createEmptyParagraph()], {
            widthMm: columnWidths[7],
            borders: BORDERS_ALL,
          }),
        ],
        QR_CELL_SIZE_MM,
      ),
    );
  }

  const legalConsentText =
    'В соответствии со ст. 9 Федерального закона от 27.07.06 No 152-ФЗ "О персональных данных", ' +
    'даю согласие на обработку моих персональных данных в целях подсчёта голосов, ' +
    'подготовки протокола и хранения результатов голосования. ' +
    'Согласие действует до дня хранения документов и может быть отозвано.';

  rows.push(
    createTableRow([
      createFullSpanCell(
        [
          createParagraph(
            [createSafeTextRun(legalConsentText, { size: FONT_SIZES.xs })],
            AlignmentType.LEFT,
          ),
        ],
        { marginTop: 40, marginBottom: 40, marginLeft: 80, marginRight: 80 },
      ),
    ]),
  );

  rows.push(
    createTableRow(
      [
        createTableCell(
          [
            createParagraph(
              [createSafeTextRun('', { size: FONT_SIZES.nm })],
              AlignmentType.CENTER,
            ),
            createParagraph(
              [
                createSafeTextRun('подпись', {
                  size: FONT_SIZES.xs,
                  italic: true,
                }),
              ],
              AlignmentType.CENTER,
            ),
          ],
          { span: 3, borders: BORDERS_ALL },
        ),
        createTableCell(
          [
            createParagraph(
              [createSafeTextRun(ownerInitials, { size: FONT_SIZES.nm })],
              AlignmentType.CENTER,
            ),
            createParagraph(
              [
                createSafeTextRun('Ф. И. О.', {
                  size: FONT_SIZES.xs,
                  italic: true,
                }),
              ],
              AlignmentType.CENTER,
            ),
          ],
          { span: 3, borders: BORDERS_ALL },
        ),
        createTableCell(
          [
            createParagraph(
              [createSafeTextRun('', { size: FONT_SIZES.nm })],
              AlignmentType.CENTER,
            ),
            createParagraph(
              [
                createSafeTextRun('дата заполнения', {
                  size: FONT_SIZES.xs,
                  italic: true,
                }),
              ],
              AlignmentType.CENTER,
            ),
          ],
          { span: 2, borders: BORDERS_ALL },
        ),
      ],
      18,
    ),
  );

  const table = new Table({
    width: { size: millimetersToTwips(USABLE_W_MM), type: WidthType.DXA },
    columnWidths: columnWidths.map(millimetersToTwips),
    rows: rows,
  });

  const document = new Document({
    sections: [
      {
        properties: {
          page: {
            size: {
              width: millimetersToTwips(PAGE_W_MM),
              height: millimetersToTwips(297),
            },
            margin: {
              top: millimetersToTwips(MARGIN_MM),
              bottom: millimetersToTwips(MARGIN_MM),
              left: millimetersToTwips(MARGIN_MM),
              right: millimetersToTwips(MARGIN_MM),
            },
          },
        },
        children: [table],
      },
    ],
  });

  const buffer = await Packer.toBuffer(document);

  if (!buffer || buffer.length < 100) {
    throw new Error('Generated document is too small or empty');
  }

  return Buffer.from(buffer);
}
