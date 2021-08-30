var scene;
var vars = {
    version: 1.2,
    canvas: {
        width: 1920, height: 1080, cX: 1920/2, cY: 1080/2,
    },

    logo: {
        width: 1022,
        height: 557
    },

    anims: {
        init: ()=> {
            let frameCount = 4;
            scene.anims.create({
                key: `ringing`,
                frames: scene.anims.generateFrameNames(`phones`, { prefix: 'phone', end: frameCount-1 }),
                frameRate: frameCount,
                repeat: -1,
                //yoyo: true
            });
        }
    },

    phaserObject: {
        logo: {
            getRandomPoint: function (vec) {
                let x; let y; let pixel;
                let c = vars.canvas;
                do {
                    x = Phaser.Math.Between(0, vars.logo.width-1);
                    y = Phaser.Math.Between(0, vars.logo.height-1);
                    pixel = scene.textures.getPixel(x, y, 'logo');
                } while (pixel.alpha < 255);
                return vec.setTo(x-c.cX/2-100,y-c.cY/2-200);
            }
        },
    },

    particles: {
        available: [],
        currentlyRunning: 'itech',

        init: ()=> {
            let pV = vars.particles;
            pV.sparklesInit();
        },

        sparklesInit: ()=> {
            let pV = vars.particles;
            pV.available.letterSparkle = scene.add.particles('flares');

            pV.available.letterSparkle.createEmitter({
                x: vars.canvas.cX, y: vars.canvas.cY,
                frame: 'white',
                tint: 0xffff00,
                quantity: 100, lifespan: 666, gravityY: 1,
                scale: { start: 0, end: 0.3, ease: 'Quad.easeOut' },
                alpha: { start: 1, end: 0, ease: 'Quad.easeIn' },
                blendMode: 'ADD',
                emitZone: { type: 'random', source: vars.phaserObject.logo }
            });
        }
    }
}