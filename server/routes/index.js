const express = require("express");
const userRoute = require("./user.route");
const adminRoute = require("./admin.route");
const authRoute = require("./auth.route");
const playlistRoute = require("./playlist.route");
const router = express.Router();
const defaultRoutes = [
  // User routes
  {
    path: "/createUser",
    route: userRoute,
  },
  {
    path: "/updateUser",
    route: userRoute,
  },
  {
    path: "/deleteUser",
    route: userRoute,
  },
  // Admin routes
  {
    path: "/createAdmin",
    route: adminRoute,
  },
  {
    path: "/users",
    route: adminRoute,
  },
  {
    path: "/updateUserByAdmin",
    route: adminRoute,
  },
  {
    path: "/deleteUserByAdmin",
    route: adminRoute,
  },
  // Auth routes
  {
    path: "/admin",
    route: authRoute,
  },
  {
    path: "/token",
    route: authRoute,
  },

  // Playlist routes
  {
    path: "/createPlaylist",
    route: playlistRoute,
  },
  {
    path: "/getPlaylists",
    route: playlistRoute,
  },
  {
    path: "/updatePlaylist",
    route: playlistRoute,
  },
  {
    path: "/deletePlaylist",
    route: playlistRoute,
  },
];
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
module.exports = router;
