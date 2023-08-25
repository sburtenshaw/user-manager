import userRepository from "~/server/db/repositories/user";

import { type UserType, type UserWithIdType } from "~/types";

const user = {
  getUser: (id: string): Promise<UserWithIdType | null> => {
    return userRepository.findOneBy({ id });
  },
  getAllUsers: (): Promise<UserWithIdType[]> => {
    return userRepository.find();
  },
  createUser: async (user: UserType): Promise<UserWithIdType> => {
    const createdUser: UserWithIdType = userRepository.create(user);
    await userRepository.save(createdUser);
    return createdUser;
  },
  updateUser: async (
    id: string,
    data: Partial<UserType>
  ): Promise<UserWithIdType | null> => {
    const user: UserWithIdType | null = await userRepository.findOneBy({ id });
    if (user) {
      if (data.firstName) {
        user.firstName = data.firstName;
      }
      if (data.lastName) {
        user.lastName = data.lastName;
      }
      if (data.emailAddress) {
        user.emailAddress = data.emailAddress;
      }
      if (data.favouriteFood) {
        user.favouriteFood = data.favouriteFood;
      }
      await userRepository.save(user);
      return user;
    }
    return null;
  },
  deleteUser: async (id: string): Promise<boolean> => {
    const user: UserWithIdType | null = await userRepository.findOneBy({ id });
    if (user) {
      await userRepository.delete(user);
      return true;
    }
    return false;
  },
};

export { user };
