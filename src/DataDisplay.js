import { useState } from "react";

const EmployeeList = ({ employees, name}) => {
    var count = 0;
    var skillsChecked = [];

    const setChecked = (e) => {
        if(e.target.checked && !skillsChecked.includes(e.target.name)){
            skillsChecked.push(e.target.name);
        }else if (!e.target.checked && skillsChecked.includes(e.target.name)){
            for (var i = 0; i < skillsChecked.length; i++) {
                if (skillsChecked[i] === e.target.name) {
                    skillsChecked = skillsChecked.splice(i, 1);
                }
            }
        }
        console.log(skillsChecked);
    }

    const getSkillsList = (employees) => {
        const skillsList = [];
        employees.map(employee => {
            employee.skills.map(skill => {
                if (!skillsList.includes(skill) && skill !== 'undefined'){
                    skillsList.push(skill);
                }
            })
        })

        return skillsList;
    }

    const skillsList = getSkillsList(employees.employees);
    
    const getfilteredNameList = (employees, name) => {
      if (!name) {
        return [];
      }
      return employees.filter(function (employee) {
        if (employee.name !== null) {
          return employee.name.includes(name);
        }
      });
    };
  
    const getfilteredSkillList = (employees, skillList) => {
        console.log(skillList);
        if(!skillList){
            return employees;
        }
        return employees.filter(employee => {
            skillList.map(skill => {
                return employee.skills.includes(skill);
            })
        })
    }



    const filteredList = getfilteredNameList(employees.employees, name);
    console.log(skillsChecked)
    getfilteredSkillList(employees.employees, skillsChecked);
    const skillfilteredList = filteredList.filter(element => {getfilteredSkillList(employees.employees, skillsChecked).includes(element)})
    console.log(skillfilteredList);
  
    return (
      <div className="innerContainer">
        <div className="filter-preview">
            <div className="skills">
                <h2>Skills</h2>
                {skillsList.map(skill => (
                    <label>
                        <input type="checkbox" name={skill} value={skill} onChange={(e) => setChecked(e)}/>
                    {skill}
                    </label>
                ))}
            </div>
            <hr className="previewDivider"/>
            <div className="designations">
                <h2>Designations</h2>
            </div>
        </div>
        <hr className="previewDivider"/>
        <div className="employee-preview">
        {filteredList.map(employee => (
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
  