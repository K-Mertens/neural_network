class Neuron {
    constructor(inputs) {
        this.inputs = [];
        this.weights = [];
        this.output = null;
        this.err = null;
        this.layer = null;
        this.id = null;
        this.x;
        this.y;
        this.d;
    }

    aggregationFunc() {
        // Scalar product
        var sum = 0;
        for (var i = 0; i < this.weights.length; i++) {
            sum += this.inputs[i] * this.weights[i];
        }
        // Normalize
        //return sum / this.inputs.length;
        // No normalizing
        return sum
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

    activationFuncDerivative(input, sel) {
        switch (sel) {
            case 0:
                // Derivative of sigmoid
                return (1 / (1 + exp(-input))) * (1 - (1 / (1 + exp(-input))));
            case 1:
                // Derivative of x
                return 1;
            case 2:
                // Derivative of tan(x)
                return  1 / ((input**2) + 1);
            case 3:
                // Derivative of tanh(x)
                return 1 - (Math.tanh(input))**2;
            case 3:
                // Derivative of smooth sign(x)
                return 1 / (1 + (Math.abs(input)**2));
            default:
                // Derivative of sigmoid
                return (1 / (1 + exp(-input))) * (1 - (1 / (1 + exp(-input))));
        }
    }
}