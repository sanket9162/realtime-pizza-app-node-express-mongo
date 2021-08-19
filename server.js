require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongoDbStore = require("connect-mongo");
const passport = require("passport");

const PORT = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("conneted");
  })
  .catch((e) => {
    console.log("not conneted");
  });

// Session config
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoDbStore.create({
      mongoUrl: process.env.MONGO_CONNECTION_URL,
    }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);
const passportInit = require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});
app.use(flash());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

app.use(express.static("public"));

require("./routes/web")(app);

app.listen(PORT, () => {
  console.log(`listening at port ${PORT} `);
});
