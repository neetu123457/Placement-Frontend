import { useState } from "react";

const PracticeQuestions = () => {

  const questions = [
    {
      question:
        "Which keyword is used to declare a constant in JavaScript?",
      options: [
        "var",
        "let",
        "const",
        "static"
      ],
      answer: "const"
    },
    {
      question:
        "Which data structure follows FIFO?",
      options: [
        "Stack",
        "Queue",
        "Tree",
        "Graph"
      ],
      answer: "Queue"
    },
    {
      question:
        "Which library is commonly used to build React user interfaces?",
      options: [
        "React",
        "MongoDB",
        "Express",
        "Node"
      ],
      answer: "React"
    }
  ];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);

  const submitAnswer = () => {

    if (!selected) {
      alert("Select an answer");
      return;
    }

    if (
      selected === questions[current].answer
    ) {
      setScore(score + 1);
    }

    setSelected("");

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      alert(
        `Quiz completed! Score: ${score + (selected === questions[current].answer ? 1 : 0)}/${questions.length}`
      );
    }
  };

  const question = questions[current];

  return (
    <div className="dashboard-card">

      <h1>Practice Questions</h1>

      <p>
        Question {current + 1} of {questions.length}
      </p>

      <h2>{question.question}</h2>

      <div className="options">

        {question.options.map((option) => (

          <label
            key={option}
            className="option"
          >

            <input
              type="radio"
              name="answer"
              value={option}
              checked={selected === option}
              onChange={(e) =>
                setSelected(e.target.value)
              }
            />

            {option}

          </label>

        ))}

      </div>

      <button
        className="primary-button"
        onClick={submitAnswer}
      >
        Submit Answer
      </button>

    </div>
  );
};

export default PracticeQuestions;