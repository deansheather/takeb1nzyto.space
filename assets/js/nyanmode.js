var nyanButton = document.getElementById('nyan-mode-button');
var nyanModeCount = 0;

/*
 * Toggle nyan cat mode.
 */
function toggleNyanMode() {
  if (!config.nyanMode) return;
  document.body.classList.toggle('nyan-mode');
  Logger.info('[nyan mode] Toggled nyan cat mode.');

  if (document.body.classList.contains('nyan-mode')) {
    if (nyanModeCount === 0 && config.nyanSong !== null && window.playSong) {
      window.playSong(config.nyanSong);
    }
  }

  // TODO: stars and celestial bodies

  nyanModeCount++;
}

// Attach to click handler
nyanButton.onclick = toggleNyanMode;

// Mousetrap handler for nyan mode
Mousetrap.bind('n', toggleNyanMode);

if (query.hasOwnProperty('nyan')) {
  document.body.classList.add('nyan-mode');
}
