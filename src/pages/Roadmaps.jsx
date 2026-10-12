import { useState } from "react";

const Roadmaps = () => {

  const [completed, setCompleted] = useState([]);

  const topics = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Projects"
  ];

  const toggleTopic = (topic) => {

    if (completed.includes(topic)) {

      setCompleted(
        completed.filter(
          item => item !== topic
        )
      );

    } else {

      setCompleted([
        ...completed,
        topic
      ]);

    }
  };

  const progress =
    Math.round(
      (completed.length / topics.length) * 100
    );

  return (
    <div>

      <div className="page-header">

        <div>
          <h1>Roadmaps</h1>

          <p>
            Follow structured learning paths.
          </p>
        </div>

      </div>

      <div className="dashboard-card">

        <h2>Full Stack Developer Roadmap</h2>

        <div className="progress-container">

          <div
            className="progress-bar"
            style={{
              width: `${progress}%`
            }}
          />

        </div>

        <p>
          {progress}% completed
        </p>

        <div className="roadmap-list">

          {topics.map((topic) => (

            <label
              className="roadmap-item"
              key={topic}
            >

              <input
                type="checkbox"
                checked={completed.includes(topic)}
                onChange={() =>
                  toggleTopic(topic)
                }
              />

              <span>{topic}</span>

            </label>

          ))}

        </div>

      </div>

    </div>
  );
};

export default Roadmaps;