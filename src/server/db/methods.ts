import userRepository from "~/server/db/repositories/user";

import type { UserType } from "~/types";

const user = {
  getUser: async (id: string): Promise<UserType | null> => {
    return userRepository.findOneBy({ id });
  },
  getAllUsers: async (): Promise<UserType[]> => {
    return userRepository.find();
  },
  createUser: async (user: UserType): Promise<UserType> => {
    const createdUser: UserType = userRepository.create(user);
    await userRepository.save(createdUser);
    return createdUser;
  },
  updateUser: async (
    id: string,
    data: Partial<UserType>
  ): Promise<UserType | null> => {
    const user: UserType | null = await userRepository.findOneBy({ id });
    if (user) {
      if (data.firstName) {
        user.firstName = data.firstName;
      }
      if (data.lastName) {
        user.lastName = data.lastName;
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
    const user: UserType | null = await userRepository.findOneBy({ id });
    if (user) {
      await userRepository.delete(user);
      return true;
    }
    return false;
  },
};

export { user };
