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

// Render all stars in the next position.
function render () {
  backdrop.ctx.clearRect(0, 0, backdrop.canvas.width, backdrop.canvas.height);

  var d = getDimensions();
  for (var i = 0; i < celestials.length; i++) {
    celestials[i].render(backdrop.ctx, d);
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
