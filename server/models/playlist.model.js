const mongoose = require("../config/dbConfig");
const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: [
    {
      type: String,
    },
  ],
});

const Playlist =
  mongoose.models.playlist || mongoose.model("Playlist", playlistSchema);
module.exports = Playlist;
