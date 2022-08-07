const todoItem = (title, description, dueDate, priority, projectId) => {
  let _title = title;
  let _description = description;
  let _dueDate = dueDate;
  let _priority = priority;
  let _projectId = projectId;

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
  };
};

export { todoItem };
