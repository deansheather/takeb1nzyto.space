if (config.audio) {
  r(function () {
    var player = document.getElementById('audio');
    var songEl = document.getElementById('song');
    var autoplayText = document.getElementById('audio-autoplay');
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
    var playSong = window.playSong = function (song) {
      previousSong = song;

      songEl.innerText = song[0];
      songEl.setAttribute('href', song[1]);

      player.setAttribute('src', 'assets/music/' + song[0] + '.mp3');
      player.load();
      player.play();
      Logger.info('[Player] Started playing ' + song[0] + '.');
      player.addEventListener('ended', nextSong, { once: true });
    };

    document.body.addEventListener('click', function () {
      autoplayText.style.display = 'none';
      if (query.hasOwnProperty('song')) {
        if (config.audioFiles[query.song]) {
          Logger.info('[Player] Playing song from query string.');
          return playSong(config.audioFiles[query.song]);
        }
      } else if (query.hasOwnProperty('nyan')) {
        if (config.nyanMode && config.nyanSong !== null) {
          Logger.info('[Player] Playing nyan cat song.');
          return playSong(config.nyanSong);
        }
      }

      nextSong();
    }, { once: true });
  });
}
