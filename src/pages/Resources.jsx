const Resources = () => {

  const resources = [
    {
      title: "JavaScript Documentation",
      category: "Frontend"
    },
    {
      title: "React Documentation",
      category: "Frontend"
    },
    {
      title: "DSA Practice",
      category: "DSA"
    },
    {
      title: "Interview Questions",
      category: "Interview"
    },
    {
      title: "Resume Writing Guide",
      category: "Resume"
    }
  ];

  return (
    <div>

      <div className="page-header">
        <div>
          <h1>Resources</h1>
          <p>
            Useful resources for placement preparation.
          </p>
        </div>
      </div>

      <div className="resource-grid">

        {resources.map((resource) => (

          <div
            className="resource-card"
            key={resource.title}
          >

            <span>
              {resource.category}
            </span>

            <h3>
              {resource.title}
            </h3>

            <button className="secondary-button">
              View Resource
            </button>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Resources;