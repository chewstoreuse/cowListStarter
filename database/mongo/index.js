const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cowList', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('connected to mongo')
});

const cowSchema = new mongoose.Schema({
  name: String,
  description: String
})

const Cow = mongoose.model('Cow', cowSchema);

module.exports = Cow;

module.exports = {
  getAllCows: function () {
    return Cow.find({});
  },

  findCow: function (name) {
    return Cow.find({ name: { $regex: '.*' + name + '.*', $options: 'i' } });
  },

  addCow: function (name, description) {
    return Cow.findOneAndUpdate({ name: name }, { description: description }, {
      new: true,
      upsert: true
    });
  },

  editCow: function (name, description) {
    return Cow.findOneAndUpdate({ name: name }, { description: description });
  },

  deleteCow: function (name) {
    return Cow.deleteOne({ name: name });
  }
}