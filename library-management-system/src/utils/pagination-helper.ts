export async function searchPaginate(
  query: any,
  args: { page: number; page_size: number },
) {
  const { page, page_size } = args;
  const total = await query.getCount();
  const skip = (page - 1) * page_size;
  if (page_size > 0) {
    query.skip(skip).take(page_size);
  }
  const allRecords = await query.getMany();

  return { allRecords, total };
}
