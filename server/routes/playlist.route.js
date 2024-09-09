const express = require("express");
const Playlist = require("../controllers/playlist.controller");
const router = express.Router();

router.post("/", Playlist.createPlaylist);
router.get("/", Playlist.getPlaylists);
router.put("/:id", Playlist.updatePlaylist);
router.delete("/:id", Playlist.deletePlaylist);

module.exports = router;
