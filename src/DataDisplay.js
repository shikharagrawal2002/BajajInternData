import { useEffect, useState } from "react";

const EmployeeList = ({ employees, name}) => {
    var count = 0;
    const [checkedSkills, setCheckedSkills] = useState({});
    const [checkedDesgs, setCheckedDesgs] = useState({});

    const getFilterList = (employees) => {
        var skillsList = [];
        var desgsList = [];
        employees.map(employee => {
            employee.skills.map(skill => {
                if (!skillsList.includes(skill) && skill !== 'undefined'){
                    skillsList.push(skill);
                }
            })
            if (!desgsList.includes(employee.designation) && employee.designation != null){
                desgsList.push(employee.designation);
            }
        })
        return {desgsList,skillsList}
    }

    const Checkbox = ({ type = 'checkbox', name, checked = false, onChange }) => {
        return (
          <input
            type={type}
            name={name}
            checked={checked}
            onChange={onChange}
            className="btn--position"
          />
        );
      };

    const {desgsList,skillsList} = getFilterList(employees.employees);
    console.log(desgsList,skillsList)

    const handleSkillChange = (event) => {
        setCheckedSkills({
          ...checkedSkills,
          [event.target.name]: event.target.checked,
        });
      };

    const handleDesgChange = (event) => {
        setCheckedDesgs({
          ...checkedDesgs,
          [event.target.name]: event.target.checked,
        });
      };

    const getfilteredNameList = (employees, name) => {
      if (!name) {
        return employees;
      }
      return employees.filter(function (employee) {
        if (employee.name !== null) {
          return employee.name.includes(name);
        }
      });
    };

    const getfilteredSkillList = (employees, checkedSkills) => {
        var itemsList = [];
        Object.keys(checkedSkills).map(item => {
            if (checkedSkills[item]){
                itemsList.push(item);
            }
        })
        console.log(itemsList);
        if(!itemsList){
            return employees;
        }
        return employees.filter(employee => itemsList.some(item => employee.skills.includes(item)))
    }

    const getfilteredDesgList = (employees, checkedDesgs) => {
        var itemsList = [];
        Object.keys(checkedDesgs).map(item => {
            if (checkedDesgs[item]){
                itemsList.push(item);
            }
        })
        console.log(itemsList);
        if(!itemsList){
            return employees;
        }
        return employees.filter(employee => itemsList.some(item => employee.designation == item))
    }

    const filtercheck = () => {
        var finalFilteredList = [];
        const filteredList = getfilteredNameList(employees.employees, name);
        const filteredSkillList = getfilteredSkillList(employees.employees, checkedSkills);        
        const filteredDesgList = getfilteredDesgList(employees.employees, checkedDesgs);        

        console.log(filteredSkillList.length === 0);
        console.log(filteredDesgList.length === 0);
        if (filteredSkillList.length === 0 && filteredDesgList.length === 0){
            finalFilteredList = filteredList;
        }else if (filteredSkillList.length === 0) {
            finalFilteredList = filteredList.filter(element => filteredDesgList.includes(element));
        }else if (filteredDesgList.length === 0){
            finalFilteredList = filteredList.filter(element => filteredSkillList.includes(element));
        }else {
            finalFilteredList = filteredList.filter(element => filteredSkillList.includes(element) && filteredDesgList.includes(element));   
        }
        return finalFilteredList;
    }

    const finalFilteredList = filtercheck();
    console.log(finalFilteredList);

    return (
      <div className="innerContainer">
        <div className="filter-preview">
            <div className="skills">
                <h2>Skills</h2>
                {skillsList.map(skill => (
                    <label>
                    {checkedSkills['']}
                    <Checkbox
                    name={skill}
                    checked={checkedSkills[skill]}
                    onChange={handleSkillChange}
                    />
                    {skill}
                    </label>
                ))}
            </div>
            <hr className="previewDivider"/>
            <div className="designations">
                <h2>Designations</h2>
                {desgsList.map(desg => (
                    <label>
                    {checkedDesgs['']}
                    <Checkbox
                    name={desg}
                    checked={checkedDesgs[desg]}
                    onChange={handleDesgChange}
                    />
                    {desg}
                    </label>
                ))}
            </div>
        </div>
        <hr className="previewDivider"/>
        <div className="employee-preview">
        {finalFilteredList.map(employee => (
        <div className="employee-list" key={employee.id} >
            <div className="employee-card">
                <h2>{ employee.name }</h2>
                <p>{ employee.designation }</p>
                <ul>
                    {employee.skills.map(skill => (
                        <li>{skill}</li>
                    ))} 
                </ul>
            </div>
            <hr className="verticalLine"/>
            <div className="project-list">
                {employee.projects !== null ? employee.projects.map(project => (
                    <div class="project-card">
                        <div className="projectContent">
                            <h2>{ project.name }</h2>
                            <p class="byLine">By:{project.team.map(member => (<p className="byLineMember"> | {member.name}     ({member.role}) | </p>))}</p>
                            <p>{project.description}</p>
                        </div>
                        {/* {project.tasks !== null ? project.tasks && project.tasks.map(task=> {
                            task.status == "Completed" ? count++ : count=count;
                        }) :"No Task"}
                        <th><p>{count}</p></th>
                        <th><h2>{project.team.length}</h2></th> */}
                    </div>
                    )) : "No Project"}
            </div>
        </div>
        ))}
        </div>
      </div>
    );
  };
  
  export default EmployeeList;
  