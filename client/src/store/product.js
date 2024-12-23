import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (product) => {
    try {
      if (!product.name || !product.price || !product.image) {
        return { success: false, message: "Please provide all fields" };
      }
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      console.error(error);
    }
  },
  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      set({ products: data.data });
    } catch (error) {
      console.error(error);
    }
  },
  updateProduct: async (id, product) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      if (data.success) {
        set((state) => ({
          products: state.products.map((product) =>
            product._id === id ? data.data : product
          ),
        }));
      }
      return { success: data.success, message: data.message };
    } catch (error) {
      console.error(error);
    }
  },
  deleteProduct: async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);

      if (data.success) {
        set((state) => ({
          products: state.products.filter((product) => product._id !== id),
        }));
      }
      return { success: data.success, message: data.message };
    } catch (error) {
      console.error(error);
    }
  },
}));
