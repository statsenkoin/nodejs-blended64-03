const postModel = require('../models/postModel');
const asyncHandler = require('express-async-handler');

class PostsController {
  getAll = asyncHandler(async (req, res) => {
    const posts = await postModel.find({});
    res.status(200).json({
      code: 200,
      message: 'Success',
      data: posts,
      qty: posts.length,
    });
    // res.send('getAll');
  });

  //   async add(req, res) {
  //     const { author, text } = req.body;
  //     // if (!author || !text) {
  //     //   res.status(400).json({ message: 'Provide all required fields' });
  //     // }
  //     const post = await postModel.create({ ...req.body });
  //   }

  add = asyncHandler(async (req, res) => {
    const { author, text } = req.body;
    if (!author || !text) {
      //   res.status(400).json({ message: 'Provide all required fields' });
      res.status(400);
      throw new Error('Provide all required fields');
    }
    const post = await postModel.create({ ...req.body });
    res.status(201).json({
      code: 201,
      message: 'Success',
      data: post,
    });
  });

  async getOne(req, res) {
    res.send('getOne');
  }

  async update(req, res) {
    res.send('update');
  }

  async remove(req, res) {
    res.send('remove');
  }
}

module.exports = new PostsController();
