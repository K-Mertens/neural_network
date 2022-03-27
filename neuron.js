class Neuron {
    constructor(inputs) {
        this.inputs = [];
        this.weights = [];
        this.output = null;
        this.layer = null;
        this.id = null;
        this.x;
        this.y;

        // Initialize weights (random)
/*         for (var i = 0; i < this.inputs.length; i++) {
            this.weights.push(random(-1,1));
            console.log(this.weights[i]);
        } */
    }

    weightedSum() {
        var sum = 0;
        for (var i = 0; i < this.weights.length; i++) {
            sum += this.inputs[i] * this.weights[i];
        }
        // Normalize
        this.output = sum / this.inputs.length;
        return this.output;
    }

    sigmoidActivationFunc(input) {
        console.log("Activation value : " + 1 / (1 + exp(-input)))
        return 1 / (1 + exp(-input));
    }

/*     show() {
        push();
        fill(255);
        stroke(0);
        circle(50, 50, CANVAS_HEIGHT / 20);
        pop();
    } */
}