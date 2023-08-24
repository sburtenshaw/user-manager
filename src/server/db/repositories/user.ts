import DataSourceInstance from "~/server/db/data-source";
import User from "~/server/db/entities/User";

const userRepository = DataSourceInstance.getRepository(User);

export default userRepository;
