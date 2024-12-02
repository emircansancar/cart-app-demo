import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { Navbar } from "@/components/navbar";
import { mainConstants } from "@/constants/main-constants";
import { useAppStore } from "@/store/useAppStore";
import { IProduct } from "@/types";

export default function DefaultLayout() {
  const navigate = useNavigate();

  const { setProducts } = useAppStore();

  const fetchProducts = async () => {
    try {
      const response = await fetch(mainConstants.API_ENDPOINT_PRODUCTS);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      setProducts(
        data.map((product: IProduct) => ({
          ...product,
          id: Number(product.id),
          price: Number(product.price),
        })),
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error fetching products:", error);
      navigate("/error");
      throw error;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container flex-grow mx-auto max-w-8xl px-6 py-16 md:py-10 pt-16">
        <Outlet />
      </main>
    </div>
  );
}
