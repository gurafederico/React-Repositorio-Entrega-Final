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

/* funciones a utilizar */
/* que sea de uso global y no definida cada vez */
/* creamos la referencia a la coleccion: que se en mi caso son los productos cascos con el nobre de la coleccion */

const productsRef = collection(db, "products");

export const getProducts = async () => {
    try {
        const snapshot = await getDocs(productsRef);

        const productsFormat = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        });

        return productsFormat;

    } catch (err) {
        console.error("Error al obtener productos:", err);
        return []; // devuelvo un array vacio en caso de error 
    }
};

/* traer el producto por id  */

// Funcion que SOLO pide un dato
export const getProductById = async (id) => {
  try {
    // Creamos la referencia al documento
    const productRef = doc(db, "products", id);

    // Traemos el documento:
    const snapshot = await getDoc(productRef);

    // Verificamos si existe
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


/* filtro por category */                      

export const getByCategory = async (category) => {
  try {
    let queryRef;

    if (category) {
      queryRef = query(productsRef, where("category", "==", category));
    } else {
      queryRef = productsRef;
    }

    // Traer los documentos:
    const snapshot = await getDocs(queryRef);
    //Mapeo de datos para formateo
    const productsFormat = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return productsFormat;
  } catch (error) {
    console.error("Error al filtrar productos:", error);
    return [];
  }
};