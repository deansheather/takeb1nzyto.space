// Music player
window.onload = function() {
    var player = document.getElementById('audio');
    var info = document.getElementById('song')

    var songs = [
      ['Alliance - The Speed Of Light [Epic Orchestral Intense]', 'assets/music/music.mp3']
    ]

    function nextSong() {
      changeSong(Math.floor(Math.random() * songs.length));
    };

    function changeSong(val) {
      var newSong = songs[val][1];
      song.innerHTML = 'Playing: ' + songs[val][0];
      player.setAttribute('src', songs[val][1]);
      player.load();
      player.play();
      player.addEventListener('ended', nextSong);
    };

    nextSong();
};