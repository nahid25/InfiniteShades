import { User } from "../models/User";

// Get user from local db
const getUser = () => {
  const id = localStorage.getItem("userId");
  const name = localStorage.getItem("userName");
  return {id, name}
}

// Set user to local db
export const setUser = (user: User) => {
  localStorage.setItem("userId", user.id);
  localStorage.setItem("userName", user.name);
}

//Check if Name and Id Exist.
export const hasNameAndId = () => {
  const {id, name} = getUser();
  return !!(id && name);
};

//Get name and id
export const getNameAndId = () => {
  const {id, name} = getUser();
  return {id: id || '', name: name || ''}
};