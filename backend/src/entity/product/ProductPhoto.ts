import { Column, Entity, ManyToMany } from "typeorm";
import { Base } from "../core/Base";
import { Product } from "./Product";

@Entity()
export class ProductPhoto extends Base {
  @Column({ default: null })
  encoding?: string;

  @Column({ default: null })
  mimeype?: string;

  @Column({ default: null })
  size?: string;

  @Column({ default: null })
  destination?: string;

  @Column({ default: null })
  filename?: string;

  @Column({ default: null })
  path?: string;

  @ManyToMany(() => Product, (product) => product.photos)
  product?: Product;
}
