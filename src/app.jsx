import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import './styles.css';

import Student from './components/student';

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

  const filterList = () => {
    if (!filterName) {
      return students.slice();
    }

    return students.filter((student) => {
      const studentName = student.firstName + ' ' + student.lastName
      return studentName.indexOf(filter) !== -1;
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
    < >
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
    </>
  )
}

ReactDom.render(<App />, document.getElementById('app'));