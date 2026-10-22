import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";
import "./ProgressTracker.css";

export default function ProgressTracker() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest("/practice/progress")
      .then((progress) => setSummary(progress.completedSummary))
      .catch((requestError) => setError(requestError.message));
  }, []);

  if (error) {
    return (
      <section className="progress-page">
        <header className="progress-heading">
          <p className="progress-eyebrow">YOUR PREPARATION</p>
          <h2>Progress Tracker</h2>
        </header>
        <p className="progress-notice error" role="alert">{error}</p>
      </section>
    );
  }

  if (!summary) {
    return (
      <section className="progress-page" aria-live="polite">
        <header className="progress-heading">
          <p className="progress-eyebrow">YOUR PREPARATION</p>
          <h2>Progress Tracker</h2>
        </header>
        <p className="progress-notice">Loading your completed tasks...</p>
      </section>
    );
  }

  const topics = summary.aptitude.topics;
  const solvedProblems = summary.coding.problems;
  const hasCompletedTasks =
    summary.aptitude.completedAttempts > 0 ||
    summary.coding.completedProblems > 0;

  return (
    <section className="progress-page">
      <header className="progress-heading">
        <p className="progress-eyebrow">YOUR PREPARATION</p>
        <h2>Progress Tracker</h2>
        <p>Visual summaries appear here after you complete practice tasks.</p>
      </header>

      {!hasCompletedTasks ? (
        <div className="progress-empty">
          <div className="progress-empty-icon" aria-hidden="true">◷</div>
          <h3>No completed tasks yet</h3>
          <p>
            Complete an aptitude practice set or mark a coding problem as solved
            to see your progress here.
          </p>
        </div>
      ) : (
        <>
          <div className="progress-stat-grid">
            {summary.aptitude.completedAttempts > 0 && (
              <article className="progress-stat-card aptitude-stat">
                <span className="progress-stat-icon" aria-hidden="true">✓</span>
                <div>
                  <strong>{summary.aptitude.completedAttempts}</strong>
                  <span>Completed aptitude sets</span>
                </div>
              </article>
            )}
            {summary.coding.completedProblems > 0 && (
              <article className="progress-stat-card coding-stat">
                <span className="progress-stat-icon" aria-hidden="true">&lt;/&gt;</span>
                <div>
                  <strong>{summary.coding.completedProblems}</strong>
                  <span>Coding problems completed</span>
                </div>
              </article>
            )}
          </div>

          <div className="task-progress-grid">
            {summary.aptitude.completedTasks > 0 && (
              <article className="task-progress-card aptitude-task-progress">
                <div className="task-progress-heading">
                  <div>
                    <p className="progress-eyebrow">APTITUDE</p>
                    <h3>Practice completed</h3>
                  </div>
                  <strong>{summary.aptitude.completionPercent}%</strong>
                </div>
                <div
                  className="task-progress-track"
                  role="progressbar"
                  aria-label="Aptitude practice completion"
                  aria-valuemin={0}
                  aria-valuemax={summary.aptitude.totalTasks}
                  aria-valuenow={summary.aptitude.completedTasks}
                >
                  <div
                    className="task-progress-fill"
                    style={{ width: `${summary.aptitude.completionPercent}%` }}
                  />
                </div>
                <p>
                  {summary.aptitude.completedTasks} of{" "}
                  {summary.aptitude.totalTasks} practice questions completed
                </p>
              </article>
            )}

            {summary.coding.completedProblems > 0 && (
              <article className="task-progress-card coding-task-progress">
                <div className="task-progress-heading">
                  <div>
                    <p className="progress-eyebrow">CODING</p>
                    <h3>Problems solved</h3>
                  </div>
                  <strong>{summary.coding.completionPercent}%</strong>
                </div>
                <div
                  className="task-progress-track"
                  role="progressbar"
                  aria-label="Coding problem completion"
                  aria-valuemin={0}
                  aria-valuemax={summary.coding.totalProblems}
                  aria-valuenow={summary.coding.completedProblems}
                >
                  <div
                    className="task-progress-fill"
                    style={{ width: `${summary.coding.completionPercent}%` }}
                  />
                </div>
                <p>
                  {summary.coding.completedProblems} of{" "}
                  {summary.coding.totalProblems} coding problems completed
                </p>
              </article>
            )}
          </div>

          {topics.length > 0 && (
            <section className="progress-visual-card" aria-labelledby="aptitude-results-title">
              <div className="progress-card-heading">
                <div>
                  <p className="progress-eyebrow">COMPLETED PRACTICE</p>
                  <h3 id="aptitude-results-title">Aptitude results by topic</h3>
                </div>
                <span className="progress-card-count">
                  {summary.aptitude.completedAttempts} completed
                </span>
              </div>

              <div className="topic-result-list">
                {topics.map((topic) => (
                  <div className="topic-result" key={topic.topic}>
                    <div className="topic-result-label">
                      <strong>{topic.topic}</strong>
                      <span>
                        {topic.completedAttempts}{" "}
                        {topic.completedAttempts === 1 ? "attempt" : "attempts"}
                      </span>
                    </div>
                    <div
                      className="topic-result-track"
                      role="img"
                      aria-label={`${topic.topic}: average score ${topic.averageScorePercent}%`}
                    >
                      <div
                        className="topic-result-fill"
                        style={{ width: `${topic.averageScorePercent}%` }}
                      />
                    </div>
                    <strong className="topic-result-score">
                      {topic.averageScorePercent}%
                    </strong>
                  </div>
                ))}
              </div>
              <p className="progress-chart-caption">
                Average score from completed attempts. Latest results are saved
                with each attempt.
              </p>
            </section>
          )}

          {solvedProblems.length > 0 && (
            <section className="progress-visual-card" aria-labelledby="coding-completed-title">
              <div className="progress-card-heading">
                <div>
                  <p className="progress-eyebrow">COMPLETED PRACTICE</p>
                  <h3 id="coding-completed-title">Coding problems solved</h3>
                </div>
                <span className="progress-card-count">
                  {solvedProblems.length} {solvedProblems.length === 1 ? "problem" : "problems"}
                </span>
              </div>
              <ul className="solved-problem-list">
                {solvedProblems.map((problem) => (
                  <li key={problem}>
                    <span className="solved-check" aria-hidden="true">✓</span>
                    {problem}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </section>
  );
}
