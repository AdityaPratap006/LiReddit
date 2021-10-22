import {
  __dbName__,
  __dbPassword__,
  __dbUsername__,
  __prod__,
} from "./constants";
import { MikroORM } from "@mikro-orm/core";
import { Post } from "./entities/Post";

const main = async () => {
  const orm = await MikroORM.init({
    entities: [Post],
    dbName: __dbName__,
    type: "postgresql",
    debug: !__prod__,
    user: __dbUsername__,
    password: __dbPassword__,
  });

  const post = orm.em.create(Post, { title: "my first post" });
  await orm.em.persistAndFlush(post);
  console.log("----sql 2------");
  await orm.em.nativeInsert(Post, { title: "my first post 2" });
};

main().catch((err) => {
  console.error(err);
});
