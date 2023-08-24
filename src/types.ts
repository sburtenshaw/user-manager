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

interface ClientUser {
  firstName: string;
  lastName: string;
  favouriteFood?: FavouriteFoods;
}

interface ServerUser extends ClientUser {
  id: string;
}

export type { ClientUser, ServerUser };
export { FavouriteFoods };
