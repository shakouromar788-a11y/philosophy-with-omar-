// ===== quiz.js =====
let questions = [];
let currentIndex = 0;
let score = 0;
let answered = false;

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionsCountEl = document.getElementById('questions-count');

// تحميل الأسئلة
async function loadQuestions() {
  try {
    const res = await fetch('questions.json?t=' + Date.now());
    questions = await res.json();

    if (!Array.isArray(questions)) questions = [];

    if (questions.length === 0) {
      questionsCountEl.textContent = 'لا توجد أسئلة حالياً. راجع لوحة الإدارة لإضافة أسئلة.';
      startBtn.style.display = 'none';
    } else {
      questionsCountEl.textContent = `عدد الأسئلة المتاحة: ${questions.length}`;
      startBtn.style.display = 'block';
    }
  } catch (err) {
    questionsCountEl.textContent = 'حدث خطأ أثناء تحميل الأسئلة.';
    console.error(err);
  }
}

function startQuiz() {
  currentIndex = 0;
  score = 0;
  answered = false;
  startScreen.style.display = 'none';
  resultScreen.style.display = 'none';
  quizScreen.style.display = 'block';
  showQuestion();
}

function showQuestion() {
  answered = false;
  nextBtn.style.display = 'none';
  document.getElementById('feedback').className = 'feedback';
  document.getElementById('feedback').textContent = '';

  const q = questions[currentIndex];
  const total = questions.length;

  document.getElementById('question-counter').textContent = `السؤال ${currentIndex + 1} من ${total}`;
  document.getElementById('score-live').textContent = `النقاط: ${score}`;
  document.getElementById('progress-fill').style.width = `${(currentIndex / total) * 100}%`;
  document.getElementById('question-text').textContent = q.question;

  const optionsContainer = document.getElementById('options');
  optionsContainer.innerHTML = '';

  const letters = ['أ', 'ب', 'ج', 'د'];

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `
      <span class="option-letter">${letters[i]}</span>
      <span>${opt}</span>
    `;
    btn.onclick = () => selectAnswer(i, btn);
    optionsContainer.appendChild(btn);
  });
}

function selectAnswer(selectedIndex, btn) {
  if (answered) return;
  answered = true;

  const q = questions[currentIndex];
  const allBtns = document.querySelectorAll('.option-btn');
  allBtns.forEach(b => b.disabled = true);

  const feedback = document.getElementById('feedback');

  if (selectedIndex === q.correct) {
    score++;
    btn.classList.add('correct');
    feedback.textContent = 'إجابة صحيحة ✓';
    feedback.className = 'feedback show correct';
  } else {
    btn.classList.add('wrong');
    allBtns[q.correct].classList.add('correct');
    feedback.textContent = 'إجابة خاطئة ✗';
    feedback.className = 'feedback show wrong';
  }

  // إظهار الشرح إن وجد
  if (q.explanation && q.explanation.trim()) {
    feedback.innerHTML += `<br><small style="opacity:0.9">${q.explanation}</small>`;
  }

  document.getElementById('score-live').textContent = `النقاط: ${score}`;
  nextBtn.style.display = 'block';
  nextBtn.textContent = currentIndex === questions.length - 1 ? 'عرض النتيجة' : 'السؤال التالي';
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex >= questions.length) {
    showResult();
  } else {
    showQuestion();
  }
}

function showResult() {
  quizScreen.style.display = 'none';
  resultScreen.style.display = 'block';

  const total = questions.length;
  const percent = Math.round((score / total) * 100);

  document.getElementById('final-score').textContent = `${score} / ${total}`;

  let msg = '';
  if (percent >= 90) msg = 'ممتاز! أداء رائع 👏';
  else if (percent >= 70) msg = 'جيد جداً، استمر!';
  else if (percent >= 50) msg = 'لا بأس، راجع الدروس وحاول مجدداً';
  else msg = 'تحتاج إلى مراجعة أكثر. لا تستسلم!';

  document.getElementById('result-message').textContent = msg;
  document.getElementById('progress-fill').style.width = '100%';
}

// أحداث
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', startQuiz);

// تشغيل
loadQuestions();
