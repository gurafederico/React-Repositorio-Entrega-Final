import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase/config";

// referencia global a la coleccion "products"
const productsRef = collection(db, "products");


export const checkIfProductExists = async (name, currentId = null) => {
  try {
    const cleanedName = name.trim().toLowerCase();
    const snapshot = await getDocs(productsRef);

    const duplicateDoc = snapshot.docs.find(doc => {
      const data = doc.data();
      return data.name && data.name.trim().toLowerCase() === cleanedName;
    });

    if (!duplicateDoc) {
      return false;
    }

    if (currentId && duplicateDoc.id === currentId) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error al validar duplicado:", error);
    return false;
  }
};


/* traer el producto con o sin categoria                      */

export const getProducts = async (category = null) => {
  try {
    let q;

    if (category) {
      q = query(productsRef, where("category", "==", category));
    } else {
      q = productsRef;
    }

    const snapshot = await getDocs(q);

    const productsFormat = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    return productsFormat;
  } catch (error) {
    console.error("Error al traer productos:", error);
    return [];
  }
};


/* producto por id                                               */

export const getProductById = async (id) => {
  try {
    const productRef = doc(db, "products", id);
    const snapshot = await getDoc(productRef);

    if (snapshot.exists()) {
      const product = { id: snapshot.id, ...snapshot.data() };
      console.log("Doc:", product);
      return product;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al traer producto por ID:", error);
    return null;
  }
};


/* alta de producto  y chequeo de duplicados     */

export const createProduct = async (productData) => {
  try {
    const isDuplicated = await checkIfProductExists(productData.name);
    if (isDuplicated) {
      throw new Error("El producto ya existe en la base de datos.");
    }

    const docRef = await addDoc(productsRef, productData);
    return docRef.id;
  } catch (error) {
    console.error("Error al crear producto:", error);
    throw error;
  }
};


/* categorias de firestore,si existen  */

export const getCategories = async () => {
  try {
    const snapshot = await getDocs(productsRef);

    // mapeo para extraer solo el string del campo category de cada producto
    const allCategories = snapshot.docs.map(doc => doc.data().category);

    // elimina los duplicados usando un set
    const uniqueCategories = [...new Set(allCategories)];

    return uniqueCategories;
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    return [];
  }
};