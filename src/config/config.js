const mongoose = require("mongoose");
const connectDb = async () => {
  // const URL = `mongodb://localhost:27017/${process.env.DB_DATABASE}`;

  const URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.1wbmx.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
  try {
    const conn = await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Mongpdb connected ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error:${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDb;
