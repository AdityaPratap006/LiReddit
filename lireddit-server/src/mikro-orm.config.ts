import { MikroORM } from "@mikro-orm/core";
import path from "path";
import {
  __dbName__,
  __prod__,
  __dbUsername__,
  __dbPassword__,
} from "./constants";
import { Post } from "./entities/Post";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  entities: [Post],
  dbName: __dbName__,
  type: "postgresql",
  debug: !__prod__,
  user: __dbUsername__,
  password: __dbPassword__,
} as Parameters<typeof MikroORM.init>[0];
