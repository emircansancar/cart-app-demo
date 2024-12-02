import { Route, Routes } from "react-router-dom";

import DefaultLayout from "@/layouts/default";
import ProductsPage from "@/pages/products-page";
import ProductDetailPage from "@/pages/product-detail-page";

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<ProductsPage />} />
        <Route element={<ProductsPage />} path="products" />
        <Route element={<ProductDetailPage />} path="products/:productId" />
      </Route>
    </Routes>
  );
}

export default App;
