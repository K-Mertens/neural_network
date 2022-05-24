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
let guiNetwork;
let isNeuRequested = false;
let isConRequested = false;
let isInpRequested = true;
let isOutRequested = true;
let isWeiRequested = true;
let cbToggleConnections;
let buttonSaveNeuralNetworkJSON;
let cbToggleNeurons;
let img;
let img2;
let trainingData = [];
// Desired output linked to the training data that was fed to the network
let desiredOutputs = [];

function preload() {
    img = loadImage('td/4-0.png');
	img2 = loadImage('td/4-1.png');
	//TestImg = loadImage('test_img.png');
}

function setup() {
	// Canvas creation
	canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	background(60);
	guiNetwork = new GUINetwork();
	guiNetwork.initConnections();

	td = new TrainingData([[img, loadJSON('td/4-0.json')],[img2, loadJSON('td/4-1.json')]]);

	// Maybe put this DOM elements code in a GUI class
	buttonSaveNeuralNetworkJSON = createButton('Save JSON');
	buttonSaveNeuralNetworkJSON.position(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
	buttonSaveNeuralNetworkJSON.mousePressed(saveNeuralNetworkJSON);
	cbToggleNeurons = createCheckbox('Toggle neurons');
	cbToggleNeurons.position(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 100);
	cbToggleNeurons.mousePressed(toggleNeurons);

	nn = new NeuralNetwork(nnInputs);
	nn.initNetwork();
	//nn.feedInputs(td.imgs[0]);
	//nn.feedInputs([0.39, 0.54, 0.23, 0.77]);
	nn.feedInputs([-0.39, -0.54, -0.23, -0.77]);
	//nn.feedInputs([-0.63, 0.26, 0.543, -0.12]);
	desiredOutputs = [0.77, 0.18, 0.52]; // has to be the same dimension as the last layer of network
	// Forward propagation
	for (var i = 0; i < nn.network.length; i++) {
		nn.calculateOutputs(i);
		// Stop mapping at the penultimate network layer, hence the -1
		if (i < nn.network.length - 1) {
			nn.inOutMap(i);
		}		
	}

	// Backpropagation test
	nn.calculateOutputError(desiredOutputs);
	// Error calculation test
	nn.calculateError(2);
	nn.calculateError(1);
}

function draw() {
	// "Animation test"
/* 	nn.feedInputs([random(-1,1), random(-1,1), random(-1,1), random(-1,1)]);
	for (var i = 0; i < nn.network.length; i++) {
		nn.calculateOutputs(i);
		if (i < nn.network.length - 1) {
			nn.inOutMap(i);
		}		
	}
	nn.calculateOutputError([random(0,1), random(0,1), random(0,1)]);
	for (var i = nn.network.length - 2; i > 0; i--) {
		nn.calculateError(i);
	} */

	guiNetwork.setFrameRate();
	guiNetwork.showFrameRate();
	background(60);
	nn.showNeurons(isNeuRequested);
	nn.showConnections(isConRequested);
	nn.showInputs(isInpRequested);
	nn.showOutputs(isOutRequested);
	nn.showWeights(isWeiRequested);

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
	// Show all inputs for each neuron, debug only
	for (var i = 0; i < nn.network.length; i++) {
		for (var j = 0; j < nn.network[i].length; j++) {
			push();
			textSize(10);
			fill(200, 200, 50);
			translate(nn.network[i][j].x, nn.network[i][j].y);
			text((Math.round(nn.network[i][j].err * 1000)) / 1000, 15, 5);
			pop();	
		}
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