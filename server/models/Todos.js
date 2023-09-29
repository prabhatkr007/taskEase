const mongoose = require('mongoose');
const{Schema, model} = mongoose;

const TodoSchema = new Schema({
  action: {
    type: String,
    required: [true, 'This field is required']
  }
})
 
const TodoApp = model('todo', TodoSchema);
 
module.exports = TodoApp;