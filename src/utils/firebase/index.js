import { auth } from "./config";

export const createUser = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

export const loginUser = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const signOut = () => auth.signOut();
export const isLogged = callback => auth.onAuthStateChanged(callback);
