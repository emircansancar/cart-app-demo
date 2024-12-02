import { Button, Card, CardBody, Divider } from "@nextui-org/react";
import React, { useMemo } from "react";

import { useAppStore } from "@/store/useAppStore";

function Summary() {
  const {
    products,
    cart,
    getCartProducts,
    getTotalAmount,
    addToCart,
    removeFromCart,
  } = useAppStore();

  const cartProducts = useMemo(() => getCartProducts(), [products, cart]);
  const totalAmount = useMemo(() => getTotalAmount(), [products, cart]);

  return (
    <>
      {cartProducts.length > 0 && (
        <Card>
          <CardBody>
            {cartProducts.map((cartProduct, i) => (
              <React.Fragment key={cartProduct.id}>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <p className="text-sm leading-none">{cartProduct.name}</p>
                    <p className="text-sm leading-none text-default-600">
                      {cartProduct.price.toFixed(2)} ₺
                    </p>
                  </div>

                  <div className="flex shrink-0">
                    <div className="relative flex items-center max-w-[5.25rem]">
                      <button
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                        id="decrement-button"
                        type="button"
                        onClick={() => removeFromCart(cartProduct.id, 1)}
                      >
                        <svg
                          aria-hidden="true"
                          className="w-3 h-3 text-gray-900 dark:text-white"
                          fill="none"
                          viewBox="0 0 18 2"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1h16"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                        </svg>
                      </button>
                      <input
                        disabled
                        aria-describedby="helper-text-explanation"
                        className="bg-gray-50 border-x-0 border-gray-300 h-8 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        value={cartProduct.quantity}
                      />
                      <button
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                        id="increment-button"
                        type="button"
                        onClick={() => addToCart(cartProduct.id, 1)}
                      >
                        <svg
                          aria-hidden="true"
                          className="w-3 h-3 text-gray-900 dark:text-white"
                          fill="none"
                          viewBox="0 0 18 18"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 1v16M1 9h16"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                {i !== getCartProducts().length - 1 && (
                  <Divider className="my-4" />
                )}
              </React.Fragment>
            ))}
          </CardBody>
          <Divider />
        </Card>
      )}

      <Card>
        <CardBody>
          <div className="flex flex-col gap-4">
            <p className="text-md">
              <span className="">Total Price:</span>{" "}
              <span className="font-semibold">{totalAmount.toFixed(2)} ₺</span>
            </p>
            <Button fullWidth color="primary" isDisabled={totalAmount === 0}>
              Checkout
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Summary;
