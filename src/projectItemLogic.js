import { projectItem } from "./projectItem.js";

const projectItemLogic = (() => {
  let _projects = [];
  const createProject = (projectName, projectId) => {
    const project = projectItem(projectName, projectId);
    _projects.push(project);

    return project;
  };
  const getProjects = () => _projects;
  return { createProject, getProjects };
})();

export { projectItemLogic };
