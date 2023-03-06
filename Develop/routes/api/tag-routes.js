const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const all_tagData = await Tag.findAll({include: [{ model: Product }],});
  res.status(200).json(all_tagData);
   } 
   catch(err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const findByPk_tagData = await Tag.findByPk(req.params.id, {include: [{ model: Product }],});

    if (!findByPk_tagData) {
      res.status(404).json({ message: "Invalid Tag ID" });
      return;
    }

    res.status(200).json(findByPk_tagData);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const create_tagData = await Tag.create({tag_name: req.body.tag_name,});
    res.status(200).json(create_tagData);
  } 
  catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const update_tagData = await Tag.update(req.body, {where: {id: req.params.id,},});
    if (!update_tagData[0]) {
      res.status(404).json({ message: "Invalid Tag ID" });
      return;
    }
    res.status(200).json(update_tagData);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const destroy_tagData = await Tag.destroy({where: {id: req.params.id,},});

    if (!destroy_tagData) {
      res.status(404).json({ message: "Invalid Tag ID" });
      return;
    }

    res.status(200).json(destroy_tagData);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
