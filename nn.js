class NeuralNetwork {
    constructor(inputs) {
        this.inputs = inputs;
        this.network = [];

        // Add neurons in network
        for (var i = 0; i < this.inputs.length; i++) {
            var tempLayer = [];
            for (var j = 0; j < this.inputs[i]; j++) {
                var neu = new Neuron(0);
                tempLayer.push(neu);
            }
            this.network.push(tempLayer);
        }
    }

    initNetwork() {
        for (var i = 0; i < this.network.length; i++) {
            for (var j = 0; j < this.network[i].length; j++) {
                if (i == 0) {
                    this.network[i][j].layer = 1;
                    this.network[i][j].id = j;
                    this.network[i][j].inputs = [0];
                    this.network[i][j].weights = [random(-1,1)];
                    this.network[i][j].x = (CANVAS_WIDTH / (this.inputs.length + 2)) * 1.5;
                    this.network[i][j].y = (CANVAS_HEIGHT / (this.inputs[0] + 2)) * (j + 1.5);
                } else {
                    for (var k = 0; k < this.network[i - 1].length; k++) {
                        this.network[i][j].layer = i + 1;
                        this.network[i][j].id = j;
                        this.network[i][j].inputs.push(0);
                        this.network[i][j].weights.push(random(-1,1));
                        this.network[i][j].x = (CANVAS_WIDTH / (this.inputs.length + 2)) * (i + 1.5);
                        this.network[i][j].y = (CANVAS_HEIGHT / (this.inputs[i] + 2)) * (j + 1.5);
                    }
                }              
            }
        }
    }

    // Test of feeding input layer
    feedInputs(data) {
        for (var i = 0; i < this.network[0].length; i++) {
        this.network[0][i].inputs = [random(-1, 1)];
  }
    }

    inOutMap() {
        for (var i = 0; i < this.network.length; i++) {
            for (var j = 0; j < this.network[i].length; j++) {
                if (i != this.network.length - 1) {
                    for (var k = 0; k < this.network[i+1].length; k++) {
                        this.network[i+1][k].inputs[j] = this.network[i][j].output;
                    }
                }
            } 
        }
    }

    calculateOutputs() {
        for (var i = 0; i < this.network.length; i++) {
            for (var j = 0; j < this.network[i].length; j++) {
                this.network[i][j].output = this.network[i][j].activationFunc(this.network[i][j].weightedSum());
            } 
        }
    }

    showNeurons(isRequested) {
        if (isRequested) {
            for (var i = 0; i < this.network.length; i++) {
                for (var j = 0; j < this.network[i].length; j++) {
                    push();
                    fill(255);
                    stroke(0);
                    circle(this.network[i][j].x, this.network[i][j].y, 20);
                    pop();
                }
            }
        }
    }

    showConnections(isRequested) {
        if (isRequested) {
            for (var i = 0; i < this.network.length; i++) {
                for (var j = 0; j < this.network[i].length; j++) {
                    if (i != this.network.length - 1) {
                        for (var k = 0; k < this.network[i+1].length; k++) {
                            push();
                            stroke(255);
                            line(this.network[i][j].x, this.network[i][j].y, this.network[i+1][k].x, this.network[i+1][k].y);
                            pop();
                        }
                    }
                } 
            }
        }  
    }

    showOutputs(isRequested) {
        if (isRequested) {
            for (var i = 0; i < this.network.length; i++) {
                for (var j = 0; j < this.network[i].length; j++) {
                    push();
                    textSize(10);
                    fill(100, 255, 100);
                    //console.log(this.network[i][j].output.x);
                    translate(this.network[i][j].x, this.network[i][j].y);
                    text((Math.round(this.network[i][j].output * 1000)) / 1000, 15, -10);
                    pop();
                } 
            }
        }  
    }

    saveToJSON() {
        saveJSON(this.network, 'nn.json');
    }
}