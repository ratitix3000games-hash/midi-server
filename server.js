const express = require('express');
const { Midi } = require('@tonejs/midi');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Health check
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Load MIDI from remote URL
app.get('/midi', async (req, res) => {
  const midiUrl = req.query.url;

  if (!midiUrl) {
    return res.status(400).json({ error: 'Missing ?url= parameter' });
  }

  try {
    const response = await axios.get(midiUrl, { responseType: 'arraybuffer' });
    const midi = new Midi(Buffer.from(response.data));

    const notes = midi.tracks.flatMap(track =>
      track.notes.map(note => ({
        pitch: note.name,
        velocity: note.velocity,
        time: note.time
      }))
    );

    res.json({ notes });
  } catch (error) {
    console.error('Error loading MIDI from URL:', error.message);
    res.status(500).json({ error: 'Failed to load or parse MIDI file' });
  }
});

// Export for testing
module.exports = app;

// Start server if not in test mode
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}
