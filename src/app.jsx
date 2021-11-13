import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import './styles.css';

const url = 'https://api.hatchways.io/assessment/students';

const App = () => {
  return (
    < >
      <h1>Hello World</h1>
    </>
  )

}


ReactDom.render(<App />, document.getElementById('app'));