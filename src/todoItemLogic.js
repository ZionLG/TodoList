import { todoItem } from "./todoItem.js";
import format from "date-fns/format";

const todoItemLogic = (() => {
  let _tasks = [];
  const createTask = (title, description, dueDate, priority, project) => {
    _tasks.push(todoItem(title, description, dueDate, priority, project));
  };
  const getDateFormat = (dateValue) => {
    const date = dateValue.split("-");
    if (date.length != 3 || Number(date.join("")) === "NaN") return "";
    if (date[0] == new Date().getFullYear()) {
      return format(new Date(date[0], date[1] - 1, date[2]), "dd MMM");
    } else {
      return format(new Date(date[0], date[1] - 1, date[2]), "dd MMM y");
    }
  };
  const getTasks = () => _tasks;
  const getTaskById = (id) => {
    for (const task of _tasks) {
      if (task.getId() == id) {
        return task;
      }
    }
  };

  const removeTaskById = (taskId) => {
    _tasks = _tasks.filter((task) => task.getId() != taskId);
  };

  const getProjectTasks = (projectId) =>
    _tasks.filter((task) => task.getProjectId() === projectId);
  return {
    createTask,
    getTasks,
    getProjectTasks,
    getDateFormat,
    getTaskById,
    removeTaskById,
  };
})();
export { todoItemLogic };
