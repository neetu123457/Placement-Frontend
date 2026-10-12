import React, { useRef, useState } from "react";
import "./ResumeAnalyzer.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function ResumeAnalyzer() {
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ==========================================
  // OPEN FILE EXPLORER
  // ==========================================

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // ==========================================
  // FILE SELECTION
  // ==========================================

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files?.[0];

    setError("");
    setResult(null);

    if (!selectedFile) {
      return;
    }

    // Allowed extensions
    const allowedExtensions = ["pdf", "doc", "docx"];

    const extension = selectedFile.name
      .split(".")
      .pop()
      .toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      setError(
        "Invalid file type. Please select a PDF, DOC or DOCX resume."
      );

      event.target.value = "";
      setFile(null);
      return;
    }

    // Maximum 5 MB
    const maxSize = 5 * 1024 * 1024;

    if (selectedFile.size > maxSize) {
      setError("Resume size must be less than 5 MB.");

      event.target.value = "";
      setFile(null);
      return;
    }

    setFile(selectedFile);

    // Automatically analyze the selected resume
    await analyzeResume(selectedFile);
  };

  // ==========================================
  // ANALYZE RESUME
  // ==========================================

  const analyzeResume = async (resumeFile) => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();

      formData.append("resume", resumeFile);

      const response = await fetch(
        `${API_URL}/resume/analyze`,
        {
          method: "POST",
          body: formData,
        }
      );

      // Check response type
      const contentType =
        response.headers.get("content-type") || "";

      let data;

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        throw new Error(
          "Server returned an unexpected response. Please check your backend."
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to analyze resume."
        );
      }

      setResult(data);
    } catch (error) {
      console.error("Resume analysis error:", error);

      setError(
        error.message ||
          "Unable to connect to the resume analyzer."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // REMOVE RESUME
  // ==========================================

  const removeFile = () => {
    setFile(null);
    setResult(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ==========================================
  // SCORE CLASS
  // ==========================================

  const getScoreClass = (score) => {
    if (score >= 85) return "excellent";
    if (score >= 70) return "good";
    if (score >= 55) return "average";

    return "poor";
  };

  // ==========================================
  // SCORE MESSAGE
  // ==========================================

  const getScoreMessage = (score) => {
    if (score >= 85) {
      return "Excellent! Your resume is strong for placement applications.";
    }

    if (score >= 70) {
      return "Good resume. A few improvements can make it stronger.";
    }

    if (score >= 55) {
      return "Your resume has a good foundation but needs improvement.";
    }

    return "Your resume needs significant improvement before applying.";
  };

  return (
    <div className="resume-page">

      {/* ==========================================
          PAGE HEADER
      ========================================== */}

      <div className="page-header">
        <div>
          <h1>Resume Analyzer</h1>

          <p>
            Upload your resume and check how strong it is
            for placement applications.
          </p>
        </div>
      </div>


      {/* ==========================================
          UPLOAD CARD
      ========================================== */}

      <div className="dashboard-card">

        <div className="section-heading">

          <div className="section-icon">
            📄
          </div>

          <div>
            <h2>Upload Resume</h2>

            <p>
              Supported formats: PDF, DOC and DOCX
            </p>

            <span>
              Maximum file size: 5 MB
            </span>
          </div>

        </div>


        {/* ==========================================
            UPLOAD AREA
        ========================================== */}

        <div className="upload-area">

          <div className="upload-icon">
            ↑
          </div>

          <h3>
            Upload your resume
          </h3>

          <p>
            Select your resume from your computer
          </p>


          {/* Hidden file input */}

          <input
            ref={fileInputRef}
            type="file"
            accept="
              .pdf,
              .doc,
              .docx,
              application/pdf,
              application/msword,
              application/vnd.openxmlformats-officedocument.wordprocessingml.document
            "
            onChange={handleFileChange}
            style={{ display: "none" }}
          />


          {/* Upload button */}

          <button
            type="button"
            className="upload-button"
            onClick={handleUploadClick}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Upload Resume"}
          </button>

        </div>


        {/* ==========================================
            ERROR
        ========================================== */}

        {error && (
          <div className="error-message">

            <span>⚠</span>

            <p>{error}</p>

          </div>
        )}


        {/* ==========================================
            SELECTED FILE
        ========================================== */}

        {file && (
          <div className="selected-file">

            <div className="file-details">

              <div className="file-icon">
                📄
              </div>

              <div>
                <strong>
                  {file.name}
                </strong>

                <p>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

            </div>


            <button
              type="button"
              className="remove-button"
              onClick={removeFile}
              disabled={loading}
            >
              Remove
            </button>

          </div>
        )}

      </div>


      {/* ==========================================
          LOADING SECTION
      ========================================== */}

      {loading && (
        <div className="dashboard-card loading-card">

          <div className="spinner"></div>

          <h2>
            Analyzing Resume
          </h2>

          <p>
            Please wait while PlaceMate analyzes your resume.
          </p>


          <div className="analysis-steps">

            <div>
              ✓ Reading resume
            </div>

            <div>
              ✓ Checking skills
            </div>

            <div>
              ✓ Checking projects and education
            </div>

            <div>
              ✓ Calculating resume score
            </div>

          </div>

        </div>
      )}


      {/* ==========================================
          RESULT SECTION
      ========================================== */}

      {result && !loading && (

        <div className="analysis-section">

          {/* ========================================
              SCORE CARD
          ======================================== */}

          <div className="dashboard-card">

            <div className="success-message">
              ✓ Resume analyzed successfully
            </div>


            <div className="score-section">

              <div
                className={`score-circle ${getScoreClass(
                  Number(result.score) || 0
                )}`}
              >

                <strong>
                  {result.score ?? 0}
                </strong>

                <span>
                  /100
                </span>

              </div>


              <div className="score-information">

                <h2>
                  Resume Score
                </h2>

                <h3>
                  {getScoreMessage(
                    Number(result.score) || 0
                  )}
                </h3>

                <p>
                  The score is calculated from the actual
                  content detected in your resume.
                </p>

              </div>

            </div>

          </div>


          {/* ========================================
              CATEGORY ANALYSIS
          ======================================== */}

          <div className="dashboard-card">

            <div className="card-heading">

              <h2>
                Resume Analysis
              </h2>

              <p>
                Performance across important resume categories.
              </p>

            </div>


            <div className="category-grid">

              {result.categories?.length > 0 ? (

                result.categories.map(
                  (category, index) => {

                    const categoryScore = Math.min(
                      Math.max(
                        Number(category.score) || 0,
                        0
                      ),
                      100
                    );

                    return (
                      <div
                        className="category"
                        key={category.name || index}
                      >

                        <div className="category-header">

                          <span>
                            {category.name}
                          </span>

                          <strong>
                            {categoryScore}%
                          </strong>

                        </div>


                        <div className="progress-background">

                          <div
                            className="progress-value"
                            style={{
                              width: `${categoryScore}%`,
                            }}
                          ></div>

                        </div>

                      </div>
                    );
                  }
                )

              ) : (

                <p>
                  No category analysis was returned.
                </p>

              )}

            </div>

          </div>


          {/* ========================================
              STRENGTHS + IMPROVEMENTS
          ======================================== */}

          <div className="two-column">

            {/* STRENGTHS */}

            <div className="dashboard-card">

              <div className="card-heading">

                <h2>
                  ✓ Strengths
                </h2>

                <p>
                  What your resume is doing well.
                </p>

              </div>


              <div className="result-list">

                {result.strengths?.length > 0 ? (

                  result.strengths.map(
                    (item, index) => (

                      <div
                        className="result-item strength"
                        key={index}
                      >

                        <span>
                          ✓
                        </span>

                        <p>
                          {item}
                        </p>

                      </div>

                    )
                  )

                ) : (

                  <p>
                    No major strengths detected.
                  </p>

                )}

              </div>

            </div>


            {/* IMPROVEMENTS */}

            <div className="dashboard-card">

              <div className="card-heading">

                <h2>
                  ⚠ Improvements
                </h2>

                <p>
                  Things you can improve before applying.
                </p>

              </div>


              <div className="result-list">

                {result.improvements?.length > 0 ? (

                  result.improvements.map(
                    (item, index) => (

                      <div
                        className="result-item improvement"
                        key={index}
                      >

                        <span>
                          !
                        </span>

                        <p>
                          {item}
                        </p>

                      </div>

                    )
                  )

                ) : (

                  <p>
                    No major improvements detected.
                  </p>

                )}

              </div>

            </div>

          </div>


          {/* ========================================
              TECHNICAL SKILLS
          ======================================== */}

          <div className="dashboard-card">

            <div className="card-heading">

              <h2>
                Technical Skills Detected
              </h2>

              <p>
                Skills identified from your uploaded resume.
              </p>

            </div>


            <div className="skills">

              {result.skills?.length > 0 ? (

                result.skills.map(
                  (skill, index) => (

                    <span
                      key={`${skill}-${index}`}
                      className="skill"
                    >
                      {skill}
                    </span>

                  )
                )

              ) : (

                <p>
                  No technical skills were detected.
                </p>

              )}

            </div>

          </div>


          {/* ========================================
              PLACEMENT RECOMMENDATIONS
          ======================================== */}

          <div className="dashboard-card">

            <div className="card-heading">

              <h2>
                Placement Recommendations
              </h2>

              <p>
                Suggestions based on your resume analysis.
              </p>

            </div>


            <div className="recommendations">

              {result.recommendations?.length > 0 ? (

                result.recommendations.map(
                  (recommendation, index) => (

                    <div
                      className="recommendation"
                      key={index}
                    >

                      <div className="recommendation-number">
                        {index + 1}
                      </div>

                      <p>
                        {recommendation}
                      </p>

                    </div>

                  )
                )

              ) : (

                <p>
                  No recommendations available.
                </p>

              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default ResumeAnalyzer;