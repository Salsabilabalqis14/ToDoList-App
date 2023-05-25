const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Todo', todoSchema)