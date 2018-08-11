CameraManager = {

    sprite1: null,
    sprite2: null,

    scale: 1,

    followTwoSprites: function (sprite1, sprite2) {
        this.sprite1 = sprite1;
        this.sprite2 = sprite2;
    },

    update: function () {

        if (this.sprite1 && this.sprite2) {
            let scale, leftX, topY, diffX, diffY;

            leftX = Math.min(this.sprite1.x, this.sprite2.x) - 250;
            topY = Math.min(this.sprite1.y, this.sprite2.y) - 250;

            diffX = Math.abs(this.sprite1.x - this.sprite2.x) + 750;
            diffY = Math.abs(this.sprite1.y - this.sprite2.y) + 750;
            scale = Math.min((Config.screenWidth ) / diffX, (Config.screenHeight ) / diffY);

            this.scale = scale;

            Main.game.camera.scale.x = scale;
            Main.game.camera.scale.y = scale;

            Main.game.camera.x = (leftX + diffX / 2 ) * scale - 500;
            Main.game.camera.y = (topY + diffY / 2 ) * scale - 500;
        }
    }
};
