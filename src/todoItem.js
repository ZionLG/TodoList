import uniqid from "uniqid";

const todoItem = (title, description, dueDate, priority, projectId) => {
  let _title = title;
  let _description = description;
  let _dueDate = dueDate;
  let _priority = priority;
  let _projectId = projectId;
  let _status = 0;
  let _id = uniqid();

  const getTitle = () => _title;
  const setTitle = (newTitle) => (_title = newTitle);
  const getDescription = () => _description;
  const setDescription = (newDescription) => (_description = newDescription);
  const getDueDate = () => _dueDate;
  const setDueDate = (newDueDate) => (_dueDate = newDueDate);
  const getPriority = () => _priority;
  const setPriority = (newPriority) => (_priority = newPriority);
  const getProjectId = () => _projectId;
  const setProjectId = (newProjectId) => (_projectId = newProjectId);
  const getId = () => _id;
  const getStatus = () => _status;
  const setComplete = () => (_status = 1);
  const setUncomplete = () => (_status = 0);
  const toggleStatus = () => (_status ? (_status = 0) : (_status = 1));

  return {
    getTitle,
    setTitle,
    getDescription,
    setDescription,
    getDueDate,
    setDueDate,
    getPriority,
    setPriority,
    getProjectId,
    setProjectId,
    getId,
    getStatus,
    setComplete,
    setUncomplete,
    toggleStatus,
  };
};

export { todoItem };
