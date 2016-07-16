if (config.audio) {
  r(function () {
    var songEl = document.getElementById('song');
    var previousSong = null;
    var loading = false;

    // Cache audio buffers for songs
    var audioCache = {};

    /**
     * Change the current song.
     */
    function nextSong () {
      if (loading) return;

      var song = config.audioFiles[Math.floor(Math.random() * config.audioFiles.length)];

      if (previousSong === song) return nextSong();

      Logger.info('[Player] Changing song...');
      playSong(song);
    }

    // Attach to click handler
    document.getElementById('skip-song').onclick = nextSong;

    // Mousetrap handler
    Mousetrap.bind('s', nextSong);

    /**
     * Play a song.
     */
    function playSong (song) {
      loading = true;
      previousSong = song;

      if (window.audioSrc) {
        audioSrc.stop();
      }

      songEl.innerText = 'nothing, yet!';
      songEl.setAttribute('href', 'javascript:void(0)');

      fetchAudioAsset((config.cdnBase + 'assets/music/' + song[0] + '.mp3').replace(/\s/g, '%20'), function (buffer) {
        if (window.audioSrc) {
          audioSrc.stop();
        }

        window.audioSrc = ac.createBufferSource();
        // Connect the AudioContext
        audioSrc.connect(ac.destination);
        audioSrc.connect(visualizer.analyser);

        audioSrc.buffer = buffer;
        audioSrc.addEventListener('ended', nextSong);
        audioSrc.start(0);
        loading = false;

        songEl.innerText = song[0];
        songEl.setAttribute('href', song[1]);
        Logger.info('[Player] Started playing ' + song[0] + '.');
      });
    }

    /**
     * Fetch song data.
     */
    function fetchAudioAsset (url, callback) {
      if (audioCache.hasOwnProperty(url)) {
        return callback(audioCache[url]);
      }

      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'arraybuffer';

      xhr.addEventListener('load', function () {
        ac.decodeAudioData(xhr.response, function (buffer) {
          audioCache[url] = buffer;
          callback(buffer);
        });
      }, false);

      xhr.send();
    };

    if (query.hasOwnProperty('song')) {
      if (config.audioFiles[query.song]) {
        Logger.info('[Player] Playing song from query string.');
        return playSong(config.audioFiles[query.song]);
      }
    }

    nextSong();
  })
}
