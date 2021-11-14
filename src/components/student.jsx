import React, { useState } from 'react';
import Tags from './tags.jsx';

const Student = ({ data }) => {
  const [showGrades, toggleGrades] = useState(false);
  const [tags, updateTags] = useState([]);

  const getAverage = () => {
    const totalGrades = data.grades.reduce(((sum, grade) => sum + parseInt(grade)), 0)
    return (totalGrades / data.grades.length).toFixed(3)
  }

  const listGrades = () => (
    <ul className="grades">
      {data.grades.map((grade, i) => (
        <li key={i}>Test {i + 1}: {grade}%</li>
      ))}
    </ul>
  )

  return (
    <div className="student">
      <div>
        <img className="pic" src={data.pic} alt={`image of ${data.firstName}`} />
      </div>
      <div className="profile">
        <h1>{data.firstName} {data.lastName}</h1>
        <ul className="summary">
          <li>Email: {data.email}</li>
          <li>Company: {data.company}</li>
          <li>Skill: {data.skill}</li>
          <li>Average: {getAverage()}%</li>
        </ul>
        {showGrades ? listGrades() : null}
        <Tags name={data.firstName + ' ' + data.lastName} />
      </div>
      <div>
        <button className="toggle" onClick={() => toggleGrades(!showGrades)}>
          {showGrades ? '-' : '+'}
        </button>
      </div>
    </div>
  )
};

export default Student;