import { z } from "zod";

enum FavouriteFoods {
  Mexican = "Mexican",
  Italian = "Italian",
  Chinese = "Chinese",
  Turkish = "Turkish",
  Indian = "Indian",
  Greek = "Greek",
  Spanish = "Spanish",
  Thai = "Thai",
  Japanese = "Japanese",
}

const User = z.object({
  id: z.string().uuid().optional(),
  firstName: z
    .string()
    .min(1, {
      message: "First name is required",
    })
    .trim(),
  lastName: z
    .string()
    .min(1, {
      message: "Last name is required",
    })
    .trim(),
  emailAddress: z.string().email({ message: "Invalid email address" }).trim(),
  favouriteFood: z.nativeEnum(FavouriteFoods),
});
type UserType = z.infer<typeof User>;

interface UserWithIdType extends UserType {
  id: string;
}

export type { UserType, UserWithIdType };
export { FavouriteFoods, User };
