import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import './styles.css';

import Student from './components/student.jsx';
import TagContext from './tagContext.jsx';

const url = 'https://api.hatchways.io/assessment/students';

const App = () => {
  const [students, updateStudents] = useState([]);
  const [tags, updateTags] = useState({})
  const [filterName, setNameFilter] = useState('');
  const [filterTag, setTagFilter] = useState('');

  useEffect(() => {
    axios.get(url)
      .then(({ data }) => {
        updateStudents(data.students);
      }).catch(error => console.error('Unable to access students:', error));
  }, [])

  if (!students.length) {
    return (
      <p>Loading...</p>
    )
  }

  const nameFound = (studentName) => {
    if (!filterName) {
      return true;
    }

    return studentName.indexOf(filterName) !== -1
  }

  const tagFound = (studentName) => {
    if (!filterTag) {
      return true;
    }
    let tagDetected = false;

    if (tags[studentName]) {
      for (let i = 0; i < tags[studentName].length; i++) {
        if (tags[studentName][i].indexOf(filterTag) !== -1) {
          tagDetected = true;
          break;
        }
      }
    }

    return tagDetected;
  }

  const filterList = () => {
    if (!filterName && !filterTag) {
      return students.slice();
    }

    return students.filter((student) => {
      const studentName = student.firstName + ' ' + student.lastName
      return nameFound(studentName) && tagFound(studentName);
    })
  }

  const listStudents = () => {
    const studentList = filterList();
    if (!studentList.length) {
      return (
        <h1>No Students Found...</h1>
      )
    }

    return studentList.map((student, i) => (
      <Student key={student.email} data={student} />
    ));
  }

  return (
    <TagContext.Provider value={{ tags, updateTags }}>
      <div className="searchBar">
        <input
          id="searchName"
          className="search"
          type="search"
          placeholder="Search by name"
          onChange={(e) => setNameFilter(e.target.value)}
        />
        <input
          id="searchTag"
          className="search"
          type="search"
          placeholder="Search by tag"
          onChange={(e) => setTagFilter(e.target.value)}
        />
      </div>
      <div className="list">
        {listStudents()}
      </div>
    </TagContext.Provider>
  )
}

ReactDom.render(<App />, document.getElementById('app'));