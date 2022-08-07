import { projectItem } from "./projectItem.js";

const projectItemLogic = (() => {
  let _projects = [];
  const createProject = (projectName) => {
    const project = projectItem(projectName);
    _projects.push(project);
    return project;
  };
  const getProjects = () => _projects;
  return { createProject, getProjects };
})();

export { projectItemLogic };
