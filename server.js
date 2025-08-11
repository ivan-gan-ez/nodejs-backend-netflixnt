const express = require("express");
const mongoose = require("mongoose");

const app = express();

// connect to mongodb with a mongoose
async function connectToMongoDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/netflix");
  } catch (error) {
    console.log("ERORE");
  }
}

// trogger de function
connectToMongoDB();

app.get("/", (req, res) => {
  res.send("Greetings and salutations!");
});

// import all the routers
const movieRouter = require("./routes/movie");
app.use("/movies", movieRouter);

const tvshowsRouter = require("./routes/tvshow");
app.use("/shows", tvshowsRouter);

app.listen(6789, () => {
  console.log("Server currently running at http://localhost:6789");
});
