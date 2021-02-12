import { Column, Entity, ManyToOne } from "typeorm";
import { Base } from "../core/Base";
import { Product } from "./Product";

@Entity()
export class ProductPhoto extends Base {
  @Column({ default: null })
  encoding?: string;

  @Column({ default: null })
  mimetype?: string;

  @Column({ default: null })
  size?: string;

  @Column({ default: null })
  destination?: string;

  @Column({ default: null })
  filename?: string;

  @Column({ default: null })
  path?: string;

  @ManyToOne(() => Product, (product) => product.photos)
  product: Product;
}
