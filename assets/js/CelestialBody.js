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
  // Don't reconfig is nyan mode says so
  if (nyanMode.hideCelestialBodies) {
    this.y = -1000;
    return;
  }

  // Set the starting position
  var d = getDimensions();
  this.x = Math.round(Math.random() * (d.w + 50)) - 50;
  this.y = -200;

  // Calculate initial depth
  this.depth = Math.random();

  // Transparency
  this.trans = Math.random();
  this.trans = this.trans > 0.5 ? this.trans : 0.5;

  // Rotation
  this.rotation = Math.floor(Math.random() * 180) + 1; // degrees
  this.rotate_by = Math.floor(Math.random() * 3) + 1; // degrees
  this.rotate_by = Math.random() > 0.5 ? -1 * this.rotate_by : this.rotate_by; // add direction
};

/**
 * Render the celestial body into the given context in the next position.
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D context.
 * @param {number} stepMod - Step modifier (applied after math).
 * @param {object} d - Dimentions object.
 */
CelestialBody.prototype.render = function (ctx, stepMod, d) {
  // Don't render is this.y = -1000;
  if (this.y === -1000) {
    this.reconfig();
    return;
  }

  // Calculate the step for the movement
  var step = (config.celestialSpeed / config.step * this.depth) + stepMod;
  if (nyanMode.hideCelestialBodies && step < 20) {
    step = 20;
  }

  // Calculate the width and height of the celestial body
  var width = (config.celestialSpeed > 200 ? 200 : config.celestialSpeed) * this.depth;
  width = width < 50 ? 50 : width;
  var height = (this.img.height / this.img.width) * width;

  // Rotate the canvas
  ctx.save();
  this.rotation += this.rotate_by;
  if (this.rotation > 180) {
    this.rotation = -180 + (this.rotation - 180);
  }
  if (this.rotation < -180) {
    this.rotation = 180 - (this.rotation + 180);
  }
  ctx.translate(this.x + width/2, this.y + height/2);
  ctx.rotate(this.rotation*Math.PI/180);

  // Render the celestial body
  ctx.globalAlpha = this.trans;
  ctx.drawImage(this.img, -width/2, -height/2, width, height);
  ctx.globalAlpha = 1;

  // Restore rotation and translation state
  ctx.restore();

  // Apply step for next render
  this.y = this.y + step;

  // Reset the celestial body if it leaves the screen
  if (this.y > d.h) this.reconfig();
};
