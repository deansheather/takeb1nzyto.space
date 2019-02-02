// Initial variables
window.nyanMode = {
  count: 0,
  active: false,
  hideCelestialBodies: false,
  alternativeStars: false
};

var nyanButton = document.getElementById('nyan-mode-button');

/*
 * Toggle nyan cat mode.
 */
function toggleNyanMode() {
  if (!config.nyanMode) return;

  if (nyanMode.active) {
    document.body.classList.remove('nyan-mode');
    nyanMode.active = false;
    nyanMode.hideCelestialBodies = false;
    nyanMode.alternativeStars = false;
  } else {
    document.body.classList.add('nyan-mode');
    nyanMode.active = true;
    nyanMode.alternativeStars = config.nyanStars;
    nyanMode.hideCelestialBodies = config.nyanHideCelestialBodies;

    if (nyanMode.count === 0 && config.nyanSong !== null && window.playSong) {
      window.playSong(config.nyanSong);
    }
  }

  nyanMode.count++;
}

// Attach to click handler
nyanButton.onclick = toggleNyanMode;

// Mousetrap handler for nyan mode
Mousetrap.bind('n', toggleNyanMode);

if (query.hasOwnProperty('nyan')) {
  nyanMode.count = -1; // so it doesn't interfere with audio.js
  toggleNyanMode();
  nyanMode.count++;

  // Reset all celestial bodies
  if (Array.isArray(window.celestials)) {
    for (var i = 0; i < celestials.length; i++) {
      celestials[i].reconfig();
    }
  }
}
