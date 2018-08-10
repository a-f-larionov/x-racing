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
    this.speed = 0;
    /**
     * Все ли фрагменты дороги проехала машина, так мы узнаем, что она достигла финиша пройдя ВСЮ дорогу, а не часть
     * @type {{}}
     */
    let trackOverlaps = {};
    /**
     * @type {*}
     */
    this.sprite = Core.game.add.sprite(x, y, carName, carName);
    Core.game.physics.p2.enable(this.sprite);

    /**
     * Установим котроль машинкой
     * @param up Phaser.Keyboard.*
     * @param down Phaser.Keyboard.*
     * @param left Phaser.Keyboard.*
     * @param right Phaser.Keyboard.*
     */
    this.setControl = function (up, down, left, right) {
        this.control = {
            up: Core.game.input.keyboard.addKey(up),
            down: Core.game.input.keyboard.addKey(down),
            left: Core.game.input.keyboard.addKey(left),
            right: Core.game.input.keyboard.addKey(right)
        };
    };

    this.update = function () {

        if (!Core.stopControl) {
            if (this.control.up.isDown) this.speed += 10;
            if (this.control.down.isDown) this.speed -= 5;
            if (this.control.left.isDown) this.sprite.body.angularVelocity -= 0.3;
            if (this.control.right.isDown) this.sprite.body.angularVelocity += 0.3;
        }
        this.sprite.body.angularVelocity *= 0.95;
        this.speed *= 0.98;

        this.sprite.body.velocity.x = Math.cos(this.sprite.body.rotation - Math.PI / 2) * this.speed;
        this.sprite.body.velocity.y = Math.sin(this.sprite.body.rotation - Math.PI / 2) * this.speed;

        Track.checkOverlap(this.sprite, onOverlap);
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
        Core.stopControl = true;
        setTimeout(function () {
            Dialogs.showText('Игра окончена\r\r\n Обновите окно');
        }, 4000);
    };
};
CarClass.CAR_NAME_1 = 'Red car';
CarClass.CAR_NAME_2 = 'Black car';
