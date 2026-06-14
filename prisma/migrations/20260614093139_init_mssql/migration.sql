BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Building] (
    [id] NVARCHAR(1000) NOT NULL,
    [address] NVARCHAR(1000) NOT NULL,
    [cadastralNumber] NVARCHAR(1000) NOT NULL,
    [yearBuilt] INT,
    [floors] INT,
    [entrances] INT,
    [totalArea] FLOAT(53) NOT NULL,
    [totalPremises] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Building_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Building_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Premise] (
    [id] NVARCHAR(1000) NOT NULL,
    [buildingId] NVARCHAR(1000) NOT NULL,
    [number] NVARCHAR(1000) NOT NULL,
    [cadastralNumber] NVARCHAR(1000),
    [area] FLOAT(53) NOT NULL,
    [ownershipForm] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Premise_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Owner] (
    [id] NVARCHAR(1000) NOT NULL,
    [fullName] NVARCHAR(1000) NOT NULL,
    [inn] NVARCHAR(1000),
    [snils] NVARCHAR(1000),
    [contacts] NVARCHAR(1000),
    CONSTRAINT [Owner_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Owner_inn_key] UNIQUE NONCLUSTERED ([inn]),
    CONSTRAINT [Owner_snils_key] UNIQUE NONCLUSTERED ([snils]),
    CONSTRAINT [Owner_contacts_key] UNIQUE NONCLUSTERED ([contacts])
);

