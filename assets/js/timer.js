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
 * Format difference in time for output to external applications
 */
function formatDiffernce (decimal_places) {
  var difference = ((new Date()).getTime() - initalTime) / 1000;
  return parseFloat(difference).toFixed(decimal_places);
}

/**
 * Open a Twitter intent URL in a new tab.
 */
function tweet () {
  var win = window.open('https://twitter.com/intent/tweet?url=http%3A%2F%2Ftakeb1nzyto.space&text=I%20got%20ratelimited%20for%20' + formatDiffernce(2) + '%20seconds!&related=deansheather1&hashtags=b1nzy,ratelimited', '_blank');
  win.focus();

  Logger.info('[Timer] Attempted to open Twitter intent URL in a new tab.');
}

document.getElementById('tweet-intent').onclick = tweet;


 /**
 * Open Mastodon share prompt in a new tab
 */
function toot () {
  var win = window.open('https://' + window.mastodonInstance + '/share?text=I+got+ratelimited+for+' + formatDiffernce(2) + '+seconds!+++https://takeb1nzyto.space', '_blank');

  win.focus();
  toggleTootForm();
}

function toggleTootForm () {
  var form = document.getElementById('toot-form');
  form.style.visibility = (form.style.visibility == 'visible') ? 'hidden' : 'visible';
}

document.getElementById('toot-share').onclick = toggleTootForm;

document.getElementById('toot-form').onsubmit = toot;
