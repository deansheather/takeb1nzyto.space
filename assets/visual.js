function visualize(stream) {
  var context = new AudioContext();
  var analyser = context.createAnalyser();
  var source = context.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(context.destination);
  
  

  analyser.fftSize = 2048;
  var bufferLength = analyser.frequencyBinCount; 
  var dataArray = new Uint8Array(bufferLength); 

  function draw() {
    var d = getDimensions();
    drawVisual = requestAnimationFrame(draw);

    analyser.getByteTimeDomainData(dataArray);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#bdbdbd";

    ctx.beginPath();

    var sliceWidth = d.w * 1.0 / bufferLength;
    var x = 0;

    for(var i = 0; i < bufferLength; i++) {
      var v = dataArray[i] / 128.0;
      var y = v * d.y/2;

      if(i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      x += sliceWidth;
    }
    ctx.lineTo(d.w, d.h / 2);
    ctx.stroke();
  }
  draw();
}
