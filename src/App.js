import './App.css';
import EmployeeList from './DataDisplay';
import useFetch from "./useFetch";
import { useState } from 'react';


function App() {
  const { error, isPending, data: employees } = useFetch('https://raw.githubusercontent.com/dixitsoham7/dixitsoham7.github.io/main/index.json')
  const [data, setData] = useState(null);
  return (
    <div className="App">
      <head>
        <title>Employee Directory</title>
      </head>
      <body>
        <div class="container">
          <h1>Employee Directory</h1>
          <input type="text" id="searchInput" placeholder="Search by name"/>
          <select id="filterSelect">
            <option value="">Filter by designation/skills</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="QA Engineer">QA Engineer</option>
          </select>
        </div>
        </body>
        { error && <div>{ error }</div> }
        { isPending && <div>Loading...</div> }
        { employees && <EmployeeList employees={employees}/> }
      </div>
    
  );
}

export default App;
