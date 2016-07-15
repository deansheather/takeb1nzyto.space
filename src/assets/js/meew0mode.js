// Initial variables
window.meew0Mode = {
  count: 0,
  blocked: false,
  askedBlock: false
};

var meewButton = document.getElementById('meew-mode-button');

// Eyes image
var eyes = new Image();
eyes.src = 'assets/img/eyes.png';

/**
 * Increment or begin meew0 mode.
 */
function incrementMeew0Mode() {
  if (!config.meew0Mode || meew0Mode.blocked) return;

  // Handle ratelimits
  if (meew0Mode.count > 4999 && !meew0Mode.askedBlock) {
    meew0Mode.askedBlock = true;
    Logger.info('[meew0 mode] Asking to ratelimit meew0 mode.');
    meew0Mode.blocked = !confirm('meew0 mode has a ratelimit set, because b1nzy. ¯\\\_(ツ)_/¯ Would you like to disable this ratelimit?');

    if (meew0Mode.blocked) {
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
  for (var i = 0; i < 5; i++) {
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
