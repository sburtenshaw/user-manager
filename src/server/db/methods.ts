import userRepository from "~/server/db/repositories/user";

import type { ClientUser, ServerUser } from "~/types";

const db = {
  user: {
    getUser: async (id: string): Promise<ServerUser | null> => {
      return userRepository.findOneBy({ id });
    },
    getAllUsers: async (): Promise<ServerUser[]> => {
      return userRepository.find();
    },
    createUser: async (user: ClientUser): Promise<ServerUser> => {
      const createdUser: ServerUser = userRepository.create(user);
      await userRepository.save(createdUser);
      return createdUser;
    },
    updateUser: async (
      id: string,
      data: Partial<ClientUser>
    ): Promise<ServerUser | null> => {
      const user: ServerUser | null = await userRepository.findOneBy({ id });
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
      const user: ServerUser | null = await userRepository.findOneBy({ id });
      if (user) {
        await userRepository.delete(user);
        return true;
      }
      return false;
    },
  },
};

export default db;
