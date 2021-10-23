import "./dotenv-config";
import { MikroORM } from "@mikro-orm/core";
import mikroORMConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./graphql/resolvers/hello";
import { PostResolver } from "./graphql/resolvers/post";

const main = async () => {
  const orm = await MikroORM.init(mikroORMConfig);
  const migrator = orm.getMigrator();
  await migrator.up();

  const app = express();

  app.get("/", (_req, res) => {
    res.json({
      message: "Hello there!",
    });
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started at http://localhost:4000");
    console.log("GraphQL server started http://localhost:4000/graphql");
  });
};

main().catch((err) => {
  console.error(err);
});
