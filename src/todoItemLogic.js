import { todoItem } from "./todoItem.js";
import format from "date-fns/format";
import isToday from "date-fns/isToday";
import isBefore from "date-fns/isBefore";

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
  const getDateFromTask = (task) => {
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
  const getTasks = () => _tasks;
  const getTaskById = (id) => {
    for (const task of _tasks) {
      if (task.getId() == id) {
        return task;
      }
    }
  };
  const getTodayFormat = () => {
    const today = new Date();
    let todayDate = today.getFullYear() + "-";
    if (today.getMonth() + 1 < 10) {
      todayDate += "0" + (today.getMonth() + 1);
    } else {
      todayDate += today.getMonth() + 1;
    }
    todayDate += "-";
    if (today.getDate() < 10) {
      todayDate += "0" + today.getDate();
    } else {
      todayDate += today.getDate();
    }

    return todayDate;
  };

  const getTodayAndOverdueTasks = () => {
    let _today = [];
    let _overdue = [];
    const todayDateFormat = getTodayFormat();
    for (const task of _tasks) {
      const formatDateTask = getDateFromTask(task);
      const taskDate = new Date(
        Number(formatDateTask.slice(0, 4)),
        Number(formatDateTask.slice(5, 7)) - 1,
        Number(formatDateTask.slice(8, 10))
      );
      const todayDate = new Date(
        Number(todayDateFormat.slice(0, 4)),
        Number(todayDateFormat.slice(5, 7)) - 1,
        Number(todayDateFormat.slice(8, 10))
      );
      if (isToday(taskDate)) {
        _today.push(task);
      } else if (isBefore(taskDate, todayDate)) {
        _overdue.push(task);
      }
    }
    return [_today, _overdue];
  };
  const removeTaskById = (taskId) => {
    _tasks = _tasks.filter((task) => task.getId() != taskId);
  };
  const removeTaskByProject = (projectId) => {
    _tasks = _tasks.filter((task) => task.getProjectId() != projectId);
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
    getTodayAndOverdueTasks,
    getDateFromTask,
    getTodayFormat,
    removeTaskByProject,
  };
})();
export { todoItemLogic };
