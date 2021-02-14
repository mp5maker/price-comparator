import express from "express";
import get from "lodash/get";
import sanitize from "sanitize-filename";
import { RESPONSE_STATUS } from "../constants/settings";
import database from "../database";
import { Distributor } from "../entity/product/Distributor";
import { Product } from "../entity/product/Product";
import { ProductPhoto } from "../entity/product/ProductPhoto";
import { ProductType } from "../entity/product/ProductType";
import multerHelper from "../utilities/multerHelper";
import responseHelper from "../utilities/responseHelper";
import { ProductDTO } from "../dto/request/product.dto";
import { BASIC_PRODUCT_QUERY_FIELDS } from "../queries/basic-product-query";
const router = express.Router();

database.init();

/**
 * @Get
 * /product
 */
router.get(
  "/",
  async (request: express.Request, response: express.Response) => {
    try {
      const query = get(request, "query", {});
      const type = get(query, "type", "");
      const price = get(query, "price", "");
      const distributor = get(query, "distributor", "");

      let productQueryBuilder = database.productRepository
        .createQueryBuilder("product")
        .leftJoinAndSelect("product.distributors", "distributors")
        .leftJoinAndSelect("product.types", "types")
        .leftJoinAndSelect("product.photos", "photos")
        .select(BASIC_PRODUCT_QUERY_FIELDS);
      productQueryBuilder.where(`product.createdAt IS NOT NULL`);

      if (price) {
        productQueryBuilder.andWhere(`product.price < :price`, { price });
      }

      if (distributor) {
        productQueryBuilder.andWhere(`distributors.id = :distributor`, {
          distributor,
        });
      }

      if (type) {
        productQueryBuilder.andWhere(`types.id = :type`, { type });
      }

      const product = await productQueryBuilder.getMany();

      return response.status(RESPONSE_STATUS.OK).json(product);
    } catch (error) {
      return responseHelper.error.unknown({ response, error });
    }
  }
);

/**
 * @Post
 * /product
 */
router.post(
  "/",
  multerHelper.uploadImage.single("image"),
  async (request: express.Request, response: express.Response) => {
    try {
      const file = get(request, "file", "");
      const body: ProductDTO = get(request, "body", {});
      const product = new Product();
      const productPhoto = new ProductPhoto();

      const fileProperties = Object.keys(file);
      const allProperties = Object.keys(body);
      const hasProperties =
        Array.isArray(allProperties) && allProperties.length > 0;

      if (hasProperties && file) {
        allProperties.map((perProp) => {
          product[perProp] = body[perProp];
        });

        fileProperties.map((perProp) => {
          productPhoto[perProp] = file[perProp];
        });

        /* Distributor */
        const distributor = new Distributor();
        distributor.id = get(body, "distributor", 0);
        product.distributors = [distributor];

        /* Type */
        const type = new ProductType();
        type.id = get(body, "type", 0);
        product.types = [type];

        product.photos = [productPhoto];
        const createdProduct = await database.connection.manager.save(product);
        return response.status(RESPONSE_STATUS.OK).json(createdProduct);
      } else {
        return response.status.error.unknown({
          response,
          error: { body: "THE_BODY_IS_EMPTY_OR_NO_IMAGE_IS_UPLOADED" },
        });
      }
    } catch (error) {
      return responseHelper.error.unknown({ response, error });
    }
  }
);

/**
 * @Get
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
 * @Post
 * /product/distributor
 */
router.post(
  "/distributor",
  async (request: express.Request, response: express.Response) => {
    try {
      const body = get(request, "body", {});
      const distributor = new Distributor();
      const allProperties = Object.keys(body);
      const hasProperties =
        Array.isArray(allProperties) && allProperties.length > 0;

      if (hasProperties) {
        allProperties.map((perProp) => {
          distributor[perProp] = body[perProp];
        });
        const createdDistributor = await database.distributorRespository.save(
          distributor
        );
        return response.status(RESPONSE_STATUS.OK).json(createdDistributor);
      } else {
        return response.status.error.unknown({
          response,
          error: { body: "THE_BODY_IS_EMPTY" },
        });
      }
    } catch (error) {
      return responseHelper.error.unknown({ response, error });
    }
  }
);

/**
 * @Get
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
 * @Post
 * /product/type
 */
router.post(
  "/type",
  async (request: express.Request, response: express.Response) => {
    try {
      const body = get(request, "body", {});
      const productType = new ProductType();
      const allProperties = Object.keys(body);
      const hasProperties =
        Array.isArray(allProperties) && allProperties.length > 0;

      if (hasProperties) {
        allProperties.map((perProp) => {
          productType[perProp] = body[perProp];
        });
        const createdProductType = await database.productTypeRepository.save(
          productType
        );
        return response.status(RESPONSE_STATUS.OK).json(createdProductType);
      } else {
        return response.status.error.unknown({
          response,
          error: { body: "THE_BODY_IS_EMPTY" },
        });
      }
    } catch (error) {
      return responseHelper.error.unknown({ response, error });
    }
  }
);

/**
 * @Get
 * /product/photo
 */
router.get(
  "/photo",
  async (_request: express.Request, response: express.Response) => {
    try {
      const productPhoto = await database.productPhotoRepository
        .createQueryBuilder("productPhoto")
        .getMany();

      return response.status(RESPONSE_STATUS.OK).json(productPhoto);
    } catch (error) {
      return responseHelper.error.unknown({ response, error });
    }
  }
);

/**
 * @Post
 * /product/photo
 */
router.post(
  "/photo",
  multerHelper.uploadImage.single("image"),
  async (request: express.Request, response: express.Response) => {
    try {
      const file = get(request, "file", "");
      if (file) {
        const productPhoto = new ProductPhoto();
        productPhoto.name = sanitize(get(file, "originalname", "")).replace(
          " ",
          "-"
        );
        productPhoto.encoding = get(file, "encoding", "");
        productPhoto.mimetype = get(file, "mimetype", "");
        productPhoto.size = get(file, "size", "");
        productPhoto.destination = get(file, "destination", "");
        productPhoto.filename = get(file, "filename", "");
        productPhoto.path = get(file, "path", "");
        const uploadedFile = await database.productPhotoRepository.save(
          productPhoto
        );
        return response.status(RESPONSE_STATUS.OK).json({
          ...uploadedFile,
        });
      } else {
        return responseHelper.error.unknown({
          response,
          error: { message: "FILE_FAILED_TO_UPLOAD" },
        });
      }
    } catch (error) {
      return responseHelper.error.unknown({ response, error });
    }
  }
);

export default router;
