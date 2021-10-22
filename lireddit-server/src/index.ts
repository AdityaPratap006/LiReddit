import "./dotenv-config";
import { MikroORM } from "@mikro-orm/core";
import mikroORMConfig from "./mikro-orm.config";
import { Post } from "./entities/Post";

const main = async () => {
  const orm = await MikroORM.init(mikroORMConfig);
  const migrator = orm.getMigrator();
  await migrator.up();

  // const post = orm.em.create(Post, { title: "my first post" });
  // await orm.em.persistAndFlush(post);

  const posts = await orm.em.find(Post, {});
  console.table(posts);
};

main().catch((err) => {
  console.error(err);
});
