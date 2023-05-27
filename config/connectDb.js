const mongoose = require('mongoose');

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));
const connectDb = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_HOST);
    console.log(
      `MongoDB is connected. Name: ${db.connection.name}. Port: ${db.connection.port}. Host: ${db.connection.host}`
        .green.bold.italic
    );
  } catch (error) {
    console.log(error.message.red.bold);
    process.exit(1);
  }
};

module.exports = connectDb;
