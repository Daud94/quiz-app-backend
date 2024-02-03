import * as bcrypt from "bcrypt";

require("dotenv").config();
const hash = async (data: string) => {
  return await bcrypt.hash(data, parseInt(process.env.SALT_OR_ROUNDS));
};

export {hash}