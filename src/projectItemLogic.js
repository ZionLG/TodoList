import { projectItem } from "./projectItem.js";

const projectItemLogic = (() => {
  let _projects = [];
  const createProject = (projectName, projectId) => {
    const project = projectItem(projectName, projectId);
    _projects.push(project);

    return project;
  };

  const getProjectById = (id) => {
    for (const project of _projects) {
      if (project.getId() == id) {
        return project;
      }
    }
  };
  const removeProjectById = (projectId) => {
    _projects = _projects.filter((project) => project.getId() != projectId);
  };
  const getProjects = () => _projects;
  return { createProject, getProjects, getProjectById, removeProjectById };
})();

export { projectItemLogic };
