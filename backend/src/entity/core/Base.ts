import { Column, CreateDateColumn, Generated, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class Base {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Generated('uuid')
  alias?: string

  @Column({ default: null })
  title?: string

  @Column({ default: null })
  name?: string

  @Column({ default: null })
  description?: string

  @CreateDateColumn()
  createdAt?: Date

  @UpdateDateColumn()
  updatedAt?: Date
}