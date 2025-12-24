const userRoutes = require("./user_routes");
const serviceRoutes = require("./service_routes");
const bookingRoutes = require("./booking_routes");
const chatbotRoutes = require("./chatbot_routes");
const staffRequestRoutes = require("./staffRequest");
const auth_routes = require("./auth_routes");
const admin_routes = require("./admin_routes");

module.exports = (app) => {
  app.use("/api/users", userRoutes);
  app.use("/api/auth", auth_routes);
  app.use("/api/admin", admin_routes);
  app.use("/api/services", serviceRoutes);
  app.use("/api/bookings", bookingRoutes);
  app.use("/api/messages", chatbotRoutes);
  app.use("/api/staff", staffRequestRoutes);
};