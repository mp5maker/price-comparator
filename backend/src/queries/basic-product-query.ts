import database from "../database";

database.init();

export const BASIC_PRODUCT_QUERY_FIELDS = [
  "product.id",
  "product.alias",
  "product.name",
  "product.createdAt",
  "product.updatedAt",
  "product.model",
  "product.price",
  "distributors.id",
  "distributors.alias",
  "distributors.name",
  "types.id",
  "types.alias",
  "types.type",
  "types.name",
  "photos.id",
  "photos.alias",
  "photos.filename",
];
