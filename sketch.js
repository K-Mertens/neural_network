// ************************************************
// Neural network
// Horribly coded by : Kevin Le Teugg, 2022
// File : sketch.js
// Description :
// ************************************************

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
let neurons = [];
let nnInputs = [12, 8, 8, 2];
let nn;
let isNeuRequested = false;
let isConRequested = false;
let cbToggleConnections;
let buttonSaveNeuralNetworkJSON;
let cbToggleNeurons;
let slFrameRate;
var testAngle = 0;

function preload() {

}

function setup() {
  // Canvas creation
  canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  background(60);

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
  nn.feedInputs(null);
  nn.calculateOutputs();

 // Depth of NN minus one because first step (feeding inputs and the first feedforwardstep) is kept out of this
  for (var i = 0; i < nn.network.length - 1; i++) {
    nn.inOutMap();
    nn.calculateOutputs();
  }
  //saveJSON(nn.network, 'final_step.json');

  // Method to access all neurons - works
/*   nn.network.forEach(layer => {
    layer.forEach(neuron => {
      neuron.inputs = 3;
    });
  }); */
}

function draw() {
  frameRate(slFrameRate.value());
  
  background(60);
  nn.showNeurons(isNeuRequested);
  nn.showConnections(isConRequested);
  nn.showOutputs(true);

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