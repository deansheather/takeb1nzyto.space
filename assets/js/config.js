// Application configuration
window.config = {
  // Content base
  cdnBase: '/',

  // Step modifier
  step: 100,

  // Celestial speed
  celestialSpeed: 6000,

  // The initial amount of stars
  initialStarsCount: 180,

  // The initial amount of celestial bodies
  inititalCelestialBodies: 20,

  // The initial amount of eyes
  initialEyes: 0,

  // Enable meew0 mode
  meew0Mode: true,

  // Amount of eyes to be added per meew0 mode increment
  meew0ModeEyesPerLevel: 5,

  // Keyword to disable meew0 mode when prompted
  meew0ModeKeyword: 'andrei',

  // Enable nyan cat mode
  nyanMode: true,

  // Replace stars with nyan cat stars in nyan cat mode?
  nyanStars: true,

  // How many nyan cat stars to show?
  nyanStarsCount: 20,

  // Size of nyan cat star in pixels (should be divisible by 7 and 2 (for default bitmaps), and not greater than 200)
  nyanStarSizePx: 56,

  // Speed of nyan cat star in pixels per frame
  nyanStarSpeed: 60,

  // Hide regular celestial bodies in nyan cat mode?
  nyanHideCelestialBodies: true,

  // Song to play when starting nyan cat mode for the first time (or null to not change song)
  nyanSong: ['Nyanyanyanyanyanyanya! - daniwell (Momone Momo UTAU Cover)', 'https://www.nicovideo.jp/watch/sm13455867'],

  // Enable visualizer
  visualizer: true,

  // Initial light theme mode setting
  lightTheme: false,

  // Celestial bodies
  celestialBodies: [
    'nebula.png',
    'ring_thing.png',
    'b2nzy.png',
    'clock.png',
    'moon.png',
    'jake.png',
    'b1nzy-hands.png',
    'AAAAAAAAAAAAAAH.png',
    'cromulon.png',
    'nebula2.png',
    'satellite.png'
  ],

  // Enable audio
  audio: true,

  // Audio Volume Default
  audioVolumeDefault: 0.7,

  // Audio files
  audioFiles: [
    ['Alliance - The Speed Of Light', 'https://www.youtube.com/watch?v=Z8c8MSNk4BY'],
    ['Approaching Nirvana & Big Giant Circles - Reboot', 'https://www.youtube.com/watch?v=JgXIQwHZ8-0'],
    ['Bag Raiders - Shooting Stars', 'https://www.youtube.com/watch?v=feA64wXhbjo'],
    ['Big Giant Circles - Go For Distance', 'https://www.youtube.com/watch?v=RF1rFSoN3JQ'],
    ['Danny Baranowsky - Moonsong', 'https://www.youtube.com/watch?v=MtkECyiRExE'],
    ['Dunderpatrullen - To The Moon', 'https://www.youtube.com/watch?v=YFMLHCMc91c'],
    ['Graviton Flux - Singularity', 'https://soundcloud.com/graviton-flux/singularity'],
    ['Hans Zimmer - Time (Aviators Remix)', 'https://www.youtube.com/watch?v=kfMQcUTtzKg'],
    ['Iseeicy - TIME', 'https://www.youtube.com/watch?v=nw2qiR6f05Q'],
    ['Kai Engel - The Flames of Rome', 'https://www.youtube.com/watch?v=Ck-ZYR-etgI'],
    ['NOMA - Brain Power', 'https://www.youtube.com/watch?v=mj-v6zCnEaw'],
    ["Queen - Don't Stop Me Now", 'https://www.youtube.com/watch?v=HgzGwKwLmgM'],
    ['Renard - Send It To The Moon', 'https://www.youtube.com/watch?v=J0vUBlcGelI'],
    ['Teo Wei Yong - Divided Singularity', 'https://www.youtube.com/watch?v=kvJYs14j0bg']
  ],

  // Loading quotes
  loadingQuotes: [
    'To the moon!',
    'Beep. Boop.',
    'Letting the bass kick.',
    'Adding a ratelimit to meme creation.',
    "Spinning all day, 'erryday.",
    'HI MOM ITS ANDREI!!!!!!!',
    "I'll ratelimit you.",
    'Nyanyanyanyanyanyanyanyanyanyanyanyanyanyanyanyanya!'
  ]
};
