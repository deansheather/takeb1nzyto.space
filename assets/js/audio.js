if (config.audio) {
  r(function () {
    var isPlaying = false;
    var player = document.getElementById('audio');
    var songEl = document.getElementById('song');
    var previousSong = null;

    if (localStorage.getItem('takeb1nzytospace:playerVolume') !== null) {
      player.volume = parseFloat(localStorage.getItem('takeb1nzytospace:playerVolume'));
    } else {
      player.volume = config.audioVolumeDefault;
    }
    
    /**
     * Change the current song.
     */
    function nextSong () {
      var song = config.audioFiles[Math.floor(Math.random() * config.audioFiles.length)];

      if (previousSong === song) return nextSong();

      Logger.info('[Player] Changing song...');
      playSong(song);
    }

    // Attach to click handler
    document.getElementById('skip-song').onclick = nextSong;

    // Mousetrap handler
    Mousetrap.bind('s', nextSong);

    // Volume Controls
    Mousetrap.bind('up', function(e) {
      e.preventDefault();
      player.volume = (player.volume == 1) ? player.volume : Math.round((player.volume + 0.1)*10)/10;
      localStorage.setItem('takeb1nzytospace:playerVolume', player.volume);
      Logger.info('[Player] Volume incremented: ' + player.volume);
    });

    Mousetrap.bind('down', function(e) {
      e.preventDefault();
      player.volume = (player.volume == 0) ? player.volume : Math.round((player.volume - 0.1)*10)/10;
      localStorage.setItem('takeb1nzytospace:playerVolume', player.volume);
      Logger.info('[Player] Volume decremented: ' + player.volume);
    });

    /**
     * Play a song.
     */
    function playSong (song) {
      previousSong = song;

      songEl.innerText = song[0];
      songEl.setAttribute('href', song[1]);

      player.setAttribute('src', 'assets/music/' + song[0] + '.mp3');
      player.load();
      var promise = player.play();
      if (promise != undefined) {
        promise.then(_ => {
          // Autoplay started.
          isPlaying = true;
          console.log("Autoplay succeeded! Wow!");
        }).catch(error => {
          // Autoplay failed.
          console.log("Autoplay failed. Ripperoni.");
        });
      }
      player.addEventListener('ended', nextSong);

      Logger.info('[Player] Started playing ' + song[0] + '.');
    }

    if (query.hasOwnProperty('song')) {
      if (config.audioFiles[query.song]) {
        Logger.info('[Player] Playing song from query string.');
        return playSong(config.audioFiles[query.song]);
      }
    }

    nextSong();

    document.onclick = function () {
      if (!isPlaying) {
        player.play();
        isPlaying = true
      }
    }
  })
}
