const db = firebase.firestore();
export const createUserData = (uid, data) => {
  db.collection("users")
    .doc(uid)
    .set({ ...data })
    .then(() => {
      console.log("Document written with ID: ");
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

export const getUserData = async (uid) => {
  let docRef = db.collection("users").doc(uid);
  let docData = await docRef.get();
  return await docData.data();
};

export const updateUserData = async (uid, data = {}) => {
  let docRef = db.collection("users").doc(uid);
  await docRef.set(data, { merge: true });
};

export const getUserDiary = async (uid) => {
  let docRef = db.collection("diary").doc(uid);
  let docData = await docRef.get();
  return await docData.data();
};

export const setDiaryData = async (uid, date, data, callback) => {
  db.collection("diary")
    .doc(uid)
    .set({ [date]: data }, { merge: true })
    .then(() => {
      console.log("Document written with ID: ");
      if (typeof callback === "function") {
        callback();
      }
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};
