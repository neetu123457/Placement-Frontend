import { useState } from "react";

const questions = [
  {
    question:
      "What is the difference between let, const and var in JavaScript?",
    category: "Technical"
  },
  {
    question:
      "Explain the concept of React components.",
    category: "Technical"
  },
  {
    question:
      "Tell me about yourself.",
    category: "HR"
  },
  {
    question:
      "Where do you see yourself in five years?",
    category: "HR"
  }
];

const MockInterview = () => {

  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [finished, setFinished] = useState(false);

  const startInterview = () => {
    setStarted(true);
  };

  const nextQuestion = () => {

    if (current < questions.length - 1) {

      setCurrent(current + 1);
      setAnswer("");

    } else {

      setFinished(true);

    }
  };

  if (finished) {

    return (
      <div className="dashboard-card">

        <h1>Interview Completed 🎉</h1>

        <h2>Score: 80%</h2>

        <p>
          Good job! Continue practicing your weak areas.
        </p>

        <button
          className="primary-button"
          onClick={() => {
            setFinished(false);
            setStarted(false);
            setCurrent(0);
          }}
        >
          Take Another Interview
        </button>

      </div>
    );
  }

  if (!started) {

    return (
      <div className="dashboard-card">

        <h1>Mock Interview</h1>

        <p>
          Practice technical and HR interview questions.
        </p>

        <div className="interview-options">

          <div>
            <h3>Technical Interview</h3>
            <p>Programming and CS fundamentals</p>
          </div>

          <div>
            <h3>HR Interview</h3>
            <p>Behavioral and personality questions</p>
          </div>

        </div>

        <button
          className="primary-button"
          onClick={startInterview}
        >
          Start Mock Interview
        </button>

      </div>
    );
  }

  const question = questions[current];

  return (
    <div className="dashboard-card">

      <div className="question-header">

        <span>
          Question {current + 1} / {questions.length}
        </span>

        <span>
          {question.category}
        </span>

      </div>

      <h2>
        {question.question}
      </h2>

      <textarea
        value={answer}
        onChange={(e) =>
          setAnswer(e.target.value)
        }
        placeholder="Type your answer..."
        rows="8"
      />

      <button
        className="primary-button"
        onClick={nextQuestion}
      >
        {current === questions.length - 1
          ? "Finish Interview"
          : "Next Question"}
      </button>

    </div>
  );
};

export default MockInterview;