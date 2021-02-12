import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Base } from "../core/Base";
import { Distributor } from "./Distributor";
import { ProductPhoto } from "./ProductPhoto";
import { ProductType } from "./ProductType";

@Entity()
export class Product extends Base {
  @OneToOne(() => Distributor)
  @JoinColumn()
  distributor?: Distributor;

  @OneToOne(() => ProductType)
  @JoinColumn()
  type?: ProductType;

  @Column({ default: null })
  model?: string;

  @Column("float")
  price: number;

  @OneToMany(() => ProductPhoto, (productPhoto) => productPhoto.product, { cascade: true })
  photos?: ProductPhoto[];
}
