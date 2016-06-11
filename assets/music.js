// Music player
window.onload = function() {
    var player = document.getElementById('audio');
    var info = document.getElementById('song')

    var songs = [
      ['Alliance - The Speed Of Light', 'assets/music/Alliance - The Speed Of Light.mp3'],
      ['Approaching Nirvana & Big Giant Circles - Reboot', 'assets/music/Approaching Nirvana & Big Giant Circles - Reboot.mp3'],
      ['Big Giant Circles - Go For Distance', 'assets/music/Big Giant Circles - Go For Distance.mp3'],
      ['Danny Baranowsky - Moonsong', 'assets/music/Danny Baranowsky - Moonsong.mp3'],
      ['Dunderpatrullen - To The Moon', 'assets/music/Dunderpatrullen - To The Moon.mp3'],
      ['Graviton Flux - Singularity', 'assets/music/Graviton Flux - Singularity.mp3'],
      ['Hans Zimmer - Time (Aviators Remix)', 'assets/music/Hans Zimmer - Time (Aviators Remix).mp3'],
      ['Iseeicy - TIME', 'assets/music/Iseeicy - TIME.mp3'],
      ['Kai Engel - The Flames of Rome', 'assets/music/Kai Engel - The Flames of Rome.mp3'],
      ['NOMA - Brain Power', 'assets/music/NOMA - Brain Power.mp3']
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
