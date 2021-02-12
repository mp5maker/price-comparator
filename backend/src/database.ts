import { Connection, createConnection, Repository } from "typeorm";
import { Distributor } from "./entity/product/Distributor";
import { Product } from "./entity/product/Product";
import { ProductPhoto } from "./entity/product/ProductPhoto";
import { ProductType } from "./entity/product/ProductType";

export default class {
  public static connection: Connection;
  public static distributorRespository: Repository<Distributor>
  public static productTypeRepository: Repository<ProductType>
  public static productPhotoRepository: Repository<ProductPhoto>
  public static productRepository: Repository<Product>

  public static async init() {
    this.connection = await createConnection();
    this.distributorRespository = this.connection.getRepository(Distributor);
    this.productTypeRepository = this.connection.getRepository(ProductType);
    this.productPhotoRepository = this.connection.getRepository(ProductPhoto);
    this.productRepository = this.connection.getRepository(Product);
  }
}
