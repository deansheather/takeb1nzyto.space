// Music player
window.onload = function() {
    var player = document.getElementById('audio');
    var songName = document.getElementById('song-name');
    var songUrl = document.getElementById('song-url');

    var songs = [
      ['Alliance - The Speed Of Light', 'https://www.youtube.com/watch?v=Z8c8MSNk4BY'],
      ['Approaching Nirvana & Big Giant Circles - Reboot', 'https://www.youtube.com/watch?v=JgXIQwHZ8-0'],
      ['Big Giant Circles - Go For Distance', 'https://www.youtube.com/watch?v=RF1rFSoN3JQ'],
      ['Danny Baranowsky - Moonsong', 'https://www.youtube.com/watch?v=MtkECyiRExE'],
      ['Dunderpatrullen - To The Moon', 'https://www.youtube.com/watch?v=YFMLHCMc91c'],
      ['Graviton Flux - Singularity', 'https://soundcloud.com/graviton-flux/singularity'],
      ['Hans Zimmer - Time (Aviators Remix)', 'https://www.youtube.com/watch?v=kfMQcUTtzKg'],
      ['Iseeicy - TIME', 'https://www.youtube.com/watch?v=nw2qiR6f05Q'],
      ['Kai Engel - The Flames of Rome', 'https://www.youtube.com/watch?v=Ck-ZYR-etgI'],
      ['NOMA - Brain Power', 'https://www.youtube.com/watch?v=mj-v6zCnEaw']
    ];

    function nextSong() {
      changeSong(Math.floor(Math.random() * songs.length));
    }

    function changeSong(val) {
        songName.innerHTML = 'Playing: ' + songs[val][0];
        songUrl.setAttribute('href', songs[val][1]);
        player.setAttribute('src', 'assets/music/' + songs[val][0] + ".mp3");
        player.load();
        player.play();
        player.addEventListener('ended', nextSong);
    }

    nextSong();
};
