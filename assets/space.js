// Elements
var canvas = document.getElementById('space');
var text = document.getElementById('text');
var tweet = document.getElementById('tweet-intent');

if (canvas.getContext){
  var ctx = canvas.getContext('2d');
} else {
  throw new Error('current browser does not have canvas support');
}

// Screen dimensions fetcher
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

// Resize canvas on page resize
var resize = function () {
  var d = getDimensions();
  canvas.setAttribute('width', d.w);
  canvas.setAttribute('height', d.h);
};
window.addEventListener('resize', resize);
resize();

// Celestial bodies
var bodyImages = ['nebula.png', 'ring_thing.png', 'b2nzy.png', 'clock.png', 'moon.png', 'jake.png'];
var eyes = new Image();
eyes.src = 'assets/img/eyes.png';

// Variables for the renderer.
var fps = 45; // Frames to render per second
var starCount = 200; // The amount of stars to render
var stars = []; // An array of stars
var bodyCount = 8; // The amount of celestial bodies to render in meew0 mode
var bodies = []; // An array of celestial bodies
var speed = 4000; // Speed of the stars
var lightBg = false; // Dark stars

// Star class: a rendered star on the screen.
var Star = function () {
  var d = getDimensions();
  this.x = Math.round(Math.random() * d.w);
  this.y = Math.round(Math.random() * d.h);
  this.depth = Math.random();
};

// Draw star in the next position.
Star.prototype.draw = function () {
  var d = getDimensions();
  var step = speed / fps * this.depth;
  var length = (speed > 500 ? 500 : speed) * this.depth;

  ctx.beginPath();
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(this.x, this.y + length);
  ctx.strokeStyle = lightBg ? '#010916' : '#fff';
  ctx.lineCap = 'round';
  ctx.lineWidth = 3 * this.depth;
  ctx.stroke();

  this.y = this.y + step;

  if (this.y > d.h) {
    this.x = Math.round(Math.random() * d.w);
    this.y = -200;
    this.depth = Math.random();
  }
};

// CelestialBody class: a rendered celestial body on the screen.
var CelestialBody = function (img) {
  var d = getDimensions();
  this.x = Math.round(Math.random() * d.w);
  this.y = -200;
  this.depth = Math.random();
  this.img = img;
  this.trans = Math.random();
  this.trans = this.trans > 0.5 ? this.trans : 0.5;
};

// Draw celestial body in the next position.
CelestialBody.prototype.draw = function () {
  var d = getDimensions();
  var step = speed / fps * this.depth;
  var width = (speed > 200 ? 200 : speed) * this.depth;

  width = width < 50 ? 50 : width;
  ctx.globalAlpha = this.trans;
  ctx.drawImage(this.img, this.x, this.y, width, (this.img.height / this.img.width) * width);
  ctx.globalAlpha = 1;

  this.y = this.y + step

  if (this.y > d.h) {
    this.x = Math.round(Math.random() * d.w);
    this.y = -200;
    this.depth = Math.random();
    this.trans = Math.random();
    this.trans = this.trans > 0.5 ? this.trans : 0.5;
  }
};

// Render all stars in the next position.
var render = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(function (star) {
    star.draw();
  });

  bodies.forEach(function (body) {
    body.draw();
  });
};

// Drawer function - draws and creates initial stars
var draw = function () {
  if (window.started) return;
  window.started = true;

  for (var i = 0; i < starCount; i++) {
    stars.push(new Star());
  }

  celestial();

  render();
  window.renderInterval = setInterval(render, 1000 / fps);
};

// Celestial body start function
var celestial = function () {
  var loaded = 0;
  var imgs = [];

  for (var i = 0; i < bodyImages.length; i++) {
    imgs.push(new Image());
    imgs[i].onload = function () {
      if (++loaded >= bodyImages.length) {
        for (var i = 0; i < bodyCount; i++) {
          bodies.push(new CelestialBody(imgs[Math.floor(Math.random() * imgs.length)]));
        }
      }
    };
    imgs[i].src = 'assets/img/' + bodyImages[i];
  }
};

// Eyes
var eyesCount = 0;
var meewBlocked = false;
var eyeLimitDisable = false;
var eyeLimitAsked = false;
var doMeew = function () {
  if(eyesCount <= 9999 || eyeLimitDisable){
    if(meewBlocked){
      document.getElementById('meew-mode').innerHTML = 'meew0 mode xRateLimit';
    }
    else{
      eyesCount++;
      meewBlocked = true;
      setTimeout(function(){
        if(meewBlocked){
          meewBlocked = false;
          document.getElementById('meew-mode').innerHTML = 'meew0 mode x' + eyesCount;
        }
      }, 500);
      document.getElementById('meew-mode').innerHTML = 'meew0 mode x' + eyesCount;
      for (var i = 0; i < 5; i++) {
        bodies.push(new CelestialBody(eyes));
      }
    }
  }
  else{
    if(!eyeLimitAsked){
      eyeLimitAsked = true;
      eyeLimitDisable = confirm('In order to prevent browser crashing, a limit has been set for meew0 mode. Would you like to disable it anyway?');
      return;
    }
    document.getElementById('meew-mode').innerHTML = 'meew0 mode xTooMuch';
  }
  document.body.className = 'light';
  lightBg = true;
};

// Draw on ready
function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}
r(draw);

// Time counter function
window.time = 0;
var count = function () {
  window.time = window.time + 0.01;
  var f = parseFloat(time).toFixed(2);
  ratelimited.innerText = f;
  tweet.setAttribute('href', 'https://twitter.com/intent/tweet?url=http%3A%2F%2Ftakeb1nzyto.space&text=I%20got%20ratelimited%20for%20' + f + '%20seconds!&related=deansheather1&hashtags=b1nzy,ratelimited')
};
setInterval(count, 10);

// Reset meew0 mode function
var resetMeew = function () {
  window.started = false;
  stars = bodies = [];
  clearInterval(window.renderInterval);
  eyesCount = 0;
  meewBlocked = false;
  document.getElementById('meew-mode').innerHTML = 'meew0 mode';
  document.body.className = '';
  lightBg = false;
  draw();
};
