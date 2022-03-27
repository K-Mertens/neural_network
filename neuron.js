class Neuron {
    constructor(inputs) {
        this.inputs = [];
        this.weights = [];
        this.output = null;
        this.layer = null;
        this.id = null;
        this.x;
        this.y;
    }

    weightedSum() {
        var sum = 0;
        for (var i = 0; i < this.weights.length; i++) {
            sum += this.inputs[i] * this.weights[i];
        }
        // Normalize
        return sum / this.inputs.length;
    }

    activationFunc(input, sel) {
        switch (sel) {
            case 0:
                // Sigmoid
                return (1 / (1 + exp(-input)));
            case 1:
                // f(x) = x
                return input;
            case 2:
                // f(x) = tan(x) - BEWARE THAT THE IMAGE OF TAN(X) IS [-PI/2, PI/2]
                return Math.tan(input);
            case 3:
                // f(x) = tanh(x)
                return Math.tanh(input);
            case 3:
                // f(x) = smooth sign(x)
                return input / (1 + Math.abs(input));
            default:
                // Sigmoid
                return (1 / (1 + exp(-input)));
        }
    }
}