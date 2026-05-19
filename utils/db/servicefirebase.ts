import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  addDoc,
  where,
  updateDoc,
} from "firebase/firestore";
import { db as firebaseDb } from "./firebase";
import bcrypt from "bcrypt";

const db = firebaseDb;

const retrieveProducts = async (collectionName: string) => {
  const productsCollection = collection(db, collectionName);
  const productSnapshot = await getDocs(productsCollection);
  const productList = productSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return productList;
};

const retrieveProductById = async (collectionName: string, id: string) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() };
};

export async function signIn(email: string) {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data.length > 0) {
    return data[0];
  } else {
    return null;
  }
}

export async function signUp(
  userData: {
    email: string;
    fullname: string;
    password: string;
    role?: string;
  },
  callback: Function,
) {
  const q = query(
    collection(db, "users"),
    where("email", "==", userData.email),
  );
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  // console.log("Query result:", data);

  if (data.length > 0) {
    // email sudah ada → tidak boleh daftar
    callback({
      status: "error",
      message: "User already exists",
    });
  } else {
    // email belum ada → hash password, set role, simpan ke DB
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.role = "member";
    await addDoc(collection(db, "users"), userData)
      .then(() => {
        callback({
          status: "success",
          message: "User registered successfully",
        });
      })
      .catch((error) => {
        callback({
          status: "error",
          message: error.message,
        });
      });
  }
}

// Tugas 4 – Refactor: helper reusable untuk semua OAuth provider
async function signInWithOAuthProvider(userData: any, callback: any, providerName: string) {
  try {
    const q = query(
      collection(db, "users"),
      where("email", "==", userData.email),
    );

    const querySnapshot = await getDocs(q);
    const data: any = querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));

    if (data.length > 0) {
      // User sudah ada, pertahankan role lama lalu update data
      userData.role = data[0].role;
      await updateDoc(doc(db, "users", data[0].id), userData);
      callback({
        status: true,
        message: `User logged in with ${providerName}`,
        data: userData,
      });
    } else {
      // User baru, set role default member
      userData.role = "member";
      await addDoc(collection(db, "users"), userData);
      callback({
        status: true,
        message: `User registered and logged in with ${providerName}`,
        data: userData,
      });
    }
  } catch (error: any) {
    callback({
      status: false,
      message: `Failed to register user with ${providerName}`,
    });
  }
}

export async function signInWithGoogle(userData: any, callback: any) {
  await signInWithOAuthProvider(userData, callback, "Google");
}

// Tugas 3 – Provider GitHub
export async function signInWithGithub(userData: any, callback: any) {
  await signInWithOAuthProvider(userData, callback, "GitHub");
}

export { retrieveProducts, retrieveProductById };
