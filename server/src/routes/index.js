// routes/index.jsx

const { notFound } = require("../middleware/handleError");
const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const adminRoute = require("./adminRoute");
const dbRoute = require("./dbRoute");
const clientRoute = require("./client");
const sectionProduct = require("./sectionProduct");

const initRoute = (app) => {
  // Routes
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/user", userRoute);
  app.use("/api/v1/admin", adminRoute);
  app.use("/api/v1/db", dbRoute);
  app.use("/api/v1/client", clientRoute);
  app.use("/api/v1/sectionProduct", sectionProduct); // Section list Product

  // Route không xác định được response error not found
  return app.use(notFound);
};

module.exports = initRoute;
