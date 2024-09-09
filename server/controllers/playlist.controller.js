const { playlistService } = require("../services");

exports.createPlaylist = async (req, res) => {
  try {
    const playlist = await playlistService.createPlaylist(req.body);
    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPlaylists = async (req, res) => {
  try {
    const playlists = await playlistService.getPlaylists();
    res.status(200).json(playlists);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.updatePlaylist = async (req, res) => {
  try {
    const playlist = await playlistService.updatePlaylist(
      req.params.id,
      req.body
    );
    if (!playlist) {
      res.status(404).json({ message: "Playlist not found." });
    }
    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePlaylist = async (req, res) => {
  try {
    const playlist = await playlistService.deletePlaylist(req.params.id);
    if (!playlist) {
      res.status(404).json({ message: "Playlist not found." });
    }
    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
