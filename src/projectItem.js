const projectItem = (name) => {
  let _name = name;

  const getName = () => _name;
  const setName = (newName) => (_name = newName);

  return {
    getName,
    setName,
  };
};
