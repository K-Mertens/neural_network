// ************************************************
// Neural network
// Horribly coded by : Kevin Le Teugg, 2022
// File : sketch.js
// Description :
// ************************************************

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
// First and last entries of nnInputs must be respectively linked to the (training) data and expected outputs
let nnInputs = [4, 4, 4, 3];
let nn;
let td;
let isNeuRequested = false;
let isConRequested = false;
let isInpRequested = true;
let isOutRequested = true;
let cbToggleConnections;
let buttonSaveNeuralNetworkJSON;
let cbToggleNeurons;
let slFrameRate;
var testAngle = 0;
let img;
let img2;
let trainingData = [];

function preload() {
    img = loadImage('td/4-0.png');
	img2 = loadImage('td/4-1.png');
	//TestImg = loadImage('test_img.png');
}

function setup() {
	// Canvas creation
	canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	background(60);

	td = new TrainingData([[img, loadJSON('td/4-0.json')],[img2, loadJSON('td/4-1.json')]]);

	// Maybe put this DOM elements code in a GUI class
	cbToggleConnections = createCheckbox('Toggle connections');
	cbToggleConnections.position(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 50);
	cbToggleConnections.mousePressed(toggleConnections);
	buttonSaveNeuralNetworkJSON = createButton('Save JSON');
	buttonSaveNeuralNetworkJSON.position(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
	buttonSaveNeuralNetworkJSON.mousePressed(saveNeuralNetworkJSON);
	cbToggleNeurons = createCheckbox('Toggle neurons');
	cbToggleNeurons.position(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 100);
	cbToggleNeurons.mousePressed(toggleNeurons);
	slFrameRate = createSlider(1,60,10,1);

	nn = new NeuralNetwork(nnInputs);
	nn.initNetwork();
	//nn.feedInputs(td.imgs[0]);
	nn.feedInputs([0.39, 0.54, 0.23, 0.77]);
	// Forward propagation
	for (var i = 0; i < nn.network.length; i++) {
		nn.calculateOutputs(i);
		// Stop mapping at the penultimate network layer, hence the -1
		if (i < nn.network.length - 1) {
			nn.inOutMap(i);
		}		
	}

	// Backpropagation test
}

function draw() {
	frameRate(slFrameRate.value());
	background(60);
	nn.showNeurons(isNeuRequested);
	nn.showConnections(isConRequested);
	nn.showInputs(isInpRequested);
	nn.showOutputs(isOutRequested);

	push();
	translate(CANVAS_WIDTH - 80, 50);
	textAlign(CENTER, CENTER);
	fill(255);
	text('Framerate : ' + slFrameRate.value() + 'fps', 0, -30);
	rotate(testAngle);
	stroke(255);
	line(0,0,15,0);
	noFill();
	circle(0,0,30);
	pop();

	testAngle += 0.2;

	// Show all inputs for each neuron, debug only
	for (var i = 1; i < nn.network.length; i++) {
		for (var j = 0; j < nn.network[i].length; j++) {
			for (var k = 0; k < nn.network[i][j].inputs.length; k++) {
				push();
				textSize(10);
				fill(255, 150, 100);
				translate(nn.network[i][j].x, nn.network[i][j].y);
				text((Math.round(nn.network[i][j].inputs[k] * 1000)) / 1000, -40, k*10 - 20);
				pop();
			}
		}
	}
}

function toggleConnections() {
	if (cbToggleConnections.checked()) {
		isConRequested = false;
	} else {
		isConRequested = true;
		clear();
		background(60);
	}
}

function saveNeuralNetworkJSON() {
  	nn.saveToJSON();
}

function toggleNeurons() {
	if (cbToggleNeurons.checked()) {
		isNeuRequested = false;
	} else {
		isNeuRequested = true;
		clear();
		background(60);
	}
}