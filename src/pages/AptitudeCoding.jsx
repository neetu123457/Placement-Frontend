
import React, { useState } from "react";
import "./AptitudeCoding.css";

const questions = [
  {
    topic: "Percentages",
    question: "What is 20% of 250?",
    options: ["25", "40", "50", "60"],
    answer: 2,
    explanation: "20% of 250 = (20 / 100) × 250 = 50.",
  },
  {
    topic: "Percentages",
    question: "A number increases from 80 to 100. What is the percentage increase?",
    options: ["20%", "25%", "30%", "40%"],
    answer: 1,
    explanation: "Increase = 100 - 80 = 20. Percentage increase = (20 / 80) × 100 = 25%.",
  },
  {
    topic: "Profit and Loss",
    question: "An item costs ₹500 and is sold for ₹600. What is the profit percentage?",
    options: ["10%", "15%", "20%", "25%"],
    answer: 2,
    explanation: "Profit = ₹100. Profit percentage = (100 / 500) × 100 = 20%.",
  },
  {
    topic: "Profit and Loss",
    question: "An item bought for ₹800 is sold for ₹720. Find the loss percentage.",
    options: ["5%", "10%", "12%", "15%"],
    answer: 1,
    explanation: "Loss = ₹80. Loss percentage = (80 / 800) × 100 = 10%.",
  },
  {
    topic: "Time and Work",
    question: "A can finish a job in 10 days. What part of the job does A complete in one day?",
    options: ["1/5", "1/10", "1/15", "10"],
    answer: 1,
    explanation: "One day's work = 1 / total days = 1/10.",
  },
  {
    topic: "Time and Work",
    question: "A finishes work in 6 days and B in 3 days. How long will they take together?",
    options: ["1 day", "2 days", "3 days", "4 days"],
    answer: 1,
    explanation: "Combined daily work = 1/6 + 1/3 = 1/2. They need 2 days.",
  },
  {
    topic: "Speed and Distance",
    question: "A car travels 150 km in 3 hours. What is its average speed?",
    options: ["30 km/h", "40 km/h", "50 km/h", "60 km/h"],
    answer: 2,
    explanation: "Speed = Distance / Time = 150 / 3 = 50 km/h.",
  },
  {
    topic: "Speed and Distance",
    question: "How far does a vehicle travel at 60 km/h in 2.5 hours?",
    options: ["120 km", "140 km", "150 km", "180 km"],
    answer: 2,
    explanation: "Distance = Speed × Time = 60 × 2.5 = 150 km.",
  },
  {
    topic: "Number Series",
    question: "Find the next number: 2, 6, 12, 20, 30, __",
    options: ["36", "40", "42", "44"],
    answer: 2,
    explanation: "The differences are 4, 6, 8, 10. The next difference is 12, so 30 + 12 = 42.",
  },
  {
    topic: "Number Series",
    question: "Find the next number: 3, 9, 27, 81, __",
    options: ["162", "189", "243", "324"],
    answer: 2,
    explanation: "Each number is multiplied by 3. Therefore, 81 × 3 = 243.",
  },
  {
    topic: "Logical Reasoning",
    question: "All roses are flowers. All flowers are plants. Which conclusion follows?",
    options: [
      "All plants are roses",
      "All roses are plants",
      "No roses are plants",
      "All flowers are roses",
    ],
    answer: 1,
    explanation: "Since every rose is a flower and every flower is a plant, every rose is a plant.",
  },
  {
    topic: "Logical Reasoning",
    question: "If CAT is coded as DBU, how is DOG coded using the same rule?",
    options: ["EPH", "EOG", "FPH", "DPH"],
    answer: 0,
    explanation: "Each letter moves one position forward: D → E, O → P, G → H.",
  },
  {
    topic: "Probability",
    question: "A fair six-sided die is rolled once. What is the probability of getting an even number?",
    options: ["1/6", "1/3", "1/2", "2/3"],
    answer: 2,
    explanation: "Even outcomes are 2, 4 and 6. Probability = 3/6 = 1/2.",
  },
  {
    topic: "Averages",
    question: "Find the average of 10, 20, 30, 40 and 50.",
    options: ["20", "25", "30", "35"],
    answer: 2,
    explanation: "Average = (10 + 20 + 30 + 40 + 50) / 5 = 30.",
  },
  {
    topic: "Ratios",
    question: "The ratio of boys to girls is 2:3. If there are 25 students, how many are girls?",
    options: ["10", "12", "15", "18"],
    answer: 2,
    explanation: "Total parts = 5. Each part = 25 / 5 = 5. Girls = 3 × 5 = 15.",
  },
];

