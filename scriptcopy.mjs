import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = "AIzaSyCuLYWw-AtV8VGSieB5WmPMByYTqsQ3Mvc";
const genAI = new GoogleGenerativeAI(API_KEY);

const quizData = [
  {
    key: "Mood: ",
    question: "Mood: How have you been feeling overall?",
    options: ["Happy", "Sad", "Anxious", "Angry", "Something else"],
  },
  {
    key: "Sleep: ",
    question:
      "Sleep: Are you getting enough sleep (7-8 hours for adults)? Is the quality of your sleep good?",
    options: ["Yes", "No"],
  },
  {
    key: "Appetite: ",
    question:
      "Appetite: Has your appetite changed recently? Are you eating more or less than usual?",
    options: ["Eating more", "Eating less", "No change"],
  },
  {
    key: "Energy Levels: ",
    question: "Energy Levels: Do you feel tired or sluggish most of the time?",
    options: [
      " Yes, I feel tired most of the time.",
      "Yes, I feel sluggish most of the time.",
      "No, I generally have good energy levels.",
    ],
  },
  {
    key: "Concentration: ",
    question:
      "Concentration: Are you having trouble focusing or completing tasks?",
    options: [
      "Yes, I have trouble focusing.",
      "Yes, I have trouble completing tasks.",
      "No, I am able to focus and complete tasks without difficulty.",
    ],
  },
  {
    key: "Motivation: ",
    question:
      "Motivation: Do you find it difficult to get started on things you used to enjoy?",
    options: [
      "Yes, I find it difficult to get started on things I used to enjoy.",
      "No, I can still get started on activities I used to enjoy.",
    ],
  },
  {
    key: "Social Interaction: ",
    question:
      "Social Interaction: Have you withdrawn from social activities or hobbies?",
    options: [
      "Yes, I have withdrawn from social activities.",
      "Yes, I have withdrawn from hobbies.",
      "No, I am still actively engaged in social activities and hobbies.",
    ],
  },
  {
    key: "Thoughts: ",
    question:
      "Thoughts: Have you been having any negative thoughts about yourself or the world?",
    options: [
      " Yes, I have negative thoughts about myself.",
      "Yes, I have negative thoughts about the world.",
      "No, I do not have negative thoughts about myself or the world.",
    ],
  },
  {
    key: "Physical Health: ",
    question:
      "Physical Health: Are you experiencing any physical problems that could be affecting your mood, like chronic pain?",
    options: [
      " Yes, I am experiencing physical problems like chronic pain.",
      "No, I am not experiencing any physical problems affecting my mood.",
    ],
  },
  {
    key: "Stress: ",
    question: "Stress: What are your main stressors in life right now?",
  },
];

let currentQuestion = 0;
let userAnswers = " ";


const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
nextBtn.style.display = "none";
document.getElementById("questionText").style.display = "none";

function loadQuestion() {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
 
  questionElement.innerText = quizData[currentQuestion].question;
  optionsElement.innerHTML = "";

  for (let i = 0; i < quizData[currentQuestion].options.length; i++) {
    const option = document.createElement("button");
    option.className = "option";
    option.innerText = quizData[currentQuestion].options[i];
    option.onclick = function () {
      userAnswers += `      Question: ${quizData[currentQuestion].question} =>  User Answer: ${quizData[currentQuestion].options[i]}`;

      option.style.backgroundColor = "#00ABE4";
      const options = document.querySelectorAll(".option");
      options.forEach((opt) => {
        if (opt !== option) {
          opt.style.backgroundColor = "";
        }
      });
    };
    optionsElement.appendChild(option);
    optionsElement.appendChild(document.createElement("br"));
  }

  if (currentQuestion === 0) {
    prevBtn.style.display = "none";
  } else {
    prevBtn.style.display = "inline";
  }

  if (currentQuestion === quizData.length) {
    nextBtn.style.display = "none";
  } else {
    nextBtn.style.display = "inline";
  }
}

document.getElementById("prev-btn").addEventListener("click", function () {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  } 
});

document.getElementById("next-btn").addEventListener("click", function () {
  if (currentQuestion < quizData.length - 2) {
    console.log(userAnswers);
    currentQuestion++;
    loadQuestion();
  } else if (currentQuestion == quizData.length - 2) {
    document.getElementById("question-container").style.display = "none";
    document.getElementById("questionText").style.display = "block";
    prevBtn.style.display = "none";
    nextBtn.innerText = "Submit";
    currentQuestion++;
  } else {
    userAnswers += `      Question: ${
      quizData[currentQuestion].question
    } =>  User Answer: ${document.getElementById("stressorText").value}`;
    callApi();
  }
});

async function callApi() {
  console.log("Button clicked");
  document.getElementById("quiz-container").style.display = "none";
  await run();
}

export async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompts =
    "Perform mental health surveillance and well-being test. based on this answers: " +
    userAnswers;
  console.log(prompts);

  const result = await model.generateContentStream(prompts);
  let text = "";
  let resultDiv = document.getElementById("Result");
  
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    text += chunkText;
    resultDiv.innerText = text;
    resultDiv.innerHTML = resultDiv.innerHTML.replace(
      /\*\*(.*?)\*\*/g,
      "<b>$1</b>"
    );
    resultDiv.innerHTML = resultDiv.innerHTML.replaceAll("*", "&#9679;"); //9656 ▸
  }
}

let startbtn = document.getElementById("start-btn");

startbtn.addEventListener("click", function () {
  // currentQuestion = 0;
  // userAnswers = " ";
  loadQuestion();
  startbtn.style.display = "none";
});
