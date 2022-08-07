import { projectItemLogic } from "./projectItemLogic";
import { todoItemLogic } from "./todoItemLogic";

const domLogic = (() => {
  const sidebar = document.getElementById("sidebar");
  const projectPage = document.getElementById("project");

  const addProjectDOM = () => {
    const projectList = projectItemLogic.getProjects();
    sidebar.innerHTML = "";
    for (let index = 0; index < projectList.length; index++) {
      const element = projectList[index];
      sidebar.append(_createProjectNode(element));
    }
  };

  const _addTasksDOM = (project) => {
    const title = document.createElement("h3");

    projectPage.innerHTML = "";

    title.textContent = project.getName();

    projectPage.append(title);
  };

  const _createProjectNode = (project) => {
    const projectDiv = document.createElement("div");
    const projectNameDiv = document.createElement("div");
    const projectCountDiv = document.createElement("div");

    projectDiv.classList.add("project");
    projectCountDiv.classList.add("project-count");
    if (project.getId() === projectItemLogic.getProjects()[0].getId()) {
      projectDiv.classList.add("current");
      _addTasksDOM(project);
    }

    projectDiv.addEventListener("click", (e) => {
      _projectAddClickEvent(e, project);
    });

    projectNameDiv.textContent = project.getName();
    projectDiv.dataset.projectId = project.getId();
    projectCountDiv.textContent =
      todoItemLogic.getProjectTasks(project.getId()).length || "";

    projectDiv.append(projectNameDiv);
    projectDiv.append(projectCountDiv);

    return projectDiv;
  };
  const _projectAddClickEvent = (e, project) => {
    Array.from(sidebar.children).forEach((element) => {
      element.classList.remove("current");
    });

    e.target.classList.add("current");
    _addTasksDOM(project);
    console.log(e.target);
  };
  return { addProjectDOM };
})();

export { domLogic };
