class NeuralNetwork {
    constructor(inputs) {
        this.inputs = inputs;
        this.network = [];
        this.weights = [];

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

    // To be refactored
    // Algorithm for the weights is not correct
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
                    // Diameter hardcoded
                    this.network[i][j].d = 10;
                } else {
                    for (var k = 0; k < this.network[i - 1].length; k++) {
                        this.network[i][j].layer = i + 1;
                        this.network[i][j].id = j;
                        this.network[i][j].inputs.push(0);
                        this.network[i][j].weights.push(random(-1,1));
                        this.network[i][j].x = (CANVAS_WIDTH / (this.inputs.length + 2)) * (i + 1.5);
                        this.network[i][j].y = (CANVAS_HEIGHT / (this.inputs[i] + 2)) * (j + 1.5);
                        // Diameter hardcoded
                        this.network[i][j].d = 10;
                    }
                }              
            }
        }
    }

    initWeights() {
        for (var i = 0; i < this.network.length - 1; i++) {
            for (var j = 0; j < this.network[i].length; j++) {
                for (var k = 0; k < this.network[i+1].length; k++) {
                    var weightObj = {
                        originCoord: null,
                        destinCoord: null,
                        value:null
                    };
                    weightObj.originCoord = [i, j];
                    weightObj.destinCoord = [i+1, k];
                    weightObj.value = random(-1,1);
                    /* tempOriginCoord = [i, j];
                    tempDestinCoord = [i+1, k];
                    tempValue = random(-1,1); */
                    //this.weights.push([weightObj.originCoord], [weight.destinCoord], tempValue);
                    this.weights.push(weightObj);
                }
                    
            }
        }
    }

    // Test of feeding input layer - looks like it is working
    feedInputs(data) {
        for (var i = 0; i < this.network[0].length; i++) {
            this.network[0][i].inputs[0] = data[i];
        }
    }

    // Maps the outputs of the ith layer with the inputs of the (i+1)th layer
    inOutMap(layerNum) {
        for (var i = 0; i < this.network[layerNum].length; i++) {
            for (var j = 0; j < this.network[layerNum+1].length; j++) {
                this.network[layerNum+1][j].inputs[i] = this.network[layerNum][i].output;
            }
        }   
    }

    // Calculate output of a given layer
    calculateOutputs(layerNum) {
        for (var i = 0; i < this.network[layerNum].length; i++) {
            // No computation needed for the input layer, it just passes the input directly to hidden layers
            if (layerNum == 0) {
                this.network[layerNum][i].output = this.network[layerNum][i].inputs[0];
            } else {
                this.network[layerNum][i].output = this.network[layerNum][i].activationFunc(this.network[layerNum][i].aggregationFunc());
            }
        }
    }

    calculateOutputError(desiredOutputs) {
        var lastLayer = this.network.length - 1;
        for (var i = 0 ; i < this.network[lastLayer].length; i++) {
            var neu = this.network[lastLayer][i];
            neu.err = neu.activationFuncDerivative(neu.aggregationFunc()) * (neu.output - desiredOutputs[i]);
            // Debug
            //neu.err = neu.output - expOutputs[i];
        }
    }

    // Calculate error of a given layer
    calculateError(layerNum) {
        for (var i = this.network[layerNum].length - 1; i > 0 ; i--) {
            this.network[layerNum - 1][i].err = this.network[layerNum][i].activationFuncDerivative(this.network[layerNum][i].aggregationFunc());
        }
    }

    showNeurons(isRequested) {
        if (isRequested) {
            for (var i = 0; i < this.network.length; i++) {
                for (var j = 0; j < this.network[i].length; j++) {
                    push();
                    ellipseMode(CENTER);
                    fill(255);
                    stroke(0);
                    circle(this.network[i][j].x, this.network[i][j].y, this.network[i][j].d);
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

    showInputs(isRequested) {
        if (isRequested) {
            for (var i = 0; i < this.network[0].length; i++) {
                push();
                textSize(10);
                fill(255, 150, 100);
                translate(this.network[0][i].x, this.network[0][i].y);
                text((Math.round(this.network[0][i].inputs * 1000)) / 1000, -40, 4);
                pop();
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
                    translate(this.network[i][j].x, this.network[i][j].y);
                    text((Math.round(this.network[i][j].output * 1000)) / 1000, 15, -5);
                    pop();
                } 
            }
        }  
    }

    showWeights(isRequested) {
        if (isRequested) {
            for (var i = 0; i < this.network.length; i++) {
                for (var j = 0; j < this.network[i].length; j++) {
                    for (var k = 0; k < this.network[i][j].weights.length; k++) {
                        push();
                        textSize(10);
                        fill(100, 50, 255);
                        translate(this.network[i][j].x, this.network[i][j].y);
                        text((Math.round(this.network[i][j].weights[k] * 1000)) / 1000, 0, k*10 -50);
                        pop();
                    }
                } 
            }
        }  
    }

    saveToJSON() {
        saveJSON(this.network, 'nn.json');
    }
}