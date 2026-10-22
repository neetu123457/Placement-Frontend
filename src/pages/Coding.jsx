import { useEffect, useRef, useState } from "react";
import "./Coding.css";
import { apiRequest } from "../utils/api";

const problems = [
  {
    title: "Reverse a String",
    difficulty: "Easy",
    topic: "Strings",
    description: "Given a string, return its characters in reverse order.",
    input: '"hello"',
    output: '"olleh"',
    hint: "Try iterating from the last character to the first.",
    starter: {
      JavaScript: "function reverseString(s) {\n  // Write your code\n}",
      Python: "def reverse_string(s):\n    # Write your code\n    pass",
      Java: "static String reverseString(String s) {\n    // Write your code\n    return \"\";\n}",
      "C++": "string reverseString(string s) {\n    // Write your code\n    return \"\";\n}",
    },
  },
  {
    title: "Palindrome Number",
    difficulty: "Easy",
    topic: "Numbers",
    description: "Determine whether an integer reads the same forwards and backwards.",
    input: "121",
    output: "true",
    hint: "Reverse the number or compare its string representation with its reverse.",
    starter: {
      JavaScript: "function isPalindrome(n) {\n  // Write your code\n}",
      Python: "def is_palindrome(n):\n    # Write your code\n    pass",
      Java: "static boolean isPalindrome(int n) {\n    // Write your code\n    return false;\n}",
      "C++": "bool isPalindrome(int n) {\n    // Write your code\n    return false;\n}",
    },
  },
  {
    title: "Two Sum",
    difficulty: "Medium",
    topic: "Arrays",
    description: "Return the indices of two array elements whose sum equals the target. Assume one solution exists.",
    input: "nums = [2, 7, 11, 15], target = 9",
    output: "[0, 1]",
    hint: "For each number, look for target minus that number. A hash map can make this efficient.",
    starter: {
      JavaScript: "function twoSum(nums, target) {\n  // Write your code\n}",
      Python: "def two_sum(nums, target):\n    # Write your code\n    pass",
      Java: "static int[] twoSum(int[] nums, int target) {\n    // Write your code\n    return new int[]{};\n}",
      "C++": "vector<int> twoSum(vector<int>& nums, int target) {\n    // Write your code\n    return {};\n}",
    },
  },
  {
    title: "FizzBuzz",
    difficulty: "Easy",
    topic: "Loops",
    description: "For numbers 1 through n, print Fizz for multiples of 3, Buzz for multiples of 5, and FizzBuzz for multiples of both.",
    input: "n = 5",
    output: "1, 2, Fizz, 4, Buzz",
    hint: "Check divisibility by both 3 and 5 before checking each separately.",
    starter: {
      JavaScript: "function fizzBuzz(n) {\n  // Write your code\n}",
      Python: "def fizz_buzz(n):\n    # Write your code\n    pass",
      Java: "static void fizzBuzz(int n) {\n    // Write your code\n}",
      "C++": "void fizzBuzz(int n) {\n    // Write your code\n}",
    },
  },
  {
    title: "Second Largest Element",
    difficulty: "Easy",
    topic: "Arrays",
    description: "Find the second-largest distinct element in an array. Return null if it does not exist.",
    input: "[10, 5, 20, 8]",
    output: "10",
    hint: "Track the largest and second-largest distinct values in one pass.",
    starter: {
      JavaScript: "function secondLargest(nums) {\n  // Write your code\n}",
      Python: "def second_largest(nums):\n    # Write your code\n    pass",
      Java: "static Integer secondLargest(int[] nums) {\n    // Write your code\n    return null;\n}",
      "C++": "int secondLargest(vector<int>& nums) {\n    // Write your code\n    return -1;\n}",
    },
  },
  {
    title: "Count Vowels",
    difficulty: "Easy",
    topic: "Strings",
    description: "Count the vowels (a, e, i, o, u) in a string, ignoring letter case.",
    input: '"Education"',
    output: "5",
    hint: "Convert the string to lowercase and check each character against the vowels.",
    starter: {
      JavaScript: "function countVowels(s) {\n  // Write your code\n}",
      Python: "def count_vowels(s):\n    # Write your code\n    pass",
      Java: "static int countVowels(String s) {\n    // Write your code\n    return 0;\n}",
      "C++": "int countVowels(string s) {\n    // Write your code\n    return 0;\n}",
    },
  },
  {
    title: "Valid Anagram",
    difficulty: "Medium",
    topic: "Strings",
    description: "Check whether two strings contain the same characters with the same frequencies.",
    input: '"listen", "silent"',
    output: "true",
    hint: "Compare sorted characters or count each character's frequency.",
    starter: {
      JavaScript: "function isAnagram(a, b) {\n  // Write your code\n}",
      Python: "def is_anagram(a, b):\n    # Write your code\n    pass",
      Java: "static boolean isAnagram(String a, String b) {\n    // Write your code\n    return false;\n}",
      "C++": "bool isAnagram(string a, string b) {\n    // Write your code\n    return false;\n}",
    },
  },
  {
    title: "Binary Search",
    difficulty: "Medium",
    topic: "Searching",
    description: "Find the index of a target in a sorted array. Return -1 if it is absent.",
    input: "nums = [1, 3, 5, 7, 9], target = 7",
    output: "3",
    hint: "Maintain left and right pointers and repeatedly check the middle element.",
    starter: {
      JavaScript: "function binarySearch(nums, target) {\n  // Write your code\n}",
      Python: "def binary_search(nums, target):\n    # Write your code\n    pass",
      Java: "static int binarySearch(int[] nums, int target) {\n    // Write your code\n    return -1;\n}",
      "C++": "int binarySearch(vector<int>& nums, int target) {\n    // Write your code\n    return -1;\n}",
    },
  },
  {
    title: "First Non-Repeating Character",
    difficulty: "Medium",
    topic: "Strings",
    description: "Return the first character that appears exactly once, or null if none exists.",
    input: '"swiss"',
    output: '"w"',
    hint: "Count each character first, then scan the string again in order.",
    starter: {
      JavaScript: "function firstUniqueChar(s) {\n  // Write your code\n}",
      Python: "def first_unique_char(s):\n    # Write your code\n    pass",
      Java: "static Character firstUniqueChar(String s) {\n    // Write your code\n    return null;\n}",
      "C++": "char firstUniqueChar(string s) {\n    // Write your code\n    return '\\0';\n}",
    },
  },
  {
    title: "Move Zeroes",
    difficulty: "Medium",
    topic: "Arrays",
    description: "Move all zeroes to the end of an array while preserving the order of non-zero elements.",
    input: "[0, 1, 0, 3, 12]",
    output: "[1, 3, 12, 0, 0]",
    hint: "Place non-zero elements first, then fill the remaining positions with zeroes.",
    starter: {
      JavaScript: "function moveZeroes(nums) {\n  // Write your code\n}",
      Python: "def move_zeroes(nums):\n    # Write your code\n    pass",
      Java: "static void moveZeroes(int[] nums) {\n    // Write your code\n}",
      "C++": "void moveZeroes(vector<int>& nums) {\n    // Write your code\n}",
    },
  },
];

