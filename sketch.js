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
let nnInputs = [4, 3, 2, 1];
let isNeuRequested = false;
let isConRequested = false;

function preload() {

}

function setup() {
  // Canvas creation
  canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  //canvas.parent('sketch-holder');
  background(60);
  frameRate(FRAME_RATE);

/*   neuron = new Neuron([0.5, 0.62, -0.87, 0.4]);
  
  neuron.sigmoidActivationFunc(neuron.weightedSum());

  for(var i = 0; i < 10; i++) {
    neu = new Neuron([random(-1, 1), random(-1, 1), random(-1, 1), random(-1, 1)]);
    neurons.push(neu);
  } */


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
  // Test of initializing input layer
  for (var i = 0; i < nn.network[0].length; i++) {
    nn.network[0][i].inputs = [(random(-1, 1))];
  }
  nn.calculateOutputs();
  nn.inOutMap();
  //saveJSON(nn.network, 'nn_modified.json');

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