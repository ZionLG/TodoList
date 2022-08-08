import uniqid from "uniqid";

const projectItem = (name, id) => {
  let _name = name;
  let _id = id ?? uniqid();
  const getName = () => _name;
  const setName = (newName) => (_name = newName);
  const getId = () => _id;

  return {
    getName,
    setName,
    getId,
  };
};

export { projectItem };
