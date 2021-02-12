import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { Base } from "../core/Base";
import { Distributor } from "./Distributor";
import { ProductPhoto } from "./ProductPhoto";
import { ProductType } from "./ProductType";

@Entity()
export class Product extends Base {
  @ManyToMany(() => Distributor)
  @JoinTable()
  distributors?: Distributor[];

  @ManyToMany(() => ProductType)
  @JoinTable()
  types?: ProductType[];

  @Column({ default: null })
  model?: string;

  @Column("float")
  price: number;

  @OneToMany(() => ProductPhoto, (productPhoto) => productPhoto.product, { cascade: true })
  photos?: ProductPhoto[];
}
