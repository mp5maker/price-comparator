import express from "express";
import { RESPONSE_STATUS } from "../constants/settings";
import database from "../database";
import responseHelper from "../utilities/responseHelper";

const router = express.Router();

database.init();

/**
 * @Get
 * /report/distributor-types/
 */
router.get("/distributor-types/bar", async (_request, response) => {
  try {
    const products = await database.productRepository
      .createQueryBuilder("product")
      .leftJoinAndMapOne(
        "product.distributor",
        "product.distributors",
        "distributor"
      )
      .leftJoinAndSelect("product.types", "types")
      .select([
        "distributor.name",
        `COUNT(case WHEN types.id='1' then 1 end) AS "television"`,
        `COUNT(case WHEN types.id='2' then 1 end) AS "washingMachine"`,
        `COUNT(case WHEN types.id='3' then 1 end) AS "fridge"`,
        `COUNT(case WHEN types.id='4' then 1 end) AS "airConditioner"`,
      ])
      .groupBy('distributor.id')
      .getRawMany();
    response.status(RESPONSE_STATUS.OK).json(products);
  } catch (error) {
    return responseHelper.error.unknown({ error, response });
  }
});

/**
 * @Get
 * /report/distributor-types/pie
 */
router.get("/distributor-types/pie", async (_request, response) => {
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
        `COUNT(type.id) AS "totalTypes"`,
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
 * /report/type-distributors/
 */
router.get("/type-distributors/bar", async (_request, response) => {
  try {
    const products = await database.productRepository
      .createQueryBuilder("product")
      .leftJoinAndMapOne("product.type", "product.types", "type")
      .leftJoinAndSelect("product.distributors", "distributors")
      .select([
        `type.name`,
        `COUNT(case WHEN distributors.id='1' then 1 end) AS "elektra"`,
        `COUNT(case WHEN distributors.id='2' then 1 end) AS "transcom"`,
        `COUNT(case WHEN distributors.id='3' then 1 end) AS "esquire"`,
        `COUNT(case WHEN distributors.id='4' then 1 end) AS "butterfly"`,
        `COUNT(case WHEN distributors.id='5' then 1 end) AS "bestElectronics"`,
        `COUNT(case WHEN distributors.id='6' then 1 end) AS "mKElectronics"`,
        `COUNT(case WHEN distributors.id='7' then 1 end) AS "rangsElectronics"`,
      ])
      .groupBy("type.id")
      .getRawMany();
    response.status(RESPONSE_STATUS.OK).json(products);
  } catch (error) {
    return responseHelper.error.unknown({ error, response });
  }
});

/**
 * @Get
 * /report/type-distributors/pie
 */
router.get("/type-distributors/pie", async (_request, response) => {
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
        `COUNT(distributor.id) AS "totalDistributors"`,
      ])
      .groupBy("type.id")
      .getRawMany();
    response.status(RESPONSE_STATUS.OK).json(products);
  } catch (error) {
    return responseHelper.error.unknown({ error, response });
  }
});

export default router;
