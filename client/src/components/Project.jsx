/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Project(props) {
  const [actions, setActions] = useState([]);
  const { id } = props.match.params;
  const api = "http://localhost:4000/api/projects";
  const home = "/";

  useEffect(() => {
    axios
      .get(`${api}/${id}/actions`)
      .then(res => {
        setActions(res.data.projectActions);
      })
      .catch(err => console.log(err));
  }, [id]);

  return (
    <div className="App">
      <h1>Project's Actions</h1>
      <div className="center">
        {actions.map(action => (
          <div className="card">
            <p>{action.description}</p>
            <p>{action.notes}</p>
          </div>
        ))}
      </div>
      <Link to={`${home}`}>
        <button>List of Projects</button>
      </Link>
    </div>
  );
}

export default Project;
