import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { user as userMethods } from "~/server/db/methods";

import { User, type UserWithIdType } from "~/types";

export const userRouter = createTRPCRouter({
  getUser: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }): Promise<UserWithIdType | null> => {
      const user: UserWithIdType | null = await userMethods.getUser(input.id);
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found.",
        });
      }
      return user;
    }),
  getAllUsers: publicProcedure.query(async (): Promise<UserWithIdType[]> => {
    const users: UserWithIdType[] = await userMethods.getAllUsers();
    return users;
  }),
  createUser: publicProcedure
    .input(z.object({ user: User }))
    .mutation(async ({ input }) => {
      const createdUser: UserWithIdType = await userMethods.createUser(
        input.user
      );
      return createdUser;
    }),
  updateUser: publicProcedure
    .input(z.object({ id: z.string(), data: User.partial() }))
    .mutation(async ({ input }) => {
      const updatedUser: UserWithIdType | null = await userMethods.updateUser(
        input.id,
        input.data
      );
      if (!updatedUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found.",
        });
      }
      return updatedUser;
    }),
  deleteUser: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const deleteSuccessful: boolean = await userMethods.deleteUser(input.id);
      if (!deleteSuccessful) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found.",
        });
      }
      return true;
    }),
});
