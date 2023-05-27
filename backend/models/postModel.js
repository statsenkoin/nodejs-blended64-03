const { model, Schema } = require('mongoose');

const postSchema = Schema({
  title: {
    type: String,
    default: 'Covid19',
  },
  text: {
    type: String,
    required: [true, 'Provide field text'],
  },
  rating: {
    type: Number,
    default: 0.0,
  },
  author: {
    type: String,
    required: [true, 'Provide field author'],
  },
});

module.exports = model('posts', postSchema);