const topics = ["All Topics", ...new Set(questions.map((q) => q.topic))];

export default function AptitudePractice() {
  const [topic, setTopic] = useState("All Topics");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState({});
  const [finished, setFinished] = useState(false);

  const filtered = questions.filter(
    (q) => topic === "All Topics" || q.topic === topic
  );
  const current = filtered[index];
  const answered = current ? selected[current.question] : undefined;
  const score = filtered.reduce(
    (total, q) => total + (selected[q.question] === q.answer ? 1 : 0),
    0
  );

  function changeTopic(nextTopic) {
    setTopic(nextTopic);
    setIndex(0);
    setSelected({});
    setFinished(false);
  }

  function nextQuestion() {
    if (index < filtered.length - 1) {
      setIndex((value) => value + 1);
    } else {
      setFinished(true);
    }
  }

  function restart() {
    setIndex(0);
    setSelected({});
    setFinished(false);
  }

  return (
    <div className="aptitude-page">
      <div className="practice-heading">
       
        <p>Learn concepts and practice important placement-style MCQs.</p>
      </div>

      <div className="aptitude-topics">
        {topics.map((item) => (
          <button
            key={item}
            className={topic === item ? "topic-button selected" : "topic-button"}
            onClick={() => changeTopic(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {!finished && current && (
        <section className="aptitude-card">
          <div className="question-meta">
            <span>{current.topic}</span>
            <span>Question {index + 1} of {filtered.length}</span>
          </div>

          <div className="question-progress">
            <div style={{ width: `${((index + 1) / filtered.length) * 100}%` }} />
          </div>

          <h3>{current.question}</h3>

          <div className="answer-options">
            {current.options.map((option, optionIndex) => {
              let className = "answer-option";
              if (answered !== undefined && optionIndex === current.answer) {
                className += " correct";
              } else if (answered === optionIndex && answered !== current.answer) {
                className += " incorrect";
              }

              return (
                <button
                  key={option}
                  className={className}
                  disabled={answered !== undefined}
                  onClick={() =>
                    setSelected((previous) => ({
                      ...previous,
                      [current.question]: optionIndex,
                    }))
                  }
                >
                  <span>{String.fromCharCode(65 + optionIndex)}</span>
                  {option}
                </button>
              );
            })}
          </div>

          {answered !== undefined && (
            <div className="answer-explanation">
              <strong>
                {answered === current.answer ? "Correct answer!" : "Not quite."}
              </strong>
              <p>{current.explanation}</p>
            </div>
          )}

          <div className="question-footer">
            <span>Correct answers: {score}</span>
            <button
              className="primary-practice-button"
              disabled={answered === undefined}
              onClick={nextQuestion}
            >
              {index === filtered.length - 1 ? "View Results" : "Next Question"} →
            </button>
          </div>
        </section>
      )}

      {finished && (
        <section className="aptitude-card result-card">
          <div className="result-icon">✓</div>
          <h3>Practice Complete!</h3>
          <p>You scored {score} out of {filtered.length}.</p>
          <div className="result-score">
            {Math.round((score / filtered.length) * 100)}%
          </div>
          <p>
            {score / filtered.length >= 0.8
              ? "Great work! Try another topic to keep improving."
              : "Review the explanations and practise again to improve your score."}
          </p>
          <button className="primary-practice-button" onClick={restart}>
            Try Again
          </button>
        </section>
      )}
    </div>
  );
}
