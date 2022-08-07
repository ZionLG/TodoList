import uniqid from "uniqid";

const projectItem = (name) => {
  let _name = name;
  let _id = uniqid();
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
