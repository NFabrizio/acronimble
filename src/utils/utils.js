export const getCategoryName = (categories = [], idList = []) => {
  return categories.filter(category => idList.includes(category._id))
  .map(category => category.categoryName);
};
