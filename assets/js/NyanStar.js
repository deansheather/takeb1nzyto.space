// NyanStar bitmaps for each step
var NyanStarBitMaps = [
  [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 1, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
  ],
  [
    [0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0],
  ],
  [
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
  ]
];

/**
 * Create a new nyan mode star.
 */
var NyanStar = function () {
  this.reconfig();
  this.frame = 0;
};

/**
 * Reset the nyan mode star to a new starting position.
 */
NyanStar.prototype.reconfig = function () {
  // Disable reconfig is nyan stars are not active
  if (!nyanMode.alternativeStars) {
    this.y = -10000;
    return;
  }

  // Set the starting position
  var d = getDimensions();
  this.x = Math.round(Math.random() * d.w);
  this.y = Math.floor(Math.random() * 2000) - 2000;

  // Calculate initial step
  this.step = Math.floor(Math.random() * NyanStarBitMaps.length);
};

/**
 * Render the nyan mode star into the given context in the next position.
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D context.
 * @param {object} d - Dimentions object.
 */
NyanStar.prototype.render = function (ctx, d) {
  // Don't render if y === -10000
  if (this.y === -10000) {
    return this.reconfig();
  }

  // Don't render if off-screen and disabled
  if (!nyanMode.alternativeStars && this.y < 0) return this.reconfig();

  var x = this.x - (config.nyanStarSizePx / 2);
  var y = this.y - (config.nyanStarSizePx / 2);
  var pixelSize = config.nyanStarSizePx / 7;

  // Render bit map for the current step
  var bitMap = NyanStarBitMaps[this.step];
  for (var i = 0; i < bitMap.length; i++) {
    for (var j = 0; j < bitMap[i].length; j++) {
      if (bitMap[i][j] === 1) {
        var bitX = x + (i * pixelSize);
        var bitY = y + (j * pixelSize);
        ctx.fillStyle = config.lightTheme ? '#010916' : '#fff';
        ctx.fillRect(bitX, bitY, pixelSize, pixelSize)
      }
    }
  }

  // Apply step for next render every 10 frames
  if (this.frame === 4) {
    this.frame = 0;
    this.step = this.step + 1;
    if (this.step > 5) {
      this.step = 0;
    }
    this.y = this.y + (nyanMode.alternativeStars ? config.nyanStarSpeed : config.nyanStarSpeed * 4);
  } else {
    this.frame += 1;
    return;
  }

  // Reset the nyan star if it leaves the screen
  if (this.y > d.h) this.reconfig();
};
