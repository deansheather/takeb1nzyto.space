var isVisual = false;
function toggleVisualiser() {
  isVisual = !isVisual;
}
function visualize(stream) {
	var context = new AudioContext();
	var analyser = context.createAnalyser();
	var source = context.createMediaElementSource(audio);
	source.connect(analyser);
	analyser.connect(context.destination);
	
	WIDTH = canvas.width;
	HEIGHT = canvas.height;
	
	analyser.fftSize = 2048;
	var bufferLength = analyser.frequencyBinCount; 
	var dataArray = new Uint8Array(bufferLength); 
	
	function draw() {
		if (isVisual) {
		    drawVisual = requestAnimationFrame(draw);
		    analyser.getByteTimeDomainData(dataArray);
		
		    ctx.lineWidth = 2;
		    ctx.strokeStyle = "#bdbdbd";
		
		    ctx.beginPath();
		
		    var sliceWidth = WIDTH * 1.0 / bufferLength;
		    var x = 0;
		
		    for(var i = 0; i < bufferLength; i++) {
		      	var v = dataArray[i] / 128.0;
		      	var y = v * HEIGHT/2;
		
		      	if(i === 0) {
		        	ctx.moveTo(x, y);
		      	} else {
		        	ctx.lineTo(x, y);
		      	}
		      	x += sliceWidth;
		    }
		    ctx.lineTo(canvas.width, canvas.height / 2);
		    ctx.stroke();
		} else {
			ctx.clearRect(0, 0, WIDTH, HEIGHT);
		}
	}
 draw();
}
