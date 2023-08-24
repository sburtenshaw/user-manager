import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

import { FavouriteFoods } from "~/types";

@Entity()
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: "enum",
    enum: FavouriteFoods,
    nullable: true,
  })
  favouriteFood: FavouriteFoods;
}

export default User;
