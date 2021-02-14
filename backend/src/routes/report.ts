import express from "express";
import { RESPONSE_STATUS } from "../constants/settings";
import database from "../database";
import { BASIC_PRODUCT_QUERY_FIELDS } from "../queries/basic-product-query";
import responseHelper from "../utilities/responseHelper";

const router = express.Router();

database.init();

/**
 * @Get
 * /report/distributor-types
 */
router.get("/distributor-types", async (_request, response) => {
  try {
    const product = await database.distributorRespository.createQueryBuilder("distributor")
    .select([
      "distributor.id",
      "distributor.name",
      "distributor.alias",
      // "products.id",
      // "products.alias",
      // "products.name",
      // "types.id",
      // "types.alias",
      // "types.name"
    ])
    .groupBy("distributor.id")
    .addGroupBy("products.id")
    .getMany()
    response.status(RESPONSE_STATUS.OK).json(product);
  } catch (error) {
    return responseHelper.error.unknown({ error, response });
  }
});

/**
 * @Get
 * /report/type-distributors
 */
router.get("/type-distributors", async (_request, response) => {
  try {
    const product = await database.productRepository
      .createQueryBuilder("product")
      .getMany();
    response.state(RESPONSE_STATUS.OK).json(product);
  } catch (error) {
    return responseHelper.error.unknown({ error, response });
  }
});

export default router;
