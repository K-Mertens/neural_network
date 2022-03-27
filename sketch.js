// ************************************************
// Neural network
// Horribly coded by : Kevin Le Teugg, 2022
// File : sketch.js
// Description :
// ************************************************

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const FRAME_RATE = 10;
let neurons = [];
let nnInputs = [2, 2, 1];
let nn;
let isNeuRequested = false;
let isConRequested = false;
let cbToggleConnections;
let buttonSaveNeuralNetworkJSON;
let cbToggleNeurons;
var testAngle = 0;

function preload() {

}

function setup() {
  // Canvas creation
  canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  //canvas.parent('sketch-holder');
  background(60);
  frameRate(FRAME_RATE);

  cbToggleConnections = createCheckbox('Toggle connections');
  cbToggleConnections.position(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 50);
  cbToggleConnections.mousePressed(toggleConnections);
  buttonSaveNeuralNetworkJSON = createButton('Save JSON');
  buttonSaveNeuralNetworkJSON.position(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
  buttonSaveNeuralNetworkJSON.mousePressed(saveNeuralNetworkJSON);
  cbToggleNeurons = createCheckbox('Toggle neurons');
  cbToggleNeurons.position(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 100);
  cbToggleNeurons.mousePressed(toggleNeurons);

  nn = new NeuralNetwork(nnInputs);
  nn.initNetwork();
  //saveJSON(nn.network, 'nn_init.json');
  nn.feedInputs(null);
  nn.calculateOutputs();
 //saveJSON(nn.network, 'nn_1st_step.json');
  nn.inOutMap();
  nn.calculateOutputs();
  //saveJSON(nn.network, 'nn_2nd_step.json');
  nn.inOutMap();
  nn.calculateOutputs();
  //saveJSON(nn.network, 'nn_3rd_step.json');

  // Method to access all neurons - works
/*   nn.network.forEach(layer => {
    layer.forEach(neuron => {
      neuron.inputs = 3;
    });
  }); */
}

function draw() {
  
  background(60);
  nn.showNeurons(isNeuRequested);
  nn.showConnections(isConRequested);
  push();
  
  translate(CANVAS_WIDTH - 80, 50);
  textAlign(CENTER, CENTER);
  text('Framerate : ' + FRAME_RATE + 'fps', 0, -30);
  rotate(testAngle);
  
  text.position
  line(0,0,15,15);
  pop();
  testAngle++;
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