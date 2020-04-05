// Object.create shim
if (typeof Object.create !== 'function') {
  Object.create = function (o) {
    function F() {}
    F.prototype = o;
    return new F();
  };
}

/**
 * Fetch the viewport dimensions.
 * @return {object} dimensions - Dimensions as an object.
 * @return {number} dimensions.w - Viewport width.
 * @return {number} dimensions.h - Viewport height.
 */
var getDimensions = function () {
  var w, h;

  if (typeof window.innerWidth === 'number') {
    w = window.innerWidth;
    h = window.innerHeight;
  } else {
    if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
      w = document.documentElement.clientWidth;
      h = document.documentElement.clientHeight;
    } else {
      if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        w = document.body.clientWidth;
        h = document.body.clientHeight;
      }
    }
  }

  return {w: w, h: h};
};

/**
 * Resize the canvas to fit the viewport.
 */
var resize = function () {
  var d = getDimensions();
  canvas.setAttribute('width', d.w);
  canvas.setAttribute('height', d.h);

  Logger.info('[Backdrop] Resized the canvas to fit the viewport.')
};
window.addEventListener('resize', resize);
resize();

// Celestial bodies array
// All items in this array get render()ed on
window.celestials = [];

function easeQuartMirrored(t) {
  if (t < 0.5) {
    // Ease in.
    t = 2 * t;
    return t*t*t*t;
  } else {
    // Ease out.
    t = 2 * (t - 0.5);
    return 1 - (1-(--t)*t*t*t);
  }
}

// Render all stars in the next position.
function render () {
  var stepMod = 0

  // Apply BPM-based stepMod modifier. If a song has a defined BPM (and optionally
  // an offset), after every beat the celestial bodies will speed up slightly
  // for workMs.
  if (window.currentSong && window.currentSong.bpm && window.player && !window.player.paused) {
    var bpmMs = 60000 / window.currentSong.bpm;
    var workMs = bpmMs / 4;
    // The song is shifted forward by 4/10 workMs so work can start slightly
    // earlier.
    var curMs = (window.player.currentTime * 1000) + (workMs / 0.4);

    if (window.currentSong.offset) {
      curMs -= window.currentSong.offset;
    }

    if (curMs >= 0) {
      var beatMs = (curMs % bpmMs);

      if (beatMs < workMs) {
        var z = easeQuartMirrored(beatMs / workMs);

        stepMod += z * config.stepMod;
      }
    }
  }

  backdrop.ctx.clearRect(0, 0, backdrop.canvas.width, backdrop.canvas.height);

  var d = getDimensions();
  for (var i = 0; i < celestials.length; i++) {
    celestials[i].render(backdrop.ctx, stepMod, d);
  }

  requestAnimationFrame(render);
};

// Prepare celestials and begin rendering
function draw () {
  if (window.started) return;
  window.started = true;

  var loaded = 0;
  var imgs = [];

  for (var i = 0; i < config.celestialBodies.length; i++) {
    imgs.push(new Image());

    imgs[i].onload = function () {
      if (++loaded >= config.celestialBodies.length) finish();
    };

    imgs[i].src = config.cdnBase + 'assets/img/' + config.celestialBodies[i];
  }

  function finish () {
    for (var i = 0; i < config.initialStarsCount; i++) {
      celestials.push(new Star());
    }

    if (config.nyanMode && config.nyanStars) {
      for (var i = 0; i < config.nyanStarsCount; i++) {
        celestials.push(new NyanStar());
      }
    }

    for (var i = 0; i < config.inititalCelestialBodies; i++) {
      celestials.push(new CelestialBody(imgs[Math.floor(Math.random() * imgs.length)]));
    }

    render();
    Logger.info('[Renderer] Rendering started.');
    Logger.timeEnd('init');

    // Hide loader
    document.documentElement.classList.remove('loading');
    document.documentElement.classList.add('loaded');
  }
};

// Draw on ready
r(draw);
