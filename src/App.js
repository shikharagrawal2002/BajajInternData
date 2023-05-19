import './App.css';
import EmployeeList from './DataDisplay';
import useFetch from "./useFetch";
import { useState } from 'react';


function App() {
  const { error, isPending, data: employees } = useFetch('https://raw.githubusercontent.com/dixitsoham7/dixitsoham7.github.io/main/index.json')
  const [name,setName] = useState("");
  return (
    <div className="App">
      <head>
        <title>Employee Directory</title>
      </head>
      <body>
        <div class="container">
          <h1>Employee Directory</h1>
          <input type="text" id="searchInput" placeholder="Search by name" onChange={(e) => setName(e.target.value)}/>
        </div>
        <hr className="headerDivider"/>
        </body>
        { error && <div>{ error }</div> }
        { isPending && <div>Loading...</div> }
        { employees && <EmployeeList employees={employees} name = {name}/> }
      </div>
    
  );
}

export default App;
