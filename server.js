const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

//Use this array as your (in-memory) data store.
let bookings = require("./bookings.json");


app.get("/", function (req, res) {
  res.send("Hotel booking server.  Ask for /bookings , /booking/add , /search? and /booking/:id");
});

app.get("/booking", (req, res) => {
    res.send(bookings);
});

app.post("/booking/add", (req, res) => {
  bookings.push(req.body);
  console.log("ADD NEW booking:", req.body);
  res.json({ Success: true });
})

app.get("/search/:id", (req, res) => {
  const term = Number(req.params.id)
  const books = bookings.filter(book => book.id === term)

  !term? res.sendStatus(404) : res.send(books)
  console.log(term , books)
});

app.delete("/booking/del/:id", (req, res) => {
  const idDelet = Number(req.params.id)
  console.log(idDelet);
  bookings = bookings.filter(book => book.id !== idDelet)
  res.send(bookings);
  
})
// TODO add your routes and helper functions here

const port = process.env.PORT || 3000;
//Start our server so that it listens for HTTP requests!
const listener = app.listen(port, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
