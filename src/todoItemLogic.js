import { todoItem } from "./todoItem.js";

const todoItemLogic = (() => {
  let _tasks = [];
  const createTask = (title, description, dueDate, priority, project) => {
    _tasks.push(todoItem(title, description, dueDate, priority, project));
  };
  const getTasks = () => _tasks;
  const getProjectTasks = (projectId) =>
    _tasks.filter((task) => task.getProjectId() === projectId);
  return { createTask, getTasks, getProjectTasks };
})();
export { todoItemLogic };
