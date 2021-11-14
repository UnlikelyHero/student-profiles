import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import './styles.css';

import Student from './components/student.jsx';

const url = 'https://api.hatchways.io/assessment/students';

const App = () => {
  const [students, updateStudents] = useState([]);
  const [filter, setFilter] = useState('');

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
    if (!filter) {
      return students.slice();
    }

    return students.filter((student) => {
      const studentName = student.firstName + ' ' + student.lastName
      return studentName.indexOf(filter) !== -1;
    })
  }

  const listStudents = () => {
    const studentList = filterList();
    console.log(studentList)
    if (!studentList.length) {
      return (
        <h1>No Students Found...</h1>
      )
    }

    return studentList.map((student, i) => (
      <Student key={i} data={student}/>
    ));
  }


  return (
    < >
      <div className="searchBar">
        <input
          id="search"
          type="search"
          placeholder="Search by name"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="list">
        {listStudents()}
      </div>
    </>
  )

}


ReactDom.render(<App />, document.getElementById('app'));