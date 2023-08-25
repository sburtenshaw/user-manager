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
  firstName: z.string(),
  lastName: z.string(),
  emailAddress: z.string(),
  favouriteFood: z.nativeEnum(FavouriteFoods).optional(),
});
type UserType = z.infer<typeof User>;

export type { UserType };
export { FavouriteFoods, User };
