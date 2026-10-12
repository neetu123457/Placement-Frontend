const ProgressTracker = () => {

  const progress = [
    {
      name: "DSA",
      value: 62
    },
    {
      name: "Frontend Development",
      value: 80
    },
    {
      name: "Backend Development",
      value: 55
    },
    {
      name: "Mock Interviews",
      value: 75
    },
    {
      name: "Resume",
      value: 90
    }
  ];

  return (
    <div>

      <div className="page-header">
        <div>
          <h1>Progress Tracker</h1>

          <p>
            Track your placement preparation.
          </p>
        </div>
      </div>

      <div className="dashboard-card">

        <h2>Overall Progress</h2>

        <div className="overall-progress">
          72%
        </div>

        {progress.map((item) => (

          <div
            className="progress-item"
            key={item.name}
          >

            <div className="progress-info">
              <span>{item.name}</span>
              <strong>{item.value}%</strong>
            </div>

            <div className="progress-container">

              <div
                className="progress-bar"
                style={{
                  width: `${item.value}%`
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default ProgressTracker;