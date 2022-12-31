class GUINetwork {
    constructor() {
        this.slFrameRate = createSlider(1,60,10,1);
        this.clockAngle = 0;
    }

    setFrameRate() {
        frameRate(this.slFrameRate.value());
    }

    showFrameRate() {
        push();
        translate(CANVAS_WIDTH - 80, 50);
        textAlign(CENTER, CENTER);
        fill(255);
        text('Framerate : ' + this.slFrameRate.value() + 'fps', 0, -30);
        rotate(this.clockAngle);
        stroke(255);
        line(0,0,15,0);
        noFill();
        circle(0,0,30);
        pop();
        this.clockAngle += 0.2;
    }

    init() {
        // Initialize connections
        cbToggleConnections = createCheckbox('Toggle connections');
        cbToggleConnections.position(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 50);
        // Toggle
        cbToggleConnections.mousePressed(() => {
            if (cbToggleConnections.checked()) {
                isConRequested = false;
            } else {
                isConRequested = true;
                clear();
                background(60);
            }
        });
        // Initialize
    }
}