import { projectItemLogic } from "./projectItemLogic";
import { todoItemLogic } from "./todoItemLogic";

const domLogic = (() => {
  const sidebar = document.getElementById("sidebar");
  const projectPage = document.getElementById("project");
  const addButton = document.getElementById("add");

  const addTask = document.getElementById("add-task");
  const exitAddTaskDialog = document.getElementById("cancel-task");
  const addTaskDialog = document.getElementById("add-dialog");
  const addTaskprojectSelect = document.getElementById("project-select");
  const addTaskprioritySelect = document.getElementById("priority-select");
  const addTaskDate = document.getElementById("add-task-date");

  const editDialog = document.getElementById("edit-dialog");
  const exitEditDialog = document.getElementById("edit-exit");
  const removeTask = document.getElementById("edit-remove");
  const editPriorityList = document.getElementById("priority-edit-list");
  const editPriority = document.getElementById("edit-priority");
  const editProject = document.getElementById("edit-project");
  const editTitle = document.getElementById("task-edit-title");
  const editDesc = document.getElementById("task-edit-desc");

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
      editTitle.dataset.taskId = task.getId();
      editDesc.dataset.taskId = task.getId();
      editPriority.dataset.taskId = task.getId();

      editProject.textContent = project.getName();
      editPriority.classList = node.firstElementChild.classList[0];

      editTitle.textContent = task.getTitle();

      editDesc.textContent = task.getDescription();

      if (task.getStatus() === 1) {
        editPriority.classList.add("complete");
        editTitle.style.textDecoration = "line-through";
        editDesc.style.textDecoration = "line-through";
      }

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
      priority.addEventListener("click", (e) => {
        task.toggleStatus();
        addProjectDOM(project.getId());
      });

      const title = document.createElement("div");
      const desc = document.createElement("div");
      if (task.getStatus() === 1) {
        priority.classList.add("complete");
        title.style.textDecoration = "line-through";
        desc.style.textDecoration = "line-through";
      }

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
    if (typeof addTaskDialog.showModal === "function") {
      addTaskDialog.showModal();
      addTaskprojectSelect.innerHTML = "";
      projectItemLogic.getProjects().forEach((project) => {
        if (project.getId() === "today") {
          return;
        }
        const option = document.createElement("option");
        option.textContent = project.getName();
        option.value = project.getId();

        addTaskprojectSelect.append(option);
      });
    }
  };

  const _addTaskFinal = (e) => {
    const title = document.getElementById("task-title").value;
    if (!title) return;
    todoItemLogic.createTask(
      title,
      document.getElementById("task-description").value,
      todoItemLogic.getDateFormat(addTaskDate.value),
      addTaskprioritySelect.options[addTaskprioritySelect.selectedIndex].value,
      addTaskprojectSelect.options[addTaskprojectSelect.selectedIndex].value
    );
    addProjectDOM(
      addTaskprojectSelect.options[addTaskprojectSelect.selectedIndex].value
    );
  };

  addButton.addEventListener("click", _addPostEvent);
  addTask.addEventListener("click", _addTaskFinal);
  addTaskDialog.addEventListener("close", () => {
    addTaskDialog.firstElementChild.reset();
  });

  exitAddTaskDialog.addEventListener("click", () => {
    addTaskDialog.close();
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

  editTitle.addEventListener("input", (e) => {
    const task = todoItemLogic.getTaskById(e.target.dataset.taskId);
    task.setTitle(e.target.textContent);
    addProjectDOM(task.getProjectId());
  });

  editDesc.addEventListener("input", (e) => {
    const task = todoItemLogic.getTaskById(e.target.dataset.taskId);
    task.setDescription(e.target.textContent);
    addProjectDOM(task.getProjectId());
  });

  editPriority.addEventListener("click", (e) => {
    const task = todoItemLogic.getTaskById(e.target.dataset.taskId);

    task.toggleStatus();
    console.log("\n" + task.getTitle() + " " + task.getStatus());
    if (task.getStatus() === 1) {
      editPriority.classList.add("complete");
      editTitle.style.textDecoration = "line-through";
      editDesc.style.textDecoration = "line-through";
    } else {
      editPriority.classList.remove("complete");
      editTitle.style.textDecoration = "none";
      editDesc.style.textDecoration = "none";
    }
    addProjectDOM(task.getProjectId());
  });
  return { addProjectDOM };
})();

export { domLogic };
