import {
  Card,
  CardBody,
  Image,
  Button,
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAppStore } from "@/store/useAppStore";
import Summary from "@/components/summary";

export default function ProductDetailPage() {
  let { productId } = useParams();
  const navigate = useNavigate();

  const { products, addToCart } = useAppStore();

  const product = products.find((product) => product.id === Number(productId));

  useEffect(() => {
    if (!product) {
      navigate("/products");
    }
  }, []);

  return (
    <div>
      <Breadcrumbs className="mb-6">
        <BreadcrumbItem onClick={() => navigate("/products")}>
          Products
        </BreadcrumbItem>
        <BreadcrumbItem>{productId}</BreadcrumbItem>
      </Breadcrumbs>

      <section className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-10">
          {product && (
            <Card isHoverable={true}>
              <CardBody className="grid lg:grid-cols-2 gap-8">
                <Image
                  isZoomed
                  alt={`Image: ${product?.name}}`}
                  className="w-100 h-100"
                  loading="lazy"
                  radius="sm"
                  src={product?.image}
                />

                <div className="flex flex-col justify-between gap-6">
                  <div className="flex flex-col gap-4">
                    <p className="text-xl font-semibold">{product?.name}</p>
                    <p className="text-xl font-semibold text-default-500">
                      {product?.price.toFixed(2)} ₺
                    </p>
                  </div>

                  <Button
                    fullWidth
                    color="primary"
                    onClick={() => addToCart(product.id, 1)}
                  >
                    Add to card
                  </Button>

                  <div>{product?.description}</div>
                </div>
              </CardBody>
            </Card>
          )}
        </div>

        <div className="col-span-12 lg:col-span-2 flex flex-col gap-4">
          <Summary />
        </div>
      </section>
    </div>
  );
}
