const { Playlist } = require("../models");
const mongoose = require("mongoose");
const createPlaylist = async (playlistData) => {
  try {
    const playlist = new Playlist(playlistData);
    await playlist.save();
    return playlist;
  } catch (error) {
    throw error;
  }
};

const getPlaylists = async () => {
  return await Playlist.find();
};

const updatePlaylist = async (id, updateData) => {
  console.log(updateData);
  return await Playlist.findByIdAndUpdate(
    new mongoose.Types.ObjectId(id),
    updateData,
    { new: true }
  );
};

const deletePlaylist = async (id) => {
  return await Playlist.findByIdAndDelete(id);
};

module.exports = {
  createPlaylist,
  getPlaylists,
  updatePlaylist,
  deletePlaylist,
};
