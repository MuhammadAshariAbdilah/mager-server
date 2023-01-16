const mongoose = require("mongoose");

const monggoUri = `mongodb+srv://${process.env.USERNAME_DATABASE}:${process.env.PASSWORD_DATABASE}@magerserver.qdxpuos.mongodb.net/test`;
mongoose.set("strictQuery", false);
mongoose
  .connect(`${monggoUri}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));
