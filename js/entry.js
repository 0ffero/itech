var config = {
    type: Phaser.WEBGL,
    backgroundColor: '#000',
    parent: 'itech',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: vars.canvas.width, height: vars.canvas.height
    },
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload () {
    scene = this;
    scene.load.setPath('assets');
    scene.load.atlas('flares', 'particles/sparks.png', 'particles/sparks.json');
    scene.load.image('logo', 'images/itech.png'); scene.load.image('text', 'images/text.png'); scene.load.image('phone', 'images/phone.png');
    scene.load.atlas('phones', 'images/phones.png', 'images/phones.json');
}

function create (){
    let v = vars; let c = v.canvas;
    v.anims.init();
    scene.add.sprite(c.cX-500,c.cY+400,'phones','phone0').anims.play('ringing');
    scene.add.image(c.cX+150,c.cY,'text'); scene.add.image(c.cX+50,c.cY+400,'phone');
    v.particles.init();
}
