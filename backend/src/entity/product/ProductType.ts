import { Column, Entity } from "typeorm";
import { Base } from "../core/Base";

@Entity()
export class ProductType extends Base {
  @Column()
  type: string
}