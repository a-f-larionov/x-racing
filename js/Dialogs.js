/**
 * Управление "диалогами" будет тут, это тексты на весь экран и т.д.
 * @type {{text: null, init: Dialogs.init, showText: Dialogs.showText, update: Dialogs.update}}
 */
Dialogs = {

    text: null,

    init: function () {
        var style = {font: "bold 32px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle"};
        this.text = Main.game.add.text(100, 100, "", style);
        this.text.setTextBounds(0, 0, 800, 100);
    },

    showText: function (text) {
        this.text.setText(text);
    },

    update: function () {
        this.text.x = Main.game.camera.x + Config.screenWidth / 2 / CameraManager.scale - 400;
        this.text.y = Main.game.camera.y + Config.screenHeight / 2 / CameraManager.scale - 100;
    }
};