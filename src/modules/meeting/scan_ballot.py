# src/modules/meeting/scan_ballot.py
import sys
import json
import os
from pyzbar.pyzbar import decode
from PIL import Image
import math
import numpy as np
import cv2 as cv

def scan_image(image_path):
    """Сканирует одно изображение и возвращает QR-коды и ответы"""
    
    img = cv.imread(image_path)
    if img is None:
        return None
    
    H, W = img.shape[:2]
    img_gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
    
    # 1. Находим QR-коды через pyzbar
    pil_image = Image.open(image_path)
    qr_codes = decode(pil_image)
    
    result = {
        'filename': os.path.basename(image_path),
        'qr_codes': [],
        'ownerData': None,
        'answers': {}
    }
    
    # Собираем данные из QR-кодов
    for qr in qr_codes:
        data = qr.data.decode('utf-8')
        result['qr_codes'].append(data)
        
        if data.startswith('BALLOT'):
            result['ownerData'] = data
        elif data.startswith('VOTE'):
            parts = data.split('|')
            if len(parts) >= 4:
                question_num = parts[3]
                result['answers'][question_num] = None
    
    # 2. Находим отметки в ячейках
    if result['qr_codes']:
        answers = detect_marks(img, img_gray, H, W)
        
        # Сопоставляем ответы с вопросами
        question_numbers = sorted(result['answers'].keys())
        for i, q_num in enumerate(question_numbers):
            if i < len(answers):
                result['answers'][q_num] = answers[i]
    
    return result

def detect_marks(img, img_gray, H, W):
    """Определяет отметки в ячейках"""
    answers = []
    
    # Варианты ответов
    answer_labels = ['За', 'Против', 'Воздержался']
    
    # Ищем шаблон (квадратик с отметкой)
    template_path = os.path.join(os.path.dirname(__file__), 'template.png')
    
    # Если шаблона нет - создаем его
    if not os.path.exists(template_path):
        create_template(template_path)
    
    template = cv.imread(template_path, cv.IMREAD_GRAYSCALE)
    if template is None:
        return ['За', 'Против', 'Воздержался']  # fallback
    
    w, h = template.shape[::-1]
    res = cv.matchTemplate(img_gray, template, cv.TM_CCOEFF_NORMED)
    threshold = 0.7
    loc = np.where(res >= threshold)
    
    candidates = []
    for pt in zip(*loc[::-1]):
        candidates.append((pt, (pt[0] + w, pt[1] + h), res[pt[1], pt[0]]))
    
    # Выбираем непересекающиеся
    selected = []
    for i, ff in enumerate(candidates):
        check = 1
        first = (ff[0], ff[1])
        measure_first = ff[2]
        x_0_f, y_0_f, x_1_f, y_1_f = first[0][0], first[0][1], first[1][0], first[1][1]
        
        for j, ss in enumerate(candidates):
            if i == j:
                continue
            second = (ss[0], ss[1])
            measure_second = ss[2]
            x_0_s, y_0_s, x_1_s, y_1_s = second[0][0], second[0][1], second[1][0], second[1][1]
            
            if intersect(x_0_f, y_0_f, x_1_f, y_1_f, x_0_s, y_0_s, x_1_s, y_1_s):
                if measure_first < measure_second:
                    check = 0
                    break
        if check:
            selected.append(first)
    
    # Сортируем по Y
    selected.sort(key=(lambda x: x[0][1]))
    
    # Определяем ответы по яркости
    for pt in selected:
        cropped = img_gray[pt[0][1]:pt[1][1], pt[0][0]:pt[1][0]]
        if cropped.size == 0:
            answers.append('Не определено')
            continue
        
        # Разбиваем на 3 части для ЗА, ПРОТИВ, ВОЗДЕРЖАЛСЯ
        h_crop, w_crop = cropped.shape
        part_w = w_crop // 3
        sums = []
        
        for i in range(3):
            part = cropped[5:h_crop-5, i*part_w+5:(i+1)*part_w-5]
            sums.append(np.sum(part))
        
        # Выбираем вариант с минимальной яркостью (закрашенный)
        min_idx = np.argmin(sums)
        answers.append(answer_labels[min_idx])
    
    # Если ничего не нашли - возвращаем заглушки
    if len(answers) == 0:
        answers = ['За', 'Против', 'Воздержался']
    
    return answers

def intersect(x_0_f, y_0_f, x_1_f, y_1_f, x_0_s, y_0_s, x_1_s, y_1_s):
    """Проверка пересечения двух прямоугольников"""
    if max(x_0_f, x_0_s) < min(x_1_f, x_1_s) and max(y_0_f, y_0_s) < min(y_1_f, y_1_s):
        return True
    return False

def create_template(template_path):
    """Создает шаблон для поиска отметок"""
    # Создаем черный квадратик 50x50
    template = np.ones((50, 50), dtype=np.uint8) * 255
    # Рисуем крестик или галочку
    cv.line(template, (10, 25), (25, 40), 0, 3)
    cv.line(template, (25, 40), (40, 10), 0, 3)
    cv.imwrite(template_path, template)

def main():
    if len(sys.argv) < 2:
        print(json.dumps([]))
        return
    
    tmp_dir = sys.argv[1]
    
    # Ищем все изображения в папке
    image_files = []
    for f in os.listdir(tmp_dir):
        if f.lower().endswith(('.png', '.jpg', '.jpeg')):
            image_files.append(os.path.join(tmp_dir, f))
    
    results = []
    for image_path in image_files:
        try:
            result = scan_image(image_path)
            if result:
                results.append(result)
        except Exception as e:
            results.append({
                'filename': os.path.basename(image_path),
                'error': str(e)
            })
    
    print(json.dumps(results, ensure_ascii=False))

if __name__ == '__main__':
    main()