/**
 * Create a new star.
 */
var Star = function () {
  this.reconfig();
};

/**
 * Reset the star to a new starting position.
 */
Star.prototype.reconfig = function () {
  // Disable reconfig is nyan stars are active
  if (nyanMode.alternativeStars) {
    this.y = -10000;
    return;
  }

  // Set the starting position
  var d = getDimensions();
  this.x = Math.round(Math.random() * d.w);
  this.y = -200;

  // Calculate initial depth
  this.depth = Math.random();
};

/**
 * Render the star into the given context in the next position.
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D context.
 */
Star.prototype.render = function (ctx) {
  // Don't render is this.y = -10000;
  if (this.y === -10000) {
    this.reconfig();
    return;
  }

  var d = getDimensions();
  if (nyanMode.alternativeStars && this.y > d.h) this.reconfig();

  // Calculate the step for the movement
  var step = config.celestialSpeed / config.step * this.depth;
  if (nyanMode.alternativeStars && step < 20) {
    step = 20;
  }

  // Calculate the length of the star relative to the depth and speed
  var length = (config.celestialSpeed > 500 ? 500 : config.celestialSpeed) * this.depth;

  // Render the star
  ctx.beginPath();
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(this.x, this.y + length);
  ctx.strokeStyle = config.lightTheme ? '#010916' : '#fff';
  ctx.lineCap = 'round';
  ctx.lineWidth = 3 * this.depth;
  ctx.stroke();

  // Apply step for next render
  this.y = this.y + step;

  // Reset the celestial body if it leaves the screen
  if (this.y > d.h) this.reconfig();
};
