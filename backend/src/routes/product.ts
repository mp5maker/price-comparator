import express from "express";
import { RESPONSE_STATUS } from "../constants/settings";
import database from "../database";
import responseHelper from "../utilities/responseHelper";
const router = express.Router();

database.init();

/**
 * /product/distributor
 */
router.get(
  "/distributor",
  async (_request: express.Request, response: express.Response) => {
    try {
      const distributor = await database.distributorRespository
        .createQueryBuilder("distributor")
        .getMany();

      return response.status(RESPONSE_STATUS.OK).json(distributor);
    } catch (error) {
      return responseHelper.error.unknown({ response, error });
    }
  }
);

/**
 * /product/type
 */
router.get(
  "/type",
  async (_request: express.Request, response: express.Response) => {
    try {
      const productType = await database.productTypeRepository
        .createQueryBuilder("productType")
        .getMany();

      return response.status(RESPONSE_STATUS.OK).json(productType);
    } catch (error) {
      return responseHelper.error.unknown({ response, error });
    }
  }
);

/**
 * /product
 */
router.get(
  "/type",
  async (_request: express.Request, response: express.Response) => {
    try {
      const productType = await database.productRepository
        .createQueryBuilder("product")
        .getMany();

      return response.status(RESPONSE_STATUS.OK).json(productType);
    } catch (error) {
      return responseHelper.error.unknown({ response, error });
    }
  }
);

export default router;
