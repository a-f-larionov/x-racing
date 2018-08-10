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

            diffX = Math.abs(this.sprite1.x - this.sprite2.x) + 500;
            diffY = Math.abs(this.sprite1.y - this.sprite2.y) + 500;
            scale = Math.min((Config.screenWidth ) / diffX, (Config.screenHeight ) / diffY);

            this.scale = scale;

            Core.game.camera.scale.x = scale;
            Core.game.camera.scale.y = scale;

            Core.game.camera.x = (leftX + diffX / 2 ) * scale - 500;
            Core.game.camera.y = (topY + diffY / 2 ) * scale - 500;
        }
    }
};