-- CreateTable
CREATE TABLE [dbo].[OwnershipRight] (
    [id] NVARCHAR(1000) NOT NULL,
    [premiseId] NVARCHAR(1000) NOT NULL,
    [ownerId] NVARCHAR(1000) NOT NULL,
    [share] NVARCHAR(1000),
    [shareArea] FLOAT(53),
    [titleDocument] NVARCHAR(1000),
    [registrationDate] NVARCHAR(1000),
    [basisDocument] NVARCHAR(1000),
    CONSTRAINT [OwnershipRight_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [OwnershipRight_premiseId_ownerId_key] UNIQUE NONCLUSTERED ([premiseId],[ownerId])
);

-- CreateTable
CREATE TABLE [dbo].[Employee] (
    [id] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [passwordHash] NVARCHAR(1000) NOT NULL,
    [fullName] NVARCHAR(1000) NOT NULL,
    [role] NVARCHAR(1000) NOT NULL,
    [isActive] INT NOT NULL CONSTRAINT [Employee_isActive_df] DEFAULT 1,
    [lastLogin] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Employee_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Employee_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Employee_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[EmployeeBuildingAccess] (
    [employeeId] NVARCHAR(1000) NOT NULL,
    [buildingId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [EmployeeBuildingAccess_pkey] PRIMARY KEY CLUSTERED ([employeeId],[buildingId])
);

-- CreateTable
CREATE TABLE [dbo].[QuestionLibrary] (
    [id] NVARCHAR(1000) NOT NULL,
    [shortTitle] NVARCHAR(1000) NOT NULL,
    [protocolText] NVARCHAR(1000),
    [bulletinText] NVARCHAR(1000),
    [quorumType] NVARCHAR(1000),
    [category] NVARCHAR(1000),
    [tags] NVARCHAR(1000),
    [createdByEmployeeId] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [QuestionLibrary_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [QuestionLibrary_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Meeting] (
    [id] NVARCHAR(1000) NOT NULL,
    [buildingId] NVARCHAR(1000) NOT NULL,
    [number] NVARCHAR(1000) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [Meeting_status_df] DEFAULT 'draft',
    [form] NVARCHAR(1000) NOT NULL,
    [startDate] NVARCHAR(1000) NOT NULL,
    [endDate] NVARCHAR(1000),
    [inPersonStartTime] NVARCHAR(1000),
    [inPersonAddress] NVARCHAR(1000),
    [ballotAcceptanceAddress] NVARCHAR(1000),
    [noticeAddress] NVARCHAR(1000),
    [resultsDate] NVARCHAR(1000),
    [initiatorEmployeeId] NVARCHAR(1000),
    [extensionReason] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Meeting_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [activatedAt] NVARCHAR(1000),
    [completedAt] NVARCHAR(1000),
    [archivedAt] NVARCHAR(1000),
    CONSTRAINT [Meeting_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Meeting_buildingId_number_key] UNIQUE NONCLUSTERED ([buildingId],[number])
);

-- CreateTable
CREATE TABLE [dbo].[AgendaItem] (
    [id] NVARCHAR(1000) NOT NULL,
    [meetingId] NVARCHAR(1000) NOT NULL,
    [questionId] NVARCHAR(1000),
    [orderNumber] INT NOT NULL,
    [customProtocolText] NVARCHAR(1000),
    [customBulletinText] NVARCHAR(1000),
    CONSTRAINT [AgendaItem_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [AgendaItem_meetingId_orderNumber_key] UNIQUE NONCLUSTERED ([meetingId],[orderNumber])
);

-- CreateTable
CREATE TABLE [dbo].[QuestionAnswer] (
    [ownerId] NVARCHAR(1000) NOT NULL,
    [agendaItemId] NVARCHAR(1000) NOT NULL,
    [vote] NVARCHAR(1000) NOT NULL,
    [weight] FLOAT(53),
    CONSTRAINT [QuestionAnswer_pkey] PRIMARY KEY CLUSTERED ([ownerId],[agendaItemId])
);

-- CreateTable
CREATE TABLE [dbo].[AuditLog] (
    [id] NVARCHAR(1000) NOT NULL,
    [employeeId] NVARCHAR(1000),
    [actionType] NVARCHAR(1000) NOT NULL,
    [objectId] NVARCHAR(1000),
    [oldValue] NVARCHAR(1000),
    [newValue] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [AuditLog_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [AuditLog_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Premise] ADD CONSTRAINT [Premise_buildingId_fkey] FOREIGN KEY ([buildingId]) REFERENCES [dbo].[Building]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[OwnershipRight] ADD CONSTRAINT [OwnershipRight_premiseId_fkey] FOREIGN KEY ([premiseId]) REFERENCES [dbo].[Premise]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[OwnershipRight] ADD CONSTRAINT [OwnershipRight_ownerId_fkey] FOREIGN KEY ([ownerId]) REFERENCES [dbo].[Owner]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[EmployeeBuildingAccess] ADD CONSTRAINT [EmployeeBuildingAccess_employeeId_fkey] FOREIGN KEY ([employeeId]) REFERENCES [dbo].[Employee]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[EmployeeBuildingAccess] ADD CONSTRAINT [EmployeeBuildingAccess_buildingId_fkey] FOREIGN KEY ([buildingId]) REFERENCES [dbo].[Building]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[QuestionLibrary] ADD CONSTRAINT [QuestionLibrary_createdByEmployeeId_fkey] FOREIGN KEY ([createdByEmployeeId]) REFERENCES [dbo].[Employee]([id]) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Meeting] ADD CONSTRAINT [Meeting_buildingId_fkey] FOREIGN KEY ([buildingId]) REFERENCES [dbo].[Building]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Meeting] ADD CONSTRAINT [Meeting_initiatorEmployeeId_fkey] FOREIGN KEY ([initiatorEmployeeId]) REFERENCES [dbo].[Employee]([id]) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[AgendaItem] ADD CONSTRAINT [AgendaItem_meetingId_fkey] FOREIGN KEY ([meetingId]) REFERENCES [dbo].[Meeting]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[AgendaItem] ADD CONSTRAINT [AgendaItem_questionId_fkey] FOREIGN KEY ([questionId]) REFERENCES [dbo].[QuestionLibrary]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[QuestionAnswer] ADD CONSTRAINT [QuestionAnswer_ownerId_fkey] FOREIGN KEY ([ownerId]) REFERENCES [dbo].[Owner]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[QuestionAnswer] ADD CONSTRAINT [QuestionAnswer_agendaItemId_fkey] FOREIGN KEY ([agendaItemId]) REFERENCES [dbo].[AgendaItem]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[AuditLog] ADD CONSTRAINT [AuditLog_employeeId_fkey] FOREIGN KEY ([employeeId]) REFERENCES [dbo].[Employee]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
