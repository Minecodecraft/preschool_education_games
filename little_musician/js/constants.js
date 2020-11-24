class Sound {
    name;
    filename;
    imagename;

    constructor(name, imagename, filename) {
        this.name = name;
        this.imagename = imagename;
        this.filename = filename;
    }
}

class Target {
    filename;
    imagename;

    constructor(imagename, filename) {
        this.imagename = imagename;
        this.filename = filename;
    }
}

var sounds = [
    new Sound("拍手", "handclap.jpg", "handclap.mp3"),
    new Sound("跺脚", "stamp.jpg", "stamp.mp3"),
    new Sound("拍腿", "shot_legs.png", "shot_legs.mp3"),
    new Sound("敲桌子", "knock.jpg", "knock.mp3"),
];
var targetAmount = 4;
var beatIntervalInMillionseconds = 1000;