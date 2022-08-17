import "./styles/main.scss";
import { todoItemLogic } from "./todoItemLogic.js";
import { projectItemLogic } from "./projectItemLogic.js";
import { domLogic } from "./domLogic";

function initTodo() {
  const InboxP = projectItemLogic.createProject("Inbox");
  projectItemLogic.createProject("Today", "today");
  const PersonalP = projectItemLogic.createProject("Personal");

  const todayDate = todoItemLogic.getTodayFormat();
  todoItemLogic.createTask(
    "Welcome to TodoIt",
    "Get to know how to use the app",
    todoItemLogic.getDateFormat(todayDate),
    "1",
    InboxP.getId()
  );
  todoItemLogic.createTask(
    "Make a task!",
    "Learn how to create your very own task",
    todoItemLogic.getDateFormat(todayDate),
    "2",
    InboxP.getId()
  );
  todoItemLogic.createTask(
    "Clean the room",
    "",
    todoItemLogic.getDateFormat(todayDate),
    "3",
    PersonalP.getId()
  );

  domLogic.addProjectDOM(InboxP.getId());
}

initTodo();
