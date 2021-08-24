var scene;
var vars = {
    version: 1.0,
    canvas: {
        width: 1920, height: 1080, cX: 1920/2, cY: 1080/2,
    },

    graphics: {
        logo: {
            getPoints: function (quantity, stepRate) {
                if (!stepRate) {
                    stepRate = Phaser.Math.PI2 / quantity;
                }

                var input = Phaser.Utils.Array.NumberArrayStep(0, Phaser.Math.PI2, stepRate);
                let logoPoints = [];
                for (let t=0; t<input.length; t++) {
                    let scale = 2 / (3 - Math.cos(2*t));
                    let x = ~~(scale * Math.cos(t) * 4000)/10;
                    let y = ~~(scale * Math.sin(2*t)/2*4000)/10;
                    logoPoints.push(new Phaser.Geom.Point(x,y));
                }
                return logoPoints;
            }
        },
    },

    phaserObject: {
        logo: {
            getRandomPoint: function (vec) {
                let x; let y; let pixel;
                let c = vars.canvas;
                do {
                    x = Phaser.Math.Between(0, 1021);
                    y = Phaser.Math.Between(0, 556);
                    pixel = scene.textures.getPixel(x, y, 'logo');
                } while (pixel.alpha < 255);
                return vec.setTo(x-c.cX/2-30,y-c.cY/2-200);
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