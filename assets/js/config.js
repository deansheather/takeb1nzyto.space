// Application configuration
window.config = {
  // Content base
  cdnBase: '/',

  // Step modifier
  step: 100,

  // Step increase due to beats (this is applied AFTER maths, so it's absolute).
  stepMod: 40,

  // Celestial speed
  celestialSpeed: 6000,

  // The initial amount of stars
  initialStarsCount: 180,

  // The initial amount of celestial bodies
  inititalCelestialBodies: 20,

  // The initial amount of eyes
  initialEyes: 0,

  // Enable Mastodon support
  mastodonSupport: true,

  // Default Mastodon Instance
  defaultMastodonInstance: "uwu.social",

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

  // Size of nyan cat star in pixels (should be divisible by 7 and 2 (for
  // default bitmaps), and not greater than 200)
  nyanStarSizePx: 56,

  // Speed of nyan cat star in pixels per frame
  nyanStarSpeed: 60,

  // Hide regular celestial bodies in nyan cat mode?
  nyanHideCelestialBodies: true,

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
    'satellite.png',
  ],

  // Enable audio
  audio: true,

  // Enable the ability to have fun
  partyMode: true,

  // Audio Volume Default
  audioVolumeDefault: 0.7,

  // Audio files
  audioFiles: [
    {
      id: -1,
      // Nyan song denotes that it will only play once when nyan mode is loaded
      nyanSong: true,
      artist: 'daniwell',
      title: 'Nyanyanyanyanyanyanya! (Momone Momo UTAU Cover)',
      url: 'https://www.nicovideo.jp/watch/sm13455867'
    },

    {
      id: 0,
      artist: 'Alliance',
      title: 'The Speed Of Light',
      url: 'https://www.youtube.com/watch?v=Z8c8MSNk4BY'
    },
    {
      id: 1,
      artist: "Approaching Nirvana & Big Giant Circles",
      title: "Reboot",
      url: "https://www.youtube.com/watch?v=JgXIQwHZ8-0",
    },
    {
      id: 2,
      artist: "Bag Raiders",
      title: "Shooting Stars",
      bpm: 125,
      offset: 23335,
      url: "https://www.youtube.com/watch?v=feA64wXhbjo",
    },
    {
      id: 3,
      artist: "Big Giant Circles",
      title: "Go For Distance",
      url: "https://www.youtube.com/watch?v=RF1rFSoN3JQ",
    },
    {
      id: 4,
      artist: "Danny Baranowsky",
      title: "Moonsong",
      url: "https://www.youtube.com/watch?v=MtkECyiRExE",
    },
    {
      id: 5,
      artist: "Dunderpatrullen",
      title: "To The Moon",
      url: "https://www.youtube.com/watch?v=YFMLHCMc91c",
    },
    {
      id: 6,
      artist: "Graviton Flux",
      title: "Singularity",
      url: "https://soundcloud.com/graviton-flux/singularity",
    },
    {
      id: 7,
      artist: "Hans Zimmer",
      title: "Time (Aviators Remix)",
      url: "https://www.youtube.com/watch?v=kfMQcUTtzKg",
    },
    {
      id: 8,
      artist: "Iseeicy",
      title: "TIME",
      url: "https://www.youtube.com/watch?v=nw2qiR6f05Q",
    },
    {
      id: 9,
      artist: "Kai Engel",
      title: "The Flames of Rome",
      url: "https://www.youtube.com/watch?v=Ck-ZYR-etgI",
    },
    {
      id: 10,
      artist: "NOMA",
      title: "Brain Power",
      url: "https://www.youtube.com/watch?v=mj-v6zCnEaw",
    },
    {
      id: 11,
      artist: "Queen",
      title: "Don't Stop Me Now",
      url: "https://www.youtube.com/watch?v=HgzGwKwLmgM",
    },
    {
      id: 12,
      artist: "Renard",
      title: "Send It To The Moon",
      url: "https://www.youtube.com/watch?v=J0vUBlcGelI",
    },
    {
      id: 13,
      artist: "Teo Wei Yong",
      title: "Divided Singularity",
      url: "https://www.youtube.com/watch?v=kvJYs14j0bg",
    },
  ],

  // Loading quotes
  loadingQuotes: [
    'To the moon!',
    'Beep. Boop.',
    'Letting the bass kick.',
    'Adding a ratelimit to meme creation.',
    "Spinning all day, 'erryday.",
    'HI MOM ITS ANDREI!1!!1!11!',
    "I'll ratelimit you.",
    'Nyanyanyanyanyanyanyanyanyanyanyanyanyanyanyanyanya!',
  ],
};
