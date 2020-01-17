/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const api = "http://localhost:4000/api/projects";

  useEffect(() => {
    axios
      .get(api)
      .then(res => {
        setProjects(res.data.projects);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>List of Projects</h1>
      {projects.map(project => (
        <div>
          <Link to={`/${project.id}/actions`}>
            <button>{project.name}</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
