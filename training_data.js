class TrainingData {
    constructor(rawDataSet) {
        this.rawDataSet = rawDataSet;
        this.img = [];
        this.imgs = [];
        this.expOutputs = [];
        // Shape of dataset :
        // [[[data0],[expectedOutputs0]],[[data1],[expectedOutputs1]], ... [[dataN],[expectedOutputsN]]]
        this.dataSet = null;
     
        // Pixels attribute of p5.image is a one dimensional array where each group of four are R,G,B,A values
        // i + 0 % 4 -> R
        // i + 3 % 4 -> G
        // i + 2 % 4 -> B
        // i + 1 % 4 -> A
        // Get the p5 image element and retrieving the array of one colour component of the pixel attribute
        for (var i = 0; i < this.rawDataSet.length; i++) {
            this.rawDataSet[i][0].loadPixels();
            for (var j = 0; j < this.rawDataSet[i][0].pixels.length; j++) {
                if ((j + 3) % 4 == 0) {
                    this.img.push(this.rawDataSet[i][0].pixels[j]);
                    //this.dataSet[i][0][j] = this.dataSet[i][0].pixels[j];
                }	
            }
            this.imgs.push(this.img);
            this.img = [];
        }
        // Normalize pixel arrays
        for (var i = 0; i < this.imgs.length; i++) {
            for (var j = 0; j < this.imgs[i].length; j++) {
                this.imgs[i][j] = this.imgs[i][j] / Math.max(...this.imgs[i]);
            }
        }
    }
}