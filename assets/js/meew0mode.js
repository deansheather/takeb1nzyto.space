// Initial variables
window.meew0Mode = {
  count: 0,
  blocked: false,
  askedBlock: false
};

var meewButton = document.getElementById('meew-mode-button');

// Eyes image
var eyes = new Image();
eyes.src = config.cdnBase + 'assets/img/eyes.png';

// Secret keyword

/**
 * Increment or begin meew0 mode.
 */
function incrementMeew0Mode() {
  if (!config.meew0Mode || meew0Mode.blocked) return;

  // Handle ratelimits
  if (meew0Mode.count > 4999 && !meew0Mode.askedBlock) {
    meew0Mode.askedBlock = true;
    Logger.info('[meew0 mode] Asking to ratelimit meew0 mode.');
    var keyword = prompt("meew0 mode has a ratelimit of 5,000 presses per session because the whole site is themed around ratelimits.\n\nWe can disable this ratelimit for you (be careful, bluescreens have happened in the past because people have reached high meew0 mode multipliers), just enter the secret word \"" + config.meew0ModeKeyword + "\" into the text box below and click \"OK\".\n\nIf you want to disable the meew0 mode button (and 'm' keybind), just click \"Cancel\".");
    
    if (typeof keyword !== 'string' || keyword.toLowerCase() !== config.meew0ModeKeyword) {
      meew0Mode.blocked = true;
      Logger.info('[meew0 mode] Meew0 mode ratelimited after ' + meew0Mode.count + ' increments.');
      return meewButton.innerText = 'meew0 mode ratelimited x' + meew0Mode.count;
    }
  }

  // Increment count
  meew0Mode.count++;
  meewButton.innerText = 'meew0 mode x' + meew0Mode.count;

  // Switch to light theme if not already in light theme mode
  if (!config.lightTheme) {
    document.body.className += 'light-theme';
    config.lightTheme = true;
  }

  // Add the eyes
  for (var i = 0; i < config.meew0ModeEyesPerLevel; i++) {
    celestials.push(new CelestialBody(eyes));
  }
};

// Attach to click handler
meewButton.onclick = incrementMeew0Mode;

// Mousetrap handler for meew0 mode
Mousetrap.bind('m', incrementMeew0Mode);

// Mousetrap handler for light theme
Mousetrap.bind('l', function () {
  if (config.lightTheme) {
    document.body.className = '';
    config.lightTheme = false;
    Logger.info('[meew0 mode] Disabled light theme.');
  } else {
    document.body.className += 'light-theme';
    config.lightTheme = true;
    Logger.info('[meew0 mode] Enabled light theme.');
  }
});
