export type MainConstants = typeof mainConstants;

export const mainConstants = {
  API_ENDPOINT_PRODUCTS: "https://5fc9346b2af77700165ae514.mockapi.io/products",
};

export enum SortOptionsEnum {
  CREATED_AT_ASC = "createdAtAsc",
  CREATED_AT_DESC = "createdAtDesc",
  PRICE_ASC = "priceAsc",
  PRICE_DESC = "priceDesc",
}
