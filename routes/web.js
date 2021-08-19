const homeController = require("../app/controllers/homeController");
const authController = require("../app/controllers/authController");
const cartController = require("../app/controllers/customers/cartController");
const guest = require("../app/middleware/guest");

const initRoutes = (app) => {
  app.get("/", homeController().index);
  app.get("/cart", cartController().index);
  app.get("/login", guest, authController().login);
  app.post("/login", authController().postLogin);
  app.post("/logout", authController().logout);
  app.get("/register", guest, authController().register);
  app.post("/register", authController().postRegister);
  app.post("/update-cart", cartController().update);
};

module.exports = initRoutes;
