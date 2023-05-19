const ProjectList = ({ employee}) => {
    employee.projects.map(project => console.log(project))
  return (
    <div className="project-list">
        <h1>PROJECTS</h1>
        <table>
            <tr>
                <th>Project Name and Description</th>
                <th>Team Members</th>
                <th>Roles</th>
            </tr>
            {employee.projects.map(project => (
                <tr>
                    <th><h2>{ project.name }</h2>
                    <p>{project.description}</p></th>
                    <th>{project.team.map(member => (
                        <h2>{member.name}</h2>
                    ))}</th>
                    <th>{project.team.map(role => (
                        <h2>{role.role}</h2>
                    ))}</th>
                </tr>
                ))}
        </table>
    </div>
  );
}
 
export default ProjectList;