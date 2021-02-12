import { Column, Entity } from "typeorm";
import { Base } from "../core/Base";

@Entity()
export class Distributor extends Base {
  @Column({ default: null })
  branch?: string
}