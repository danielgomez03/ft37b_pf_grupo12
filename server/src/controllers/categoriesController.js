const { sequelize, Category } = require('../database');
// const categories = require('../data/categories');

// Recursive function to create categories and subcategories
const createCategories = async (categories, parentId = null) => {
  const createdCategories = []; // Array to store created categories

  for (const categoryData of categories) {
    const { name, subcategories } = categoryData;

    // Check if category with the same name already exists
    const existingCategory = await Category.findOne({ where: { name, parentId } });

    if (existingCategory) {
      // Category already exists, update its parentId if necessary
      existingCategory.parentId = parentId;
      await existingCategory.save();
      createdCategories.push(existingCategory); // Add the updated category to the array
    } else {
      // Category doesn't exist, create a new one
      const category = await Category.create({ name, parentId, isMainCategory: !parentId });
      createdCategories.push(category); // Add the newly created category to the array

      if (subcategories && subcategories.length > 0) {
        const createdSubcategories = await createCategories(subcategories, category.categoryId);
        createdCategories.push(...createdSubcategories); // Add the created subcategories to the array
      }
    }
  }

  return createdCategories; // Return the created categories
};

module.exports = createCategories;