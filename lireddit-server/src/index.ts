import "./dotenv-config";
import { MikroORM } from "@mikro-orm/core";
import mikroORMConfig from "./mikro-orm.config";
import { Post } from "./entities/Post";

const main = async () => {
  const orm = await MikroORM.init(mikroORMConfig);

  const post = orm.em.create(Post, { title: "my first post" });
  await orm.em.persistAndFlush(post);
  console.log("----sql 2------");
  await orm.em.nativeInsert(Post, { title: "my first post 2" });
};

main().catch((err) => {
  console.error(err);
});
