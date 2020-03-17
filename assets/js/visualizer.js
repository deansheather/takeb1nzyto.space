if (config.visualizer && config.audio) {
  window.visualizer = {
    toggled: false,
    initialized: false,
    context: null,
    analyser: null,
  };

  function initializeVisualizer() {
    if (!visualizer.toggled || visualizer.initialized) {
      return;
    }
    visualizer.initialized = true;

    visualizer.context = new AudioContext();
    visualizer.analyser = visualizer.context.createAnalyser();

    visualizer.analyser.connect(visualizer.context.destination);
    visualizer.analyser.fftSize = 2048;

    // Audio source
    var source = visualizer.context.createMediaElementSource(document.getElementById('audio'));
    source.connect(visualizer.analyser);
  }

  /**
   * Toggle the audio visualizer.
   */
  function toggleVisualizer () {
    visualizer.toggled = !visualizer.toggled;
    initializeVisualizer();
    renderVisualizer();
    Logger.info('[Visualizer] Toggled visualizer to ' + (visualizer.toggled ? 'on' : 'off') + ' state.');
  }

  /**
   * Render the visualizer.
   */
  function renderVisualizer () {
    var bufferLength = visualizer.analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    function draw() {
      if (visualizer.toggled) {
        return;
      }
      requestAnimationFrame(draw);
      visualizer.analyser.getByteTimeDomainData(dataArray);

      backdrop.ctx.lineWidth = 2;
      backdrop.ctx.strokeStyle = config.lightTheme ? '#010916' : '#bdbdbd';
      backdrop.ctx.beginPath();

      var sliceWidth = backdrop.canvas.width * 1.0 / bufferLength;
      var x = 0;

      var sum = 0;
      var peakCount = 0;
      for (var i = 0; i < bufferLength; i++) {
        var y = (dataArray[i] / 128.0) * backdrop.canvas.height / 2;
        backdrop.ctx[i === 0 ? 'moveTo' : 'lineTo'](x, y);
        x += sliceWidth;
      }

      backdrop.ctx.lineTo(canvas.width, canvas.height / 2);
      backdrop.ctx.stroke();
    }

    draw();
  }

  // Attach to click handler
  document.getElementById('visualizer-toggle').onclick = toggleVisualizer;

  // Mousetrap handler
  Mousetrap.bind('v', toggleVisualizer);

  // Autostart on query parameter
  if (query.hasOwnProperty('visualizer')) {
    setTimeout(function () {
      visualizer.toggled = false;
      toggleVisualizer();
    }, 2000);
  }
}
