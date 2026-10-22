
import { useCallback, useEffect, useRef, useState } from "react";
import "./AptitudeCoding.css";
import { apiRequest } from "../utils/api";

const questions = [
  {
    id: "percent-20-of-250",
    topic: "Percentages",
    question: "What is 20% of 250?",
    options: ["25", "40", "50", "60"],
    answer: 2,
    explanation: "20% of 250 = (20 / 100) × 250 = 50.",
  },
  {
    id: "percent-increase-80-to-100",
    topic: "Percentages",
    question: "A number increases from 80 to 100. What is the percentage increase?",
    options: ["20%", "25%", "30%", "40%"],
    answer: 1,
    explanation: "Increase = 100 - 80 = 20. Percentage increase = (20 / 80) × 100 = 25%.",
  },
  {
    id: "profit-percentage-500-to-600",
    topic: "Profit and Loss",
    question: "An item costs ₹500 and is sold for ₹600. What is the profit percentage?",
    options: ["10%", "15%", "20%", "25%"],
    answer: 2,
    explanation: "Profit = ₹100. Profit percentage = (100 / 500) × 100 = 20%.",
  },
  {
    id: "loss-percentage-800-to-720",
    topic: "Profit and Loss",
    question: "An item bought for ₹800 is sold for ₹720. Find the loss percentage.",
    options: ["5%", "10%", "12%", "15%"],
    answer: 1,
    explanation: "Loss = ₹80. Loss percentage = (80 / 800) × 100 = 10%.",
  },
  {
    id: "one-day-work-10-days",
    topic: "Time and Work",
    question: "A can finish a job in 10 days. What part of the job does A complete in one day?",
    options: ["1/5", "1/10", "1/15", "10"],
    answer: 1,
    explanation: "One day's work = 1 / total days = 1/10.",
  },
  {
    id: "combined-work-6-and-3-days",
    topic: "Time and Work",
    question: "A finishes work in 6 days and B in 3 days. How long will they take together?",
    options: ["1 day", "2 days", "3 days", "4 days"],
    answer: 1,
    explanation: "Combined daily work = 1/6 + 1/3 = 1/2. They need 2 days.",
  },
  {
    id: "average-speed-150km-3hours",
    topic: "Speed and Distance",
    question: "A car travels 150 km in 3 hours. What is its average speed?",
    options: ["30 km/h", "40 km/h", "50 km/h", "60 km/h"],
    answer: 2,
    explanation: "Speed = Distance / Time = 150 / 3 = 50 km/h.",
  },
  {
    id: "distance-60kmh-2-5hours",
    topic: "Speed and Distance",
    question: "How far does a vehicle travel at 60 km/h in 2.5 hours?",
    options: ["120 km", "140 km", "150 km", "180 km"],
    answer: 2,
    explanation: "Distance = Speed × Time = 60 × 2.5 = 150 km.",
  },
  {
    id: "number-series-2-6-12-20-30",
    topic: "Number Series",
    question: "Find the next number: 2, 6, 12, 20, 30, __",
    options: ["36", "40", "42", "44"],
    answer: 2,
    explanation: "The differences are 4, 6, 8, 10. The next difference is 12, so 30 + 12 = 42.",
  },
  {
    id: "number-series-3-9-27-81",
    topic: "Number Series",
    question: "Find the next number: 3, 9, 27, 81, __",
    options: ["162", "189", "243", "324"],
    answer: 2,
    explanation: "Each number is multiplied by 3. Therefore, 81 × 3 = 243.",
  },
  {
    id: "roses-flowers-plants",
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
    id: "code-cat-to-dog",
    topic: "Logical Reasoning",
    question: "If CAT is coded as DBU, how is DOG coded using the same rule?",
    options: ["EPH", "EOG", "FPH", "DPH"],
    answer: 0,
    explanation: "Each letter moves one position forward: D → E, O → P, G → H.",
  },
  {
    id: "probability-even-die-roll",
    topic: "Probability",
    question: "A fair six-sided die is rolled once. What is the probability of getting an even number?",
    options: ["1/6", "1/3", "1/2", "2/3"],
    answer: 2,
    explanation: "Even outcomes are 2, 4 and 6. Probability = 3/6 = 1/2.",
  },
  {
    id: "average-10-20-30-40-50",
    topic: "Averages",
    question: "Find the average of 10, 20, 30, 40 and 50.",
    options: ["20", "25", "30", "35"],
    answer: 2,
    explanation: "Average = (10 + 20 + 30 + 40 + 50) / 5 = 30.",
  },
  {
    id: "ratio-boys-girls-25",
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
  const [result, setResult] = useState(null);
  const [resumingSession, setResumingSession] = useState(false);
  const [answersById, setAnswersById] = useState({});
  const [completedQuestionIds, setCompletedQuestionIds] = useState([]);
  const [sessionQuestionIds, setSessionQuestionIds] = useState([]);
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [progressError, setProgressError] = useState("");
  const [savingQuestion, setSavingQuestion] = useState(false);
  const [savedAttempts, setSavedAttempts] = useState([]);
  const [saveMessage, setSaveMessage] = useState("");
  const sessionSaveQueue = useRef(Promise.resolve());

  const queueSessionSave = useCallback((saveRequest) => {
    const save = sessionSaveQueue.current.then(saveRequest);
    sessionSaveQueue.current = save.catch(() => {});
    return save;
  }, []);

  useEffect(() => {
    apiRequest("/practice/progress")
      .then(async (progress) => {
        const completedIds = progress.completedAptitudeQuestionIds || [];
        const savedSession = progress.aptitudeSession;
        const savedTopic = topics.includes(savedSession?.topic)
          ? savedSession.topic
          : "All Topics";
        const questionIds = Array.isArray(savedSession?.questionIds)
          ? savedSession.questionIds.filter((id) =>
            questions.some((question) => question.id === id)
          )
          : questions
            .filter((question) => !completedIds.includes(question.id))
            .map((question) => question.id);
        const answers = {
          ...(progress.completedAptitudeAnswers || {}),
          ...(savedSession?.answers || {}),
        };
        const sessionAnswers = Object.fromEntries(
          Object.entries(answers).filter(([id]) => questionIds.includes(id))
        );
        const currentQuestionId = questionIds.includes(savedSession?.currentQuestionId)
          ? savedSession.currentQuestionId
          : questionIds[0] || null;

        setTopic(savedTopic);
        setCompletedQuestionIds(completedIds);
        setSavedAttempts(progress.aptitudeAttempts || []);
        setSessionQuestionIds(questionIds);
        setAnswersById(sessionAnswers);
        setSelected(
          Object.fromEntries(
            questions
              .filter((question) => questionIds.includes(question.id))
              .filter((question) => Number.isInteger(sessionAnswers[question.id]))
              .map((question) => [question.question, sessionAnswers[question.id]])
          )
        );
        setIndex(Math.max(0, questionIds.indexOf(currentQuestionId)));
        setResumingSession(Boolean(savedSession));
        if (!savedSession) {
          await queueSessionSave(() => apiRequest("/practice/aptitude/session", {
            method: "PUT",
            body: JSON.stringify({
              session: {
                topic: savedTopic,
                questionIds,
                currentQuestionId,
                answers: sessionAnswers,
              },
            }),
          }));
        }
      })
      .catch((error) => setProgressError(error.message))
      .finally(() => setProgressLoaded(true));
  }, [queueSessionSave]);

  const filtered = questions.filter(
    (question) =>
      sessionQuestionIds.includes(question.id) &&
      (topic === "All Topics" || question.topic === topic)
  );
  const current = filtered[index];
  const answered = current ? selected[current.question] : undefined;
  const score = filtered.reduce(
    (total, q) => total + (selected[q.question] === q.answer ? 1 : 0),
    0
  );

  function changeTopic(nextTopic) {
    const nextQuestionIds = questions
      .filter(
        (question) =>
          (nextTopic === "All Topics" || question.topic === nextTopic) &&
          !completedQuestionIds.includes(question.id)
      )
      .map((question) => question.id);
    setTopic(nextTopic);
    setIndex(0);
    setSelected({});
    setAnswersById({});
    setFinished(false);
    setResult(null);
    setSessionQuestionIds(nextQuestionIds);
    setResumingSession(false);
    setSavingQuestion(true);
    queueSessionSave(() =>
      apiRequest("/practice/aptitude/session", {
        method: "PUT",
        body: JSON.stringify({
          session: {
            topic: nextTopic,
            questionIds: nextQuestionIds,
            currentQuestionId: nextQuestionIds[0] || null,
            answers: {},
          },
        }),
      })
    )
      .catch((error) => setSaveMessage(`Session not saved: ${error.message}`))
      .finally(() => setSavingQuestion(false));
  }

  async function selectAnswer(optionIndex) {
    if (!current || answered !== undefined || savingQuestion) return;

    setSavingQuestion(true);
    setSaveMessage("");
    const nextAnswers = { ...answersById, [current.id]: optionIndex };
    const nextSession = {
      topic,
      questionIds: sessionQuestionIds,
      currentQuestionId: current.id,
      answers: nextAnswers,
    };
    try {
      await queueSessionSave(() =>
        apiRequest("/practice/aptitude/completed", {
          method: "POST",
          body: JSON.stringify({
            questionId: current.id,
            selectedOption: optionIndex,
            session: nextSession,
          }),
        })
      );
      setCompletedQuestionIds((previous) =>
        previous.includes(current.id) ? previous : [...previous, current.id]
      );
      setAnswersById(nextAnswers);
      setSelected((previous) => ({
        ...previous,
        [current.question]: optionIndex,
      }));
    } catch (error) {
      setSaveMessage(`Answer not saved. Please try again: ${error.message}`);
    } finally {
      setSavingQuestion(false);
    }
  }

  async function nextQuestion() {
    if (index < filtered.length - 1) {
      const nextIndex = index + 1;
      const nextQuestion = filtered[nextIndex];
      setSavingQuestion(true);
      try {
        await queueSessionSave(() =>
          apiRequest("/practice/aptitude/session", {
            method: "PUT",
            body: JSON.stringify({
              session: {
                topic,
                questionIds: sessionQuestionIds,
                currentQuestionId: nextQuestion.id,
                answers: answersById,
              },
            }),
          })
        );
        setIndex(nextIndex);
      } catch (error) {
        setSaveMessage(`Progress not saved. Please try again: ${error.message}`);
      } finally {
        setSavingQuestion(false);
      }
    } else {
      setResult({ score, total: filtered.length });
      setFinished(true);
      try {
        await apiRequest("/practice/aptitude/attempts", {
          method: "POST",
          body: JSON.stringify({ topic, score, total: filtered.length }),
        });
        setSavedAttempts((previous) => [...previous, { topic, score, total: filtered.length }]);
        setSaveMessage("Result saved to your account.");
        await queueSessionSave(() =>
          apiRequest("/practice/aptitude/session", {
            method: "PUT",
            body: JSON.stringify({ session: null })
          })
        );
      } catch (error) {
        setSaveMessage(`Progress could not be finalized: ${error.message}`);
      }
    }
  }

  function restart() {
    setIndex(0);
    setSelected({});
    setAnswersById({});
    setFinished(false);
    setResult(null);
    setResumingSession(false);
    const remainingQuestionIds = questions
      .filter(
        (question) =>
          (topic === "All Topics" || question.topic === topic) &&
          !completedQuestionIds.includes(question.id)
      )
      .map((question) => question.id);
    setSessionQuestionIds(remainingQuestionIds);
    setSavingQuestion(true);
    queueSessionSave(() =>
      apiRequest("/practice/aptitude/session", {
        method: "PUT",
        body: JSON.stringify({
          session: {
            topic,
            questionIds: remainingQuestionIds,
            currentQuestionId: remainingQuestionIds[0] || null,
            answers: {},
          },
        }),
      })
    )
      .catch((error) => setSaveMessage(`Session not saved: ${error.message}`))
      .finally(() => setSavingQuestion(false));
  }

  return (
    <div className="aptitude-page">
      <div className="practice-heading">
       
        <p>Learn concepts and practice important placement-style MCQs.</p>
        <p role="status">
          {saveMessage || `Saved attempts: ${savedAttempts.length}`}
        </p>
      </div>

      <div className="aptitude-topics">
        {topics.map((item) => (
          <button
            key={item}
            className={topic === item ? "topic-button selected" : "topic-button"}
            disabled={!progressLoaded || savingQuestion}
            onClick={() => changeTopic(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {!progressLoaded && (
        <p className="aptitude-status" role="status">
          Loading your saved practice...
        </p>
      )}

      {progressError && (
        <p className="aptitude-status error" role="alert">
          Unable to load saved practice: {progressError}
        </p>
      )}

      {progressLoaded && !progressError && !finished && !current && (
        <section className="aptitude-card result-card">
          <div className="result-icon">✓</div>
          <h3>All questions completed</h3>
          <p>
            {topic === "All Topics"
              ? "You have completed every aptitude question."
              : `You have completed every ${topic} question.`}
          </p>
          <p>Choose another topic to continue practising.</p>
        </section>
      )}

      {progressLoaded && !progressError && !finished && current && (
        <section className="aptitude-card">
          {resumingSession && (
            <p className="aptitude-status" role="status">
              Resuming your saved {topic} practice.
            </p>
          )}
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
                  disabled={answered !== undefined || savingQuestion}
                  onClick={() => selectAnswer(optionIndex)}
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
          {saveMessage && (
            <p className="aptitude-status" role="alert">{saveMessage}</p>
          )}
          {savingQuestion && (
            <p className="aptitude-status" role="status">
              Saving your completed question...
            </p>
          )}

          <div className="question-footer">
            <span>Correct answers: {score}</span>
            <button
              className="primary-practice-button"
              disabled={answered === undefined || savingQuestion}
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
          <p>You scored {result?.score ?? 0} out of {result?.total ?? 0}.</p>
          <div className="result-score">
            {result?.total
              ? `${Math.round((result.score / result.total) * 100)}%`
              : "0%"}
          </div>
          <p>
            {result?.total && result.score / result.total >= 0.8
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
