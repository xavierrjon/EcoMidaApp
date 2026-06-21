import { db, auth } from "@/firebase/config";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { Product, CreateProductDTO, ProductStatus } from "@/types/product";

class ProductsService {
  private getUserId(): string {
    const user = auth.currentUser;
    if (!user) throw new Error("Usuário não autenticado");
    return user.uid;
  }

  private mapDocToProduct(data: {
    id: string;
    name: string;
    category: string;
    quantity: number;
    unit: string;
    expirationDate: string;
    status: ProductStatus;
  }): Product {
    return {
      id: data.id,
      name: data.name,
      category: data.category,
      quantity: data.quantity,
      unit: data.unit,
      expirationDate: data.expirationDate,
      status: data.status,
    };
  }

  async getAll(): Promise<Product[]> {
    const userId = this.getUserId();
    const q = query(
      collection(db, "foods"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return this.mapDocToProduct({
        id: doc.id,
        name: data.name,
        category: data.category,
        quantity: data.quantity,
        unit: data.unit,
        expirationDate: data.expirationDate,
        status: data.status,
      });
    });
  }

  async create(productData: CreateProductDTO): Promise<Product> {
    const userId = this.getUserId();
    const docRef = await addDoc(collection(db, "foods"), {
      ...productData,
      userId,
      status: "ativo" as ProductStatus,
      createdAt: serverTimestamp(),
    });
    const docSnap = await getDoc(docRef);
    const data = docSnap.data()!;
    return this.mapDocToProduct({
      id: docRef.id,
      name: data.name,
      category: data.category,
      quantity: data.quantity,
      unit: data.unit,
      expirationDate: data.expirationDate,
      status: data.status,
    });
  }

  async update(
    id: string,
    data: Partial<Omit<Product, "id">>,
  ): Promise<Product | null> {
    const userId = this.getUserId();
    const docRef = doc(db, "foods", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error("Produto não encontrado");
    if (docSnap.data().userId !== userId) throw new Error("Acesso negado");
    await updateDoc(docRef, data);
    const updatedSnap = await getDoc(docRef);
    const updatedData = updatedSnap.data()!;
    return this.mapDocToProduct({
      id: docRef.id,
      name: updatedData.name,
      category: updatedData.category,
      quantity: updatedData.quantity,
      unit: updatedData.unit,
      expirationDate: updatedData.expirationDate,
      status: updatedData.status,
    });
  }

  async updateStatus(
    id: string,
    status: ProductStatus,
  ): Promise<Product | null> {
    return this.update(id, { status });
  }

  async delete(id: string): Promise<void> {
    const userId = this.getUserId();
    const docRef = doc(db, "foods", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error("Produto não encontrado");
    if (docSnap.data().userId !== userId) throw new Error("Acesso negado");
    await deleteDoc(docRef);
  }
}

export const productsService = new ProductsService();
