Dialogs = {

    text: null,

    init: function () {
        var style = {font: "bold 32px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle"};
        this.text = Core.game.add.text(100, 100, "", style);
        this.text.setTextBounds(0, 0, 800, 100);
    },

    showText: function (text) {
        this.text.setText(text);
    },

    update: function () {
        this.text.x = Core.game.camera.x + Config.screenWidth / 2 / CameraManager.scale - 400;
        this.text.y = Core.game.camera.y + Config.screenHeight / 2 / CameraManager.scale - 100;
    }
};