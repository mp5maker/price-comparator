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
      .leftJoinAndMapOne(
        "product.distributor",
        "product.distributors",
        "distributor"
      )
      .leftJoinAndMapOne("product.type", "product.types", "type")
      .select([
        `distributor.name AS "distributorName"`,
        `SUM(type.id) AS "totalTypes"`,
      ])
      .groupBy("distributor.id")
      .getRawMany();
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
    const products = await database.productRepository
      .createQueryBuilder("product")
      .leftJoinAndMapOne(
        "product.distributor",
        "product.distributors",
        "distributor"
      )
      .leftJoinAndMapOne("product.type", "product.types", "type")
      .select([
        `type.name AS "typeName"`,
        `SUM(distributor.id) AS "totalDistributors"`,
      ])
      .groupBy("type.id")
      .getRawMany();
    response.status(RESPONSE_STATUS.OK).json(products);
  } catch (error) {
    return responseHelper.error.unknown({ error, response });
  }
});

export default router;
