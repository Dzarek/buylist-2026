import { useEffect, useRef, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  writeBatch,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product, ProductCategory } from "@/types";

export const useShoppingList = (userId: string | undefined) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [initialized, setInitialized] = useState(false);

  const initializedRef = useRef(false);

  const getUserProductsRef = (uid: string) =>
    collection(db, "users", uid, "products");

  useEffect(() => {
    if (!userId) {
      initializedRef.current = false;
      return;
    }

    initializedRef.current = false;

    const q = query(getUserProductsRef(userId), orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as Product,
        );

        setProducts(items);

        if (!initializedRef.current) {
          initializedRef.current = true;
          setInitialized(true);
        }
      },
      (error) => {
        console.error("Błąd pobierania produktów:", error);

        if (!initializedRef.current) {
          initializedRef.current = true;
          setInitialized(true);
        }
      },
    );

    return () => {
      unsubscribe();
      initializedRef.current = false;
      setInitialized(false);
    };
  }, [userId]);

  const addProduct = async (
    name: string,
    category: ProductCategory = "inne",
  ) => {
    if (!userId || !name.trim()) return;

    try {
      await addDoc(getUserProductsRef(userId), {
        name: name.trim().toLowerCase(),
        category,
        completed: false,
        createdAt: Date.now(),
      });
    } catch (error) {
      console.error("Błąd dodawania produktu:", error);
    }
  };

  const toggleProductStatus = async (id: string, currentStatus: boolean) => {
    if (!userId) return;

    try {
      await updateDoc(doc(db, "users", userId, "products", id), {
        completed: !currentStatus,
      });
    } catch (error) {
      console.error("Błąd aktualizacji statusu:", error);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!userId) return;

    try {
      await deleteDoc(doc(db, "users", userId, "products", id));
    } catch (error) {
      console.error("Błąd usuwania produktu:", error);
    }
  };

  const clearList = async () => {
    if (!userId) return;

    try {
      const snapshot = await getDocs(getUserProductsRef(userId));
      const batch = writeBatch(db);

      snapshot.forEach((doc) => batch.delete(doc.ref));

      await batch.commit();
    } catch (error) {
      console.error("Błąd czyszczenia listy:", error);
    }
  };

  return {
    products: userId ? products : [],
    loading: !!userId && !initialized,
    addProduct,
    toggleProductStatus,
    deleteProduct,
    clearList,
  };
};
