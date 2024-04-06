function submitProject(e) {
  const getInputValue = id => document.getElementById(id).value;
  const name = getInputValue('projectName');
  const id = Math.floor(Math.random() * 100) + '';
  const status = 'Open';

  if ((name.length == 0)) {
    alert("Please fill all fields with required data.");
    document.getElementById('add-project').setAttribute("data-toggle", "modal");
    document.getElementById('add-project').setAttribute("data-target", "#emptyField")
  }
  else {
    document.getElementById('add-project').removeAttribute("data-toggle", "modal");
    document.getElementById('add-project').removeAttribute("data-target", "#emptyField")
    const project = { id, name, status };
    let projects = [];
    if (localStorage.getItem('projects')) {
      projects = JSON.parse(localStorage.getItem('projects'));
    }
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));


    fetchProjects();
  }
}

const closeProject = id => {
  const issues = JSON.parse(localStorage.getItem('projects'));
  const currentProject = projects.find(project => project.id == id);
  currentProject.status = 'Closed';
  currentProject.name = `<strike>${currentProject.name}</strike>`
  localStorage.setItem('projects', JSON.stringify(projects));
  fetchProjects();
}

const deleteProject = id => {
  const projects = JSON.parse(localStorage.getItem('projects'));
  const remainingIssues = projects.filter(project => ((project.id) != id))
  localStorage.removeItem('projects');
  localStorage.setItem('projects', JSON.stringify(remainingIssues));
  fetchProjects();
}
const fetchProjects = () => {

  const projects = JSON.parse(localStorage.getItem('projects'));
  const projectsList = document.getElementById('projectsList');
  projectsList.innerHTML = '';

  for (var i = 0; i < projects.length; i++) {
    const { id, name, status } = projects[i];

    projectsList.innerHTML += `<div class="well">
                              <h6>Project ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${name} </h3>
                              <button onclick="closeProject(${id})" class="btn btn-warning">Close</button>
                              <button onclick="deleteProject(${id})" class="btn btn-danger">Delete</button>
                              </div>`;
  }
}
fetchProjects();