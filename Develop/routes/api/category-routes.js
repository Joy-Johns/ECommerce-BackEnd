const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const all_categoryData = await Category.findAll({include: [{model:Product}],});
  res.status(200).json(all_categoryData);
  }
  catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const findByPk_categoryData = await Category.findByPk(req.params.id, {include: [{model:Product}],});
  if (!findByPk_categoryData) {
    res.status(404).json({message: "Invalid Category ID"});
    return;
  }
  res.status(200).json(findByPk_categoryData);
}
  catch (err) {
    res.status(500),json(err);
  }
  });

router.post('/', async (req, res) => {
  // create a new category
  try {
    const create_categoryData = await Category.create({category_name: req.body.category_name,});
    res.status(200).json(create_categoryData);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const update_categoryDate = await Category.update(req.body, {where: {id: req.params.id,},});
  if (!update_categoryDate[0]) {
    res.status(404).json({message: "Invalid Category ID"});
    return;
  }
  res.status(200).json(update_categoryDate);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const destroy_categoryData = await Category.destroy({where: {id: req.params.id,},});
  if (!destroy_categoryData) {
    res.status(404).json({message: "Invalid Category ID"});
    return;
  }res.status(200).json(destroy_categoryData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
