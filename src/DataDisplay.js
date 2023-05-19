const EmployeeList = ({ employees }) => {
    var count = 0;
  return (
    <div className="employee-list">
      {employees.employees.map(employee => (
        <div className="employee-preview" key={employee.id} >
            <h2>{ employee.name }</h2>
            <p>{ employee.designation }</p>
            <ul>
                {employee.skills.map(skill => (
                    <li>{skill}</li>
                ))} 
            </ul>
            <div className="project-list">
                <h1>PROJECTS</h1>
                <table>
                    <tr>
                        <th>Project Name and Description</th>
                        <th>Team Members</th>
                        <th>Roles</th>
                        <th>Completed Tasks</th>
                        <th>Team Size</th>
                    </tr>
                    {employee.projects !== null ? employee.projects.map(project => (
                        <tr>
                            <th><h2>{ project.name }</h2>
                            <p>{project.description}</p></th>
                            <th>{project.team.map(member => (
                                <h2>{member.name}</h2>
                            ))}</th>
                            <th>{project.team.map(role => (
                                <h2>{role.role}</h2>
                            ))}</th>
                            {project.tasks !== null ? project.tasks && project.tasks.map(task=> {
                                task.status == "Completed" ? count++ : count=count;
                            }) :"No Task"}
                            <th><p>{count}</p></th>
                            <th><h2>{project.team.length}</h2></th>
                        </tr>
                        )) : "No Project"}
                </table>
            </div>
        </div>
      ))}
    </div>
  );
}
 
export default EmployeeList;