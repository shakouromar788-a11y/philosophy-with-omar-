# Philosophy with Omar

موقع اختبارات فلسفة للبكالوريا الأدبي (اختيار من متعدد - 4 خيارات).

## الملفات

- `index.html` ← صفحة الاختبار للطلاب
- `admin.html` ← لوحة الإدارة (إضافة / تعديل / حذف الأسئلة)
- `questions.json` ← ملف الأسئلة
- `style.css` + `quiz.js` + `admin.js`

## كلمة المرور الافتراضية للوحة الإدارة

```
falsafa2026
```

يمكنك تغييرها من داخل ملف `admin.js` (السطر الأول تقريباً).

## طريقة الرفع على GitHub Pages

### 1. إنشاء مستودع جديد على GitHub
- ادخل إلى [github.com](https://github.com) وسجّل الدخول
- اضغط **New repository**
- سمّه مثلاً: `philosophy-quiz`
- اجعله **Public**
- لا تضف README (لأن عندك ملفات جاهزة)
- اضغط **Create repository**

### 2. رفع الملفات
الطريقة الأسهل:
1. افتح المستودع الذي أنشأته
2. اضغط **uploading an existing file**
3. اسحب كل محتويات مجلد `philosophy-quiz` (الملفات كلها)
4. اضغط **Commit changes**

### 3. تفعيل GitHub Pages
1. ادخل إلى **Settings** في المستودع
2. من القائمة الجانبية اختر **Pages**
3. تحت **Source** اختر **Deploy from a branch**
4. Branch: `main` و Folder: `/ (root)`
5. اضغط **Save**
6. بعد دقيقة سيظهر لك رابط الموقع (مثال: `https://yourusername.github.io/philosophy-quiz/`)

## طريقة إضافة/تعديل الأسئلة لاحقاً

1. افتح رابط الموقع + `/admin.html`  
   مثال: `https://yourusername.github.io/philosophy-quiz/admin.html`
2. أدخل كلمة المرور
3. أضف أو عدّل الأسئلة
4. اضغط **تحميل ملف الأسئلة**
5. ارجع لمستودع GitHub → اضغط على ملف `questions.json` → **Edit** (أيقونة القلم)
6. امسح المحتوى القديم والصق المحتوى الجديد من الملف الذي نزل عندك
7. اضغط **Commit changes**
8. انتظر دقيقة حتى يتحدث الموقع

## ملاحظات

- الموقع يعمل بالكامل من جهة المتصفح (Static).
- لا يحتاج سيرفر أو قاعدة بيانات.
- مناسب للموبايل والكمبيوتر.
- كلمة المرور بسيطة (client-side) وهي كافية للاستخدام الشخصي/التعليمي.
