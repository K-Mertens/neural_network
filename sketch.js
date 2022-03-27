// ************************************************
// Neural network
// Horribly coded by : Kevin Le Teugg, 2022
// File : sketch.js
// Description :
// ************************************************

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
let neurons = [];
let nnInputs = [10, 5, 3, 2];

function preload() {

}

function setup() {
  // Canvas creation
  canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  //canvas.parent('sketch-holder');
  background(60);

/*   neuron = new Neuron([0.5, 0.62, -0.87, 0.4]);
  
  neuron.sigmoidActivationFunc(neuron.weightedSum());

  for(var i = 0; i < 10; i++) {
    neu = new Neuron([random(-1, 1), random(-1, 1), random(-1, 1), random(-1, 1)]);
    neurons.push(neu);
  } */

  nn = new NeuralNetwork(nnInputs);
  nn.initNetwork();
  buttonToggleConnections = createButton('Toggle connections');
  buttonToggleConnections.position(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
  buttonToggleConnections.mousePressed(toggleConnections);

  // Method to access all neurons - works
/*   nn.network.forEach(layer => {
    layer.forEach(neuron => {
      neuron.inputs = 3;
    });
  }); */
}

function draw() {
  //background(60);
  nn.showNeuron();
  //nn.showConnections();
}

function toggleConnections() {
  nn.showConnections();
}