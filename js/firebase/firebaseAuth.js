const auth = firebase.auth();
export const signup = async (email, password) => {
  let userCredential = await auth.createUserWithEmailAndPassword(
    email,
    password
  );
  return await userCredential.user;
};

export const signin = async (email, password) => {
  let userCredential = await auth.signInWithEmailAndPassword(email, password);
  return await userCredential.user;
};
