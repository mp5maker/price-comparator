import express from "express";
import { RESPONSE_STATUS } from "../constants/settings";
import database from "../database";
import responseHelper from "../utilities/responseHelper";

const router = express.Router();

database.init();

/**
 * @Get
 * /report/distributor-types
 */
router.get("/distributor-types", async (_request, response) => {
  try {
    const products = await database.productRepository
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.distributors", "distributors")
      .leftJoinAndSelect("product.types", "types")
      .select([
        "product.id",
        "product.name",
        "product.alias",
        "distributors.id",
        "distributors.alias",
        "distributors.name",
        "types.id",
        "types.alias",
        "types.name",
      ])
      .getMany();
    response.status(RESPONSE_STATUS.OK).json(products);
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
