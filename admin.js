// ===== admin.js =====
const PASSWORD = 'falsafa2026'; // غيّر كلمة المرور من هنا

let questions = [];
let editingIndex = -1;

const loginScreen = document.getElementById('login-screen');
const adminPanel = document.getElementById('admin-panel');
const passwordInput = document.getElementById('password-input');
const loginBtn = document.getElementById('login-btn');
const loginError = document.getElementById('login-error');
const questionsList = document.getElementById('questions-list');
const noQuestions = document.getElementById('no-questions');
const qCount = document.getElementById('q-count');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');

// تسجيل الدخول
loginBtn.addEventListener('click', tryLogin);
passwordInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') tryLogin();
});

function tryLogin() {
  if (passwordInput.value === PASSWORD) {
    loginScreen.style.display = 'none';
    adminPanel.style.display = 'block';
    loadQuestions();
  } else {
    loginError.style.display = 'block';
    passwordInput.value = '';
  }
}

// تحميل الأسئلة من الملف
async function loadQuestions() {
  try {
    const res = await fetch('questions.json?t=' + Date.now());
    questions = await res.json();
    if (!Array.isArray(questions)) questions = [];
  } catch (err) {
    questions = [];
    console.error(err);
  }
  renderList();
}

function renderList() {
  qCount.textContent = questions.length;
  questionsList.innerHTML = '';

  if (questions.length === 0) {
    noQuestions.style.display = 'block';
    return;
  }
  noQuestions.style.display = 'none';

  const letters = ['أ', 'ب', 'ج', 'د'];

  questions.forEach((q, index) => {
    const div = document.createElement('div');
    div.className = 'question-item';

    const optionsHtml = q.options.map((opt, i) => {
      const isCorrect = i === q.correct;
      return `<span class="${isCorrect ? 'correct-badge' : ''}">${letters[i]}) ${opt}${isCorrect ? ' ✓' : ''}</span>`;
    }).join('');

    div.innerHTML = `
      <div class="question-actions">
        <button class="btn btn-secondary btn-sm" onclick="editQuestion(${index})">تعديل</button>
        <button class="btn btn-danger btn-sm" onclick="deleteQuestion(${index})">حذف</button>
      </div>
      <h3>${index + 1}. ${q.question}</h3>
      <div class="options-preview">${optionsHtml}</div>
      ${q.explanation ? `<small style="color:#718096">الشرح: ${q.explanation}</small>` : ''}
    `;
    questionsList.appendChild(div);
  });
}

// إضافة سؤال
document.getElementById('add-btn').addEventListener('click', () => {
  editingIndex = -1;
  modalTitle.textContent = 'إضافة سؤال جديد';
  clearForm();
  modal.classList.add('show');
});

// إلغاء
document.getElementById('cancel-btn').addEventListener('click', () => {
  modal.classList.remove('show');
});

// حفظ
document.getElementById('save-btn').addEventListener('click', saveQuestion);

function clearForm() {
  document.getElementById('q-text').value = '';
  document.getElementById('opt0').value = '';
  document.getElementById('opt1').value = '';
  document.getElementById('opt2').value = '';
  document.getElementById('opt3').value = '';
  document.getElementById('correct').value = '0';
  document.getElementById('explanation').value = '';
}

function saveQuestion() {
  const question = document.getElementById('q-text').value.trim();
  const options = [
    document.getElementById('opt0').value.trim(),
    document.getElementById('opt1').value.trim(),
    document.getElementById('opt2').value.trim(),
    document.getElementById('opt3').value.trim()
  ];
  const correct = parseInt(document.getElementById('correct').value);
  const explanation = document.getElementById('explanation').value.trim();

  if (!question) {
    alert('يرجى كتابة نص السؤال');
    return;
  }
  if (options.some(o => !o)) {
    alert('يرجى ملء جميع الخيارات الأربعة');
    return;
  }

  const newQ = { question, options, correct, explanation };

  if (editingIndex === -1) {
    questions.push(newQ);
  } else {
    questions[editingIndex] = newQ;
  }

  modal.classList.remove('show');
  renderList();
}

function editQuestion(index) {
  editingIndex = index;
  const q = questions[index];
  modalTitle.textContent = 'تعديل السؤال';

  document.getElementById('q-text').value = q.question;
  document.getElementById('opt0').value = q.options[0];
  document.getElementById('opt1').value = q.options[1];
  document.getElementById('opt2').value = q.options[2];
  document.getElementById('opt3').value = q.options[3];
  document.getElementById('correct').value = q.correct;
  document.getElementById('explanation').value = q.explanation || '';

  modal.classList.add('show');
}

function deleteQuestion(index) {
  if (confirm('هل أنت متأكد من حذف هذا السؤال؟')) {
    questions.splice(index, 1);
    renderList();
  }
}

// تصدير الملف
document.getElementById('export-btn').addEventListener('click', () => {
  const dataStr = JSON.stringify(questions, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'questions.json';
  a.click();
  URL.revokeObjectURL(url);
});

// إغلاق المودال عند الضغط خارجها
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
  }
});
