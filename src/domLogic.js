import { projectItemLogic } from "./projectItemLogic";
import { todoItemLogic } from "./todoItemLogic";

const domLogic = (() => {
  const sidebar = document.getElementById("sidebar");
  const projectPage = document.getElementById("project");
  const addButton = document.getElementById("add");
  const addTask = document.getElementById("add-task");
  const exitAddDialog = document.getElementById("cancel-task");
  const addDialog = document.getElementById("add-dialog");
  const projectSelect = document.getElementById("project-select");
  const editDialog = document.getElementById("edit-dialog");
  const exitEditDialog = document.getElementById("edit-exit");
  const removeTask = document.getElementById("edit-remove");
  const editPriorityList = document.getElementById("priority-edit-list");
  const editPriority = document.getElementById("edit-priority");
  const editProject = document.getElementById("edit-project");
  const innerContainer = document.getElementById("inner-container");
  const editProjectList = document.getElementById("project-edit-list");
  const editDueTime = document.getElementById("due-time-edit");

  const _editTaskEvent = (e, project) => {
    if (
      typeof editDialog.showModal === "function" &&
      !e.target.classList.contains("priority-1") &&
      !e.target.classList.contains("priority-2") &&
      !e.target.classList.contains("priority-3") &&
      !e.target.classList.contains("priority-4")
    ) {
      editDialog.showModal();
      let node = e.target;
      while (!node.hasAttribute("data-task-id")) {
        node = node.parentElement;
      }

      const task = todoItemLogic.getTaskById(String(node.dataset.taskId));

      removeTask.dataset.taskId = task.getId();

      editProject.textContent = project.getName();
      editPriority.classList = node.firstElementChild.classList[0];
      innerContainer.innerHTML = "";

      const title = document.createElement("div");
      title.classList.add("task-edit-title");
      title.setAttribute("contenteditable", true);
      title.addEventListener("input", (e) => {
        task.setTitle(e.target.textContent);
        addProjectDOM(task.getProjectId());
      });

      const desc = document.createElement("div");
      desc.classList.add("task-edit-desc");
      desc.setAttribute("contenteditable", true);
      desc.addEventListener("input", (e) => {
        task.setDescription(e.target.textContent);
        addProjectDOM(task.getProjectId());
      });

      title.textContent = task.getTitle();

      desc.textContent = task.getDescription();

      innerContainer.append(title);
      innerContainer.append(desc);

      editProjectList.innerHTML = "";
      projectItemLogic.getProjects().forEach((sProject) => {
        if (sProject.getId() === "today") {
          return;
        }
        const option = document.createElement("option");
        option.textContent = sProject.getName();
        option.value = sProject.getId();

        if (sProject.getId() === project.getId()) {
          option.setAttribute("selected", true);
        }

        editProjectList.append(option);
      });
      editProjectList.dataset.taskId = task.getId();

      Array.from(editPriorityList).forEach((priority) => {
        priority.removeAttribute("selected");
        if (priority.value === task.getPriority()) {
          priority.setAttribute("selected", true);
        }
      });
      editPriorityList.dataset.taskId = task.getId();

      const date = _getDateFromTask(task);
      editDueTime.setAttribute("value", date);
      editDueTime.dataset.taskId = task.getId();
    }
  };

  const _getDateFromTask = (task) => {
    let dateString = task.getDueDate();
    let newDate = "";
    let yearDate = "";
    if (dateString.length < 7) {
      newDate = new Date().getFullYear() + "-";
    } else {
      yearDate = dateString.slice(7, 11);
    }

    let dateMonth = dateString.slice(3, 6);
    if (yearDate) {
      newDate += yearDate + "-";
    }
    newDate += dateMonth + "-" + dateString.slice(0, 2);
    let numMonth = String(new Date(Date.parse(newDate)).getMonth() + 1);
    if (numMonth.length === 1) {
      numMonth = "0" + numMonth;
    }
    newDate = newDate.replace(dateMonth, numMonth);

    return newDate;
  };

  const addProjectDOM = (projectIdCurrent) => {
    const projectList = projectItemLogic.getProjects();
    sidebar.innerHTML = "";
    for (let index = 0; index < projectList.length; index++) {
      const element = projectList[index];
      sidebar.append(_createProjectNode(element, projectIdCurrent));
    }
  };

  const _addTasksDOM = (project) => {
    const title = document.createElement("h3");

    projectPage.innerHTML = "";

    title.textContent = project.getName();

    projectPage.append(title);

    const projectTasks = todoItemLogic.getProjectTasks(project.getId());

    projectTasks.forEach((task) => {
      const container = document.createElement("div");
      container.classList.add("task");
      container.addEventListener("click", (e) => _editTaskEvent(e, project));

      const detail = document.createElement("div");
      detail.classList.add("task-detail");

      const priority = document.createElement("div");
      priority.classList.add("priority-" + task.getPriority());

      const title = document.createElement("div");
      const desc = document.createElement("div");
      desc.classList.add("task-desc");

      container.dataset.taskId = task.getId();

      title.textContent = task.getTitle();

      desc.textContent = task.getDescription();

      detail.append(title);
      detail.append(desc);

      container.append(priority);

      container.append(detail);

      if (task.getDueDate()) {
        const date = document.createElement("div");
        date.textContent = task.getDueDate();
        date.classList.add("task-date");

        container.append(date);
      }

      projectPage.append(container);
      projectPage.append(document.createElement("hr"));
    });
  };

  const _createProjectNode = (project, projectIdCurrent) => {
    const projectDiv = document.createElement("div");
    const projectNameDiv = document.createElement("div");
    const projectCountDiv = document.createElement("div");

    projectDiv.classList.add("project");
    projectCountDiv.classList.add("project-count");
    if (project.getId() === projectIdCurrent) {
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

  const _addPostEvent = (e) => {
    if (typeof addDialog.showModal === "function") {
      addDialog.showModal();
      projectSelect.innerHTML = "";
      projectItemLogic.getProjects().forEach((project) => {
        if (project.getId() === "today") {
          return;
        }
        const option = document.createElement("option");
        option.textContent = project.getName();
        option.value = project.getId();

        projectSelect.append(option);
      });
    }
  };

  const _addTaskFinal = (e) => {
    const prioritySelect = document.getElementById("priority-select");
    const title = document.getElementById("task-title").value;
    if (!title) return;
    todoItemLogic.createTask(
      title,
      document.getElementById("task-description").value,
      todoItemLogic.getDateFormat(
        document.getElementById("add-task-date").value
      ),
      prioritySelect.options[prioritySelect.selectedIndex].value,
      projectSelect.options[projectSelect.selectedIndex].value
    );
    addProjectDOM(projectSelect.options[projectSelect.selectedIndex].value);
  };

  addButton.addEventListener("click", _addPostEvent);
  addTask.addEventListener("click", _addTaskFinal);
  addDialog.addEventListener("close", () => {
    addDialog.firstElementChild.reset();
  });
  exitAddDialog.addEventListener("click", () => {
    addDialog.close();
  });

  exitEditDialog.addEventListener("click", () => {
    editDialog.close();
  });

  removeTask.addEventListener("click", (e) => {
    const taskId = e.target.dataset.taskId;
    const taskProject = todoItemLogic.getTaskById(taskId).getProjectId();
    todoItemLogic.removeTaskById(taskId);
    editDialog.close();
    addProjectDOM(taskProject);
  });

  editProjectList.addEventListener("change", (e) => {
    let task = todoItemLogic.getTaskById(e.target.dataset.taskId);

    let projectId = e.target.options[e.target.selectedIndex].value;
    todoItemLogic.getTaskById(task.getId()).setProjectId(projectId);
    editProject.textContent = projectItemLogic
      .getProjectById(projectId)
      .getName();
    addProjectDOM(task.getProjectId());
  });

  editDueTime.addEventListener("change", (e) => {
    let task = todoItemLogic.getTaskById(e.target.dataset.taskId);

    let dueTime = todoItemLogic.getDateFormat(e.target.value);
    todoItemLogic.getTaskById(task.getId()).setDueDate(dueTime);
    addProjectDOM(task.getProjectId());
  });

  editPriorityList.addEventListener("change", (e) => {
    let task = todoItemLogic.getTaskById(e.target.dataset.taskId);
    task.setPriority(e.target.options[e.target.selectedIndex].value);
    addProjectDOM(task.getProjectId());
    editPriority.removeAttribute("class");
    editPriority.classList.add("priority-" + task.getPriority());
  });
  return { addProjectDOM };
})();

export { domLogic };
