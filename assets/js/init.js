// Begin init timer
Logger.time('init');

// Enable logger for environments matching criteria
if (Modernizr.localstorage) {
  if (localStorage.getItem('debug')) {
    Logger.useDefaults();
    config.cdnBase = '';
    Logger.info('[Logger] Enabled logging.');
  }
}

// Test the browser for required features
var modernizrTests = [
  'audio',
  'canvas',
  'requestanimationframe',
  'cssanimations',
  'csstransforms'
];

for (var i = 0; i < modernizrTests.length; i++) {
  if (!Modernizr[modernizrTests[i]]) {
    Logger.error('[Modernizr] Browser does not support required browser feature ' + modernizrTests[i] + '.');
    throw new Error('Unsupported browser.');
  } else {
    Logger.info('[Modernizr] Browser supports required browser feature ' + modernizrTests[i] + '.');
  }
}

// Apply a loading quote to the loader
document.getElementById('loading-text').innerText = config.loadingQuotes[Math.floor(Math.random() * config.loadingQuotes.length)];

// Set the browser type to "supported"
document.documentElement.className = document.documentElement.className.replace(/(?:^|\s)unsupported-browser(?!\S)/g , '');
document.documentElement.className += ' supported-browser';
Logger.info('[Modernizr] Set the browser status to supported.');

// On ready function
function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}

// Get URI parameters
var url = document.URL;
var request = {};
var pairs = url.substring(url.indexOf('?') + 1).split('&');
for (var i = 0; i < pairs.length; i++) {
  if(!pairs[i]) continue;
  var pair = pairs[i].split('=');
  request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
}

window.query = request;

// Hide disabled features on the DOM
if (!config.meew0Mode) {
  document.getElementById('meew-mode-button').style.display = 'none';
  Logger.info('[Config] Disabled meew0 mode.');
}

if (!config.visualizer) {
  document.getElementById('visualizer').style.display = 'none';
  Logger.info('[Config] Disabled visualizer.');
}

if (!config.audio) {
  document.getElementById('audio-info').style.display = 'none';
  document.getElementById('skippable').style.display = 'none';
  Logger.info('[Config] Disabled audio.');
}

// Alter the DOM for some features
if (config.lightTheme) {
  document.getElementsByTagName('body')[0].className += ' light-theme';
  Logger.info('[Config] Enabled light theme.');
}

// Load the canvas and rendering context for the backdrop into window
var canvas = document.getElementById('space-backdrop');

window.backdrop = {
  canvas: canvas,
  ctx: canvas.getContext('2d')
};