const languages = ["JavaScript", "Python", "Java", "C++"];

export default function Coding() {
  const [problemIndex, setProblemIndex] = useState(0);
  const [language, setLanguage] = useState("JavaScript");
  const [drafts, setDrafts] = useState({});
  const [showHint, setShowHint] = useState(false);
  const [solved, setSolved] = useState([]);
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [resumingSession, setResumingSession] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const saveQueue = useRef(Promise.resolve());

  useEffect(() => {
    apiRequest("/practice/progress")
      .then((progress) => {
        setSolved(
          (progress.codingSolved || [])
            .map((title) => problems.findIndex((item) => item.title === title))
            .filter((problemId) => problemId >= 0)
        );
        setDrafts(progress.codingDrafts || {});
        const savedProblemIndex = problems.findIndex(
          (item) => item.title === progress.codingSession?.currentProblem
        );
        if (savedProblemIndex >= 0) {
          setProblemIndex(savedProblemIndex);
          setResumingSession(true);
        }
        if (languages.includes(progress.codingSession?.language)) {
          setLanguage(progress.codingSession.language);
        }
      })
      .catch((error) => setSaveStatus(error.message))
      .finally(() => setProgressLoaded(true));
  }, []);

  useEffect(() => {
    if (!progressLoaded) return undefined;

    const timeout = window.setTimeout(() => {
      persistProgress(problemIndex, language, drafts, solved);
    }, 700);

    return () => window.clearTimeout(timeout);
  }, [drafts, language, problemIndex, progressLoaded, solved]);

  const problem = problems[problemIndex];
  const draftKey = `${problem.title}-${language}`;
  const code = drafts[draftKey] ?? problem.starter[language];

  function changeProblem(index) {
    setProblemIndex(index);
    setShowHint(false);
    persistProgress(index, language, drafts, solved);
  }

  function changeLanguage(nextLanguage) {
    setLanguage(nextLanguage);
    persistProgress(problemIndex, nextLanguage, drafts, solved);
  }

  function persistProgress(activeProblemIndex, activeLanguage, currentDrafts, currentSolved) {
    const save = saveQueue.current.then(() => apiRequest("/practice/coding", {
      method: "PUT",
      body: JSON.stringify({
        solvedProblemIds: currentSolved.map((id) => problems[id].title),
        drafts: currentDrafts,
        currentProblem: problems[activeProblemIndex].title,
        language: activeLanguage,
      }),
    }));
    saveQueue.current = save.catch(() => {});
    save
      .then(() => setSaveStatus("Progress saved to your account."))
      .catch((error) => setSaveStatus(error.message));
  }

  function toggleSolved() {
    const nextSolved = solved.includes(problemIndex)
      ? solved.filter((item) => item !== problemIndex)
      : [...solved, problemIndex];
    setSolved(nextSolved);
    persistProgress(problemIndex, language, drafts, nextSolved);
  }

  return (
    <div className="coding-page">
      <div className="practice-heading">
        {resumingSession && (
          <p role="status">Resuming your saved work on {problem.title}.</p>
        )}
        <p>
          Practice important programming questions, improve problem-solving
          skills, and prepare for placement coding rounds.
        </p>
      </div>

      <div className="coding-summary">
        <div>
          <strong>{problems.length}</strong>
          <span>Total Problems</span>
        </div>
        <div>
          <strong>{solved.length}</strong>
          <span>Marked Solved</span>
        </div>
        <div>
          <strong>{problems.length - solved.length}</strong>
          <span>Remaining</span>
        </div>
      </div>

      <div className="coding-layout">
        <aside className="problem-list">
          <h3>Important Questions</h3>

          {problems.map((item, index) => (
            <button
              key={item.title}
              className={
                problemIndex === index
                  ? "problem-item active"
                  : "problem-item"
              }
              disabled={!progressLoaded}
              onClick={() => changeProblem(index)}
            >
              <span className="problem-number">
                {solved.includes(index)
                  ? "✓"
                  : String(index + 1).padStart(2, "0")}
              </span>

              <span className="problem-name">{item.title}</span>

              <span className={`difficulty ${item.difficulty.toLowerCase()}`}>
                {item.difficulty}
              </span>
            </button>
          ))}
        </aside>

        <section className="problem-workspace">
          <div className="problem-heading">
            <span className="problem-topic">{problem.topic}</span>
            <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>
              {problem.difficulty}
            </span>
          </div>

          <h3>{problem.title}</h3>
          <p className="problem-description">{problem.description}</p>

          <div className="example-box">
            <strong>Example Input</strong>
            <code>{problem.input}</code>

            <strong>Expected Output</strong>
            <code>{problem.output}</code>
          </div>

          <button
            type="button"
            className="hint-button"
            onClick={() => setShowHint((value) => !value)}
          >
            {showHint ? "Hide Hint" : "Show Hint"}
          </button>

          {showHint && <div className="hint-box">{problem.hint}</div>}

          <div className="editor-toolbar">
            <label htmlFor="coding-language">Select Language</label>

            <select
              id="coding-language"
              value={language}
              disabled={!progressLoaded}
              onChange={(event) => changeLanguage(event.target.value)}
            >
              {languages.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <textarea
            className="code-editor"
            aria-label="Write your solution"
            spellCheck={false}
            value={code}
            disabled={!progressLoaded}
            onChange={(event) =>
              setDrafts((previous) => ({
                ...previous,
                [draftKey]: event.target.value,
              }))
            }
            onBlur={() => persistProgress(problemIndex, language, drafts, solved)}
          />

          <div className="coding-actions">
            <button
              type="button"
              className="mark-solved-button"
              disabled={!progressLoaded}
              onClick={toggleSolved}
            >
              {solved.includes(problemIndex)
                ? "✓ Marked Solved"
                : "Mark as Solved"}
            </button>

            <div className="problem-navigation">
              <button
                type="button"
                disabled={!progressLoaded || problemIndex === 0}
                onClick={() => changeProblem(problemIndex - 1)}
              >
                ← Previous
              </button>

              <button
                type="button"
                disabled={!progressLoaded || problemIndex === problems.length - 1}
                onClick={() => changeProblem(problemIndex + 1)}
              >
                Next →
              </button>
            </div>
          </div>

          <p className="editor-note">
            {progressLoaded ? saveStatus : "Loading your saved progress..."}
            {" "}This editor does not run or test code.
          </p>
        </section>
      </div>
    </div>
  );
}