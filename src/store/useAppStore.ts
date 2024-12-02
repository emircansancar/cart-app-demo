import { create, StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";

import { ICartProducts, IProduct } from "@/types";
import { SortOptionsEnum } from "@/constants/main-constants";

export interface IStore {
  sortBy: SortOptionsEnum;
  products: IProduct[];
  filters: {
    searchText: string;
    brand: IProduct["brand"][];
    model: IProduct["model"][];
  };
  cart: {
    id: IProduct["id"];
    quantity: number;
  }[];
}

interface IActions {
  getBrands: () => IProduct["brand"][];
  getModels: () => IProduct["model"][];
  setSortBy: (newSortBy: SortOptionsEnum) => void;
  setFilters: (update: (filters: IStore["filters"]) => void) => void;
  getCartProducts: () => ICartProducts[];
  getTotalAmount: () => number;
  setProducts: (products: IProduct[]) => void;
  addToCart: (productId: IProduct["id"], quantity: number) => void;
  removeFromCart: (productId: IProduct["id"], quantity: number) => void;
}

const initializer: StateCreator<
  IStore & IActions,
  [["zustand/persist", unknown], ["zustand/immer", never]],
  [],
  IStore & IActions
> = (set, get) => ({
  sortBy: SortOptionsEnum.CREATED_AT_ASC,
  filters: { searchText: "", brand: [], model: [] },
  products: [],
  getBrands: () => {
    return Array.from(new Set(get().products.map((product) => product.brand)));
  },
  getModels: () => {
    return Array.from(new Set(get().products.map((product) => product.model)));
  },

  cart: [],
  // Function to get the detailed list of products in the cart (with product details)
  getCartProducts: () => {
    const state = get();

    return state.cart
      .map((cartItem) => {
        const product = state.products.find(
          (product) => product.id === cartItem.id,
        );

        if (product) {
          return { ...product, quantity: cartItem.quantity }; // Merge product info with quantity
        }

        return null; // If no product is found, return null (could also handle better, e.g., throw error)
      })
      .filter(Boolean) as ICartProducts[]; // Remove null entries if any product is missing
  },
  // Function to get the total amount of the cart (dynamically calculated)
  getTotalAmount: () => {
    const state = get();

    return state.cart.reduce((total, cartItem) => {
      const product = state.products.find(
        (product) => product.id === cartItem.id,
      );

      if (product) {
        total += product.price * cartItem.quantity;
      }

      return total;
    }, 0); // Calculate total amount dynamically based on cart items
  },

  setSortBy: (newSortBy: SortOptionsEnum) => {
    set((state) => {
      state.sortBy = newSortBy;
    });
  },
  setFilters: (update: (filters: IStore["filters"]) => void) => {
    set((state) => {
      update(state.filters);
    });
  },
  setProducts: (products: IProduct[]) => {
    set((state) => {
      state.products = products;
    });
  },
  addToCart: (productId: IProduct["id"], quantity: number = 1) => {
    set((state) => {
      const existingCartItem = state.cart.find((item) => item.id === productId);

      if (existingCartItem) {
        // If the product already exists in the cart, increase its quantity.
        existingCartItem.quantity += quantity;
      } else {
        // If the product is not in the cart, add it with the specified quantity.
        state.cart.push({ id: productId, quantity });
      }
    });
  },
  removeFromCart: (productId: IProduct["id"], quantity: number = 1) => {
    set((state) => {
      const existingCartItem = state.cart.find((item) => item.id === productId);

      if (!existingCartItem) return; // Do nothing if the product is not in the cart.

      if (quantity >= existingCartItem.quantity) {
        // Remove the product from the cart if the quantity to remove is equal to or greater than the current quantity.
        state.cart = state.cart.filter((item) => item.id !== productId);
      } else {
        // Otherwise, decrease the product quantity in the cart.
        existingCartItem.quantity -= quantity;
      }
    });
  },
});

export const useAppStore = create(
  devtools(
    persist(immer(initializer), {
      name: "app-store-storage",
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => ["cart"].includes(key)),
        ),
    }),
  ),
);
