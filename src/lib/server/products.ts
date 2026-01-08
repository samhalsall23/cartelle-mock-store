// === FETCHES ===
// export async function getProductCategories(): Promise<
//   ServerActionResponse<AuthorWithPostCount[]>
// > {
//   return handleServerAction(() =>
//     prisma.author.findMany({
//       include: { _count: { select: { posts: true } } },
//     }),
//   );
// }
