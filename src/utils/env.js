import { reduce } from "lodash";
import allEnv from "@env";

export const getEnv = project =>
  reduce(
    allEnv,
    (acc, val, key) => {
      if (!!project) {
        const varFound = key.indexOf(`${project.toUpperCase()}_`);
        const cleanedKey =
          varFound !== -1
            ? key.substring(`${project.toUpperCase()}_`.length)
            : "";
        return Object.assign(
          {},
          acc,
          cleanedKey !== "" ? { [cleanedKey]: val } : {}
        );
      }

      return Object.assign({}, acc);
    },
    {}
  );

export const Env = {
  getEnv
};

export default Env;
