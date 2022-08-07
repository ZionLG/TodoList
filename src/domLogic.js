import { projectItemLogic } from "./projectItemLogic";
import { todoItemLogic } from "./todoItemLogic";

const domLogic = (() => {
  const sidebar = document.getElementById("sidebar");

  const addProjectDOM = () => {
    const projectList = projectItemLogic.getProjects();
    sidebar.innerHTML = "";
    for (let index = 0; index < projectList.length; index++) {
      const element = projectList[index];
      sidebar.append(_createProjectNode(element));
    }
  };

  const addTasksDOM = (projectName) => {
    const title = document.createElement("h3");
    const projectPage = document.getElementById("project");

    projectPage.innerHTML = "";

    title.textContent = projectName;

    projectPage.append(title);
  };

  const _createProjectNode = (project) => {
    const projectDiv = document.createElement("div");
    const projectNameDiv = document.createElement("div");
    const projectCountDiv = document.createElement("div");

    projectDiv.classList.add("project");
    projectCountDiv.classList.add("project-count");

    projectNameDiv.textContent = project.getName();
    projectCountDiv.textContent =
      todoItemLogic.getProjectTasks(project.getId()).length || "";

    projectDiv.append(projectNameDiv);
    projectDiv.append(projectCountDiv);

    return projectDiv;
  };

  return { addProjectDOM, addTasksDOM };
})();

export { domLogic };
