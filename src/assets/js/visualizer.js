if (config.visualizer && config.audio) {
  // Visualizer parameters
  var context = new AudioContext();

  window.visualizer = {
    toggled: false,
    context: context,
    analyser: context.createAnalyser()
  };

  visualizer.analyser.connect(context.destination);
  visualizer.analyser.fftSize = 2048;

  // Audio source
  var source = context.createMediaElementSource(document.getElementById('audio'));
  source.connect(visualizer.analyser);

  /**
   * Toggle the audio visualizer.
   */
  function toggleVisualiser () {
    visualizer.toggled = !visualizer.toggled;
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
        requestAnimationFrame(draw);
        visualizer.analyser.getByteTimeDomainData(dataArray);

        backdrop.ctx.lineWidth = 2;
        backdrop.ctx.strokeStyle = config.lightTheme ? '#010916' : '#fff';
        backdrop.ctx.beginPath();

        var sliceWidth = backdrop.canvas.width * 1.0 / bufferLength;
        var x = 0;

        for (var i = 0; i < bufferLength; i++) {
          var y = (dataArray[i] / 128.0) * backdrop.canvas.height / 2;
          backdrop.ctx[i === 0 ? 'moveTo' : 'lineTo'](x, y);
          x += sliceWidth;
        }

        backdrop.ctx.lineTo(canvas.width, canvas.height / 2);
        backdrop.ctx.stroke();
      }
    }

    draw();
  }

  // Attach to click handler
  document.getElementById('visualizer-toggle').onclick = toggleVisualiser;

  // Mousetrap handler
  Mousetrap.bind('v', toggleVisualiser);

  // Autostart on query parameter
  if (query.hasOwnProperty('visualizer')) {
    setTimeout(function () {
      visualizer.toggled = true;
      renderVisualizer();
    }, 2000);
  }
}