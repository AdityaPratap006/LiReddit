import { Post } from "../../entities/Post";
import { MyContext } from "src/types";
import {
  Arg,
  InputType,
  Ctx,
  Field,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";

@InputType()
class UpdatePostArgs {
  @Field()
  id: number;

  @Field()
  title?: string;
}

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() ctx: MyContext): Promise<Post[]> {
    return ctx.em.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  async post(
    @Arg("id") id: number,
    @Ctx() ctx: MyContext
  ): Promise<Post | null> {
    const post = await ctx.em.findOne(Post, { id });
    console.table(post);
    return post;
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("title") title: string,
    @Ctx() ctx: MyContext
  ): Promise<Post> {
    const post = ctx.em.create(Post, { title });
    await ctx.em.persistAndFlush(post);
    return post;
  }

  @Mutation(() => Post)
  async updatePost(
    @Arg("data") args: UpdatePostArgs,
    @Ctx() ctx: MyContext
  ): Promise<Post | null> {
    const { id, title } = args;
    const post = await ctx.em.findOne(Post, { id });
    if (!post) {
      return null;
    }

    if (typeof title !== "undefined") {
      post.title = title;
    }

    await ctx.em.persistAndFlush(post);
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg("id") id: number,
    @Ctx() ctx: MyContext
  ): Promise<boolean> {
    try {
      await ctx.em.nativeDelete(Post, { id });
    } catch (error) {
      return false;
    }

    return true;
  }
}
