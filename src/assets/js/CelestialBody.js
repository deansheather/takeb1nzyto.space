/**
 * Create a new celestial body.
 * @param {Image} img - Image to use for the celestial body.
 */
var CelestialBody = function (img) {
  this.img = img;
  this.reconfig();
};

/**
 * Reset the celestial body to a new starting position.
 */
CelestialBody.prototype.reconfig = function () {
  // Set the starting position
  var d = getDimensions();
  this.x = Math.round(Math.random() * (d.w + 50)) - 50;
  this.y = -200;

  // Calculate initial depth
  this.depth = Math.random();

  // Transparency
  this.trans = Math.random();
  this.trans = this.trans > 0.5 ? this.trans : 0.5;
};

/**
 * Render the celestial body into the given context in the next position.
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D context.
 */
CelestialBody.prototype.render = function (ctx) {
  var d = getDimensions();

  // Calculate the step for the movement
  var step = config.celestialSpeed / config.step * this.depth;

  // Calculate the width of the celestial body
  var width = (config.celestialSpeed > 200 ? 200 : config.celestialSpeed) * this.depth;
  width = width < 50 ? 50 : width;

  // Render the celestial body
  ctx.globalAlpha = this.trans;
  ctx.drawImage(this.img, this.x, this.y, width, (this.img.height / this.img.width) * width);
  ctx.globalAlpha = 1;

  // Apply step for next render
  this.y = this.y + step;

  // Reset the celestial body if it leaves the screen
  if (this.y > d.h) this.reconfig();
};
