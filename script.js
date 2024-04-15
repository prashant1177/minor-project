const quizData = [
  {
    question: "How often do you feel overwhelmed by stress in your daily life?",
    options: ["1 (Not at all)", "2", "3", "4", "5 (A lot)"],
  },
  {
    question: "Have you noticed changes in your sleeping patterns, such as difficulty falling asleep or staying asleep?",
    options: ["1 (Very disorganized)", "2", "3", "4", "5 (Very organized)"],
  },
  {
    question: "Do you often feel sad, empty, or hopeless?",
    options: ["1 (Not adventurous)", "2", "3", "4", "5 (Very adventurous)"],
  },
  {
    question: "Have you experienced a loss of interest or pleasure in activities you used to enjoy?",
    options: ["1 (Not adventurous)", "2", "3", "4", "5 (Very adventurous)"],
  },
  {
    question: "Are you frequently irritable, easily angered, or prone to outbursts of emotion?",
    options: ["1 (Not adventurous)", "2", "3", "4", "5 (Very adventurous)"],
  },
  {
    question: "Do you have trouble concentrating or making decisions?",
    options: ["1 (Not adventurous)", "2", "3", "4", "5 (Very adventurous)"],
  },
  {
    question: "Have you experienced changes in your appetite or weight, such as significant weight loss or gain?",
    options: ["1 (Not adventurous)", "2", "3", "4", "5 (Very adventurous)"],
  },
  {
    question: "Do you often feel fatigued or lack energy, even after getting enough rest?",
    options: ["1 (Not adventurous)", "2", "3", "4", "5 (Very adventurous)"],
  },
  {
    question: "Have you noticed an increase in physical symptoms such as headaches, stomachaches, or muscle tension?",
    options: ["1 (Not adventurous)", "2", "3", "4", "5 (Very adventurous)"],
  },
  {
    question: "Do you ever have thoughts of harming yourself or others, or do you feel like life isn't worth living?",
    options: ["1 (Not adventurous)", "2", "3", "4", "5 (Very adventurous)"],
  },
  
];

let currentQuestion = 0;
let userAnswers = [];

document.getElementById('next-btn').style.display = 'none'; 
function loadQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
   
    questionElement.innerText = quizData[currentQuestion].question;
    optionsElement.innerHTML = '';
  
    for (let i = 0; i < quizData[currentQuestion].options.length; i++) {
      const option = document.createElement('button');
      option.className = 'option';
      option.innerText = quizData[currentQuestion].options[i];
      option.onclick = function() {
        userAnswers[currentQuestion] = i + 1;
       
        option.style.backgroundColor = '#00ABE4';
        const options = document.querySelectorAll('.option');
        options.forEach(opt => {
          if (opt !== option) {
            opt.style.backgroundColor = '';
          }
        });
      };
      optionsElement.appendChild(option);
      optionsElement.appendChild(document.createElement('br'));
    }
  
   
    if (currentQuestion === 0) {
      prevBtn.style.display = 'none';
    } else {
      prevBtn.style.display = 'inline';
    }
  
    if (currentQuestion === quizData.length) {
      nextBtn.style.display = 'none'; 
    } else {
      nextBtn.style.display = 'inline'; 
    }
  }

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
      currentQuestion++;
      loadQuestion();
    } else {
      showResult();
    }
  }
  

function showResult() {
  const resultElement = document.getElementById('result');
  

  let totalScore = userAnswers.reduce((acc, val) => acc + val, 0);
  let averageScore = totalScore / userAnswers.length;
  
  let feedback1 = '';
  let feedback2 = '';
  let feedback3 = '';
  let feedback4 = '';
  let feedback5 = '';
  if (averageScore <= 2) {
    feedback1 = 'Now you should not worry about your health. Feeling sad is completely normal and may not require any specific suggestions.';
    feedback2 = 'Take some time for yourself and engage in activities that bring you joy.';
    feedback3 = 'Connect with supportive friends or family members for emotional support.';
    feedback4 = 'Practice self-compassion and remind yourself that it is okay to feel down sometimes.';
    feedback5 = 'Consider seeking professional help if your feelings persist or worsen.';
  } else if (averageScore <= 3) {
    feedback1 = 'Prioritize self-care activities such as taking breaks, hobbies, or leisure activities.';
    feedback2 = 'Explore mindfulness practices to increase awareness of your thoughts and emotions.';
    feedback3 = 'Seek professional guidance from a counselor or therapist to address underlying concerns.';
    feedback4 = 'Practice setting boundaries and saying no to excessive commitments or responsibilities.';
    feedback5 = 'Consider joining a support group or community to connect with others facing similar challenges.';
  } else if (averageScore <= 4) {
    feedback1 = 'Seek immediate support from a mental health professional or crisis hotline.';
    feedback2 = 'Develop a safety plan to manage intense emotions or thoughts of self-harm.';
    feedback3 = 'Consider inpatient or intensive outpatient treatment if necessary.';
    feedback4 = 'Lean on trusted friends or family members for emotional support.';
    feedback5 = 'Remember that you are not alone, and help is available to support you through this difficult time.';
  } else {
    feedback1 = 'You may need to seek help from a mental health professional.';
    feedback2 = 'Reach out to a counselor or therapist for immediate support.';
    feedback3 = 'Consider contacting a crisis hotline for assistance.';
    feedback4 = 'Develop a safety plan to manage any intense emotions or thoughts of self-harm.';
    feedback5 = 'Lean on trusted friends or family members for emotional support, and remember that help is available to you.';
  }
  
 
  document.getElementById('question-container').style.display = 'none';
  document.getElementById('prev-btn').style.display = 'none';
  document.getElementById('next-btn').style.display = 'none';
  document.getElementById('result').style.display = 'block';
  
  document.getElementById('H1').innerText = `Your average score is: ${averageScore.toFixed(2)}\n\n`;
  document.getElementById('P1').innerText = `1. ${feedback1}`;
  document.getElementById('P2').innerText = `2. ${feedback2}`;
  document.getElementById('P3').innerText = `3. ${feedback3}`;
  document.getElementById('P4').innerText = `4. ${feedback4}`;
  document.getElementById('P5').innerText = `5. ${feedback5}`;
}

document.getElementById('start-btn').addEventListener('click', function() {
  loadQuestion();
  document.getElementById('start-btn').style.display = 'none';
});