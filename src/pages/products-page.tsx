import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Divider,
  Button,
  Pagination,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { useAppStore } from "@/store/useAppStore";
import Summary from "@/components/summary";
import SortAndFilters from "@/components/sort-and-filters";
import { SortOptionsEnum } from "@/constants/main-constants";

export default function ProductsPage() {
  const navigate = useNavigate();
  const { products, filters, sortBy, addToCart } = useAppStore();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Step 1: Filtering and Step 2: Sorting combined into one useMemo hook
  const filteredAndSortedProducts = useMemo(() => {
    // Step 1: Filtering
    let filtered = products;

    // SearchText filtering
    if (filters.searchText.length > 0) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(filters.searchText.toLowerCase()),
      );
    }

    // Brand filtering
    if (filters.brand.length > 0) {
      filtered = filtered.filter((product) =>
        filters.brand.includes(product.brand),
      );
    }

    // Model filtering
    if (filters.model.length > 0) {
      filtered = filtered.filter((product) =>
        filters.model.includes(product.model),
      );
    }

    // Step 2: Sorting
    let sorted = [...filtered]; // Copying the filtered products to apply sorting

    switch (sortBy) {
      case SortOptionsEnum.CREATED_AT_ASC:
        sorted.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        break;
      case SortOptionsEnum.CREATED_AT_DESC:
        sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case SortOptionsEnum.PRICE_ASC:
        sorted.sort((a, b) => a.price - b.price);
        break;
      case SortOptionsEnum.PRICE_DESC:
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return sorted;
  }, [products, filters, sortBy]); // Recalculate when 'products', 'filters', or 'sortBy' change.

  const productsPerPage = 12;
  const currentProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  );
  const shouldShowPagination =
    filteredAndSortedProducts.length > productsPerPage;

  return (
    <section className="grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-8 lg:row-start-1">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {currentProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                transition={{
                  type: "spring",
                  damping: 30,
                  stiffness: 160,
                }}
              >
                <Card
                  isHoverable={true}
                  isPressable={true}
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  <CardHeader className="pb-0">
                    <Image
                      isZoomed
                      alt={`Image: ${product.name}}`}
                      className="w-100"
                      loading="lazy"
                      radius="sm"
                      src={product.image}
                    />
                  </CardHeader>

                  <CardBody>
                    <div className="flex flex-col">
                      <p className="text-md font-bold">
                        {product.price.toFixed(2)} ₺
                      </p>
                      <p className="text-small font-semibold text-default-500">
                        {product.name}
                      </p>
                    </div>
                  </CardBody>

                  <Divider />

                  <CardFooter>
                    <Button
                      fullWidth
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product.id, 1);
                      }}
                    >
                      Add to card
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {shouldShowPagination && (
          <Pagination
            showControls
            className="flex justify-center mt-8 mb-18"
            initialPage={1}
            total={Math.ceil(
              filteredAndSortedProducts.length / productsPerPage,
            )}
            onChange={handlePageChange}
          />
        )}
      </div>

      <div className="col-span-6 lg:col-span-2 lg:row-start-1 lg:col-start-1 flex flex-col gap-4">
        <SortAndFilters />
      </div>

      <div className="col-span-6 lg:col-span-2 lg:row-start-1 flex flex-col gap-4">
        <Summary />
      </div>
    </section>
  );
}
