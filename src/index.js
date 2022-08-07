import "./styles/main.scss";
import { todoItemLogic } from "./todoItemLogic.js";
import { projectItemLogic } from "./projectItemLogic.js";
import { domLogic } from "./domLogic";
function initTodo() {
  const InboxP = projectItemLogic.createProject("Inbox");
  todoItemLogic.createTask(
    "Welcome to TodoIt",
    "Get to know how to use the app",
    "2023",
    "1",
    InboxP.getId()
  );
  todoItemLogic.createTask(
    "Make a task!",
    "Learn how to create your very own task",
    "2023",
    "1",
    InboxP.getId()
  );

  domLogic.addProjectDOM();
  domLogic.addTasksDOM("Inbox");
}

initTodo();
