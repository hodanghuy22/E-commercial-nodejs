const { default: mongoose } = require('mongoose');

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL,{
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("DATABASE Connected Success");
  } catch (err) {
    console.log("Database Error:", err);
  }
};

module.exports = dbConnect;