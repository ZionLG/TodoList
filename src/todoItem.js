const todoItem = (title, description, dueDate, priority, project) => {
  let _title = title;
  let _description = description;
  let _dueDate = dueDate;
  let _priority = priority;
  let _project = project;

  const getTitle = () => _title;
  const setTitle = (newTitle) => (_title = newTitle);
  const getDescription = () => _description;
  const setDescription = (newDescription) => (_description = newDescription);
  const getDueDate = () => _dueDate;
  const setDueDate = (newDueDate) => (_dueDate = newDueDate);
  const getPriority = () => _priority;
  const setPriority = (newPriority) => (_priority = newPriority);
  const getProject = () => _project;
  const setProject = (newProject) => (_project = newProject);

  return {
    getTitle,
    setTitle,
    getDescription,
    setDescription,
    getDueDate,
    setDueDate,
    getPriority,
    setPriority,
    getProject,
    setProject,
  };
};
