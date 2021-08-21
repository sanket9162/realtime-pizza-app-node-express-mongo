const homeController = require("../app/controllers/homeController");
const authController = require("../app/controllers/authController");
const cartController = require("../app/controllers/customers/cartController");
const orderController = require("../app/controllers/customers/orderController");
const guest = require("../app/middleware/guest");
const auth = require("../app/middleware/auth");
const AdminOrderController = require("../app/controllers/admin/orderController");

const admin = require("../app/middleware/admin");

const initRoutes = (app) => {
  app.get("/", homeController().index);
  app.get("/cart", cartController().index);
  app.get("/login", guest, authController().login);
  app.post("/login", authController().postLogin);
  app.post("/logout", authController().logout);
  app.get("/register", guest, authController().register);
  app.post("/register", authController().postRegister);
  app.post("/update-cart", cartController().update);

  app.post("/orders", auth, orderController().store);
  app.get("/customer/orders", auth, orderController().index);

  app.get("/admin/orders", admin, AdminOrderController().index);
};

module.exports = initRoutes;
