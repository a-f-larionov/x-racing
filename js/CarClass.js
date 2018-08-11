/**
 * Класс гоночной машины
 * @param x
 * @param y
 * @param carName
 * @constructor
 */
CarClass = function (x, y, carName) {
    let self = this;

    /**
     * Имя машины
     */
    this.name = carName;
    /**
     * Скорость машины
     * @type {number}
     */
    let speed = 0;
    /**
     * Все ли фрагменты дороги проехала машина, так мы узнаем, что она достигла финиша пройдя ВСЮ дорогу, а не часть
     * @type {{}}
     */
    let trackOverlaps = {};
    /**
     * @type {*}
     */
    let sprite = Main.game.add.sprite(x, y, carName, carName);
    Main.game.physics.p2.enable(sprite);

    let control = null;

    /**
     * Установим котроль машинкой
     * @param up Phaser.Keyboard.*
     * @param down Phaser.Keyboard.*
     * @param left Phaser.Keyboard.*
     * @param right Phaser.Keyboard.*
     */
    this.setControl = function (up, down, left, right) {
        control = {
            up: Main.game.input.keyboard.addKey(up),
            down: Main.game.input.keyboard.addKey(down),
            left: Main.game.input.keyboard.addKey(left),
            right: Main.game.input.keyboard.addKey(right)
        };
    };

    this.update = function () {

        if (!Main.stopControl) {
            if (control.up.isDown) speed += 10;
            if (control.down.isDown) speed -= 5;
            if (control.left.isDown) sprite.body.angularVelocity -= 0.3;
            if (control.right.isDown) sprite.body.angularVelocity += 0.3;
        }
        sprite.body.angularVelocity *= 0.95;
        speed *= 0.98;

        sprite.body.velocity.x = Math.cos(sprite.body.rotation - Math.PI / 2) * speed;
        sprite.body.velocity.y = Math.sin(sprite.body.rotation - Math.PI / 2) * speed;

        Track.checkOverlap(sprite, onOverlap);
    };

    this.getSprite = function () {
        return sprite;
    };

    /**
     * При пересечении сегмента дороги, записываем что он пересечен
     * если персекаем финиш и пройдены все сегменты дороги - значит машина выиграла.
     * @param tile
     */
    let onOverlap = function (tile) {

        switch (tile.type) {
            case Track.TILE_TYPE_SPRITE:
                trackOverlaps[tile.segmentIndex] = true;
                break;
            case Track.TILE_TYPE_FINISH:
                let allRoad = true;
                for (let i = 0; i < Config.TrackGenerator.length; i++) {
                    if (!trackOverlaps[i]) allRoad = false;
                }
                if (allRoad) {
                    onFinish();
                }
                break;
        }
    };

    let onFinish = function () {
        Dialogs.showText(self.name + ' выграл!');
        Main.stopControl = true;
        setTimeout(function () {
            Dialogs.showText('Игра окончена\r\r\n Обновите окно');
        }, 4000);
    };
};
CarClass.CAR_NAME_1 = 'Red car';
CarClass.CAR_NAME_2 = 'Black car';
