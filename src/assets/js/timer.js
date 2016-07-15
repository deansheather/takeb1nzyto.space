// Start time
window.initalTime = (new Date()).getTime();

/**
 * Update the timer displayed on the screen.
 */
function updateTimer () {
  var difference = ((new Date()).getTime() - initalTime) / 1000;
  document.getElementById('ratelimited-time').innerText = parseFloat(difference).toFixed(2);
};

// Create the interval to update the timer
setInterval(updateTimer, 10);

/**
 * Open a Twitter intent URL in a new tab.
 */
function tweet () {
  var difference = ((new Date()).getTime() - initalTime) / 1000;

  var win = window.open('https://twitter.com/intent/tweet?url=http%3A%2F%2Ftakeb1nzyto.space&text=I%20got%20ratelimited%20for%20' + parseFloat(difference).toFixed(2) + '%20seconds!&related=deansheather1&hashtags=b1nzy,ratelimited', '_blank');
  win.focus();

  Logger.info('[Timer] Attempted to open Twitter intent URL in a new tab.');
}

document.getElementById('tweet-intent').onclick = tweet;
