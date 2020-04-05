if (config.audio) {
  r(function () {
    window.player = document.getElementById('audio');
    window.currentSong = null;

    var songEl = document.getElementById('song');
    var autoplayText = document.getElementById('audio-autoplay');

    if (localStorage.getItem('takeb1nzytospace:playerVolume') !== null) {
      window.player.volume = parseFloat(localStorage.getItem('takeb1nzytospace:playerVolume'));
    } else {
      window.player.volume = config.audioVolumeDefault;
    }

    /**
     * Change the current song.
     */
    function nextSong () {
      var song = config.audioFiles.filter(a => !a.nyanSong)[Math.floor(Math.random() * config.audioFiles.length)];

      if (window.currentSong === song) return nextSong();

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
      window.player.volume = (player.volume == 1) ? player.volume : Math.round((player.volume + 0.1)*10)/10;
      localStorage.setItem('takeb1nzytospace:playerVolume', player.volume);
      Logger.info('[Player] Volume incremented: ' + player.volume);
    });

    Mousetrap.bind('down', function(e) {
      e.preventDefault();
      window.player.volume = (player.volume == 0) ? player.volume : Math.round((player.volume - 0.1)*10)/10;
      localStorage.setItem('takeb1nzytospace:playerVolume', player.volume);
      Logger.info('[Player] Volume decremented: ' + player.volume);
    });

    /**
     * Play a song.
     */
    var playSong = window.playSong = function (song) {
      window.currentSong = song;

      var title = song.artist + ' - ' + song.title;

      songEl.innerText = title;
      songEl.setAttribute('href', song.url);

      window.player.setAttribute('src', 'assets/music/' + title + '.mp3');
      window.player.load();
      window.player.play();
      Logger.info('[Player] Started playing ' + title + '.');
    };

    document.body.addEventListener('click', function () {
      autoplayText.style.display = 'none';

      if (query.hasOwnProperty('song')) {
        var song = config.audioFiles.find(a => a.id == query.song);

        if (!!song) {
          Logger.info('[Player] Playing song from query string.');
          return playSong(song);
        }
      } else if (query.hasOwnProperty('nyan')) {
        var song = config.audioFiles.find(a => a.nyanSong);

        if (config.nyanMode && !!song) {
          Logger.info('[Player] Playing nyan cat song.');
          return playSong(song);
        }
      }

      nextSong();
    }, { once: true });

    window.player.addEventListener('ended', nextSong);
  });
}
