let Core = new (function () {

    let land, car1, car2;

    this.windowOnLoad = function () {
        this.game = new Phaser.Game(Config.screenWidth, Config.screenHeight, Phaser.AUTO, 'racing', {
            preload: Core.preload,
            create: Core.create,
            update: Core.update
        });
    };

    this.preload = function () {
        Core.loadImages();
    };

    /**
     * Загрузка картинок
     */
    this.loadImages = function () {
        Core.game.load.image('Black car', 'images/Cars/car_black_small_5.png');
        Core.game.load.image('Red car', 'images/Cars/car_red_small_4.png');

        Core.game.load.image('land_grass11', 'images/Tiles/Grass/land_grass11.png');

        Core.game.load.image('road_asphalt01', 'images/Tiles/Asphalt road/road_asphalt01.png');
        Core.game.load.image('road_asphalt02', 'images/Tiles/Asphalt road/road_asphalt02.png');
        Core.game.load.image('road_asphalt04', 'images/Tiles/Asphalt road/road_asphalt04.png');
        Core.game.load.image('road_asphalt08', 'images/Tiles/Asphalt road/road_asphalt08.png');
        Core.game.load.image('road_asphalt09', 'images/Tiles/Asphalt road/road_asphalt09.png');
        Core.game.load.image('road_asphalt10', 'images/Tiles/Asphalt road/road_asphalt10.png');
        Core.game.load.image('road_asphalt11', 'images/Tiles/Asphalt road/road_asphalt11.png');
        Core.game.load.image('road_asphalt21', 'images/Tiles/Asphalt road/road_asphalt21.png');
        Core.game.load.image('road_asphalt23', 'images/Tiles/Asphalt road/road_asphalt23.png');
        Core.game.load.image('road_asphalt26', 'images/Tiles/Asphalt road/road_asphalt26.png');
        Core.game.load.image('road_asphalt27', 'images/Tiles/Asphalt road/road_asphalt27.png');
        Core.game.load.image('road_asphalt28', 'images/Tiles/Asphalt road/road_asphalt28.png');
        Core.game.load.image('road_asphalt29', 'images/Tiles/Asphalt road/road_asphalt29.png');
        Core.game.load.image('road_asphalt40', 'images/Tiles/Asphalt road/road_asphalt40.png');
        Core.game.load.image('road_asphalt42', 'images/Tiles/Asphalt road/road_asphalt42.png');
        Core.game.load.image('road_asphalt43', 'images/Tiles/Asphalt road/road_asphalt43.png');
        Core.game.load.image('road_asphalt44', 'images/Tiles/Asphalt road/road_asphalt44.png');
        Core.game.load.image('road_asphalt45', 'images/Tiles/Asphalt road/road_asphalt45.png');
        Core.game.load.image('road_asphalt46', 'images/Tiles/Asphalt road/road_asphalt46.png');
        Core.game.load.image('road_asphalt47', 'images/Tiles/Asphalt road/road_asphalt47.png');
        Core.game.load.image('road_asphalt62', 'images/Tiles/Asphalt road/road_asphalt62.png');
        Core.game.load.image('road_asphalt63', 'images/Tiles/Asphalt road/road_asphalt63.png');
        Core.game.load.image('road_asphalt64', 'images/Tiles/Asphalt road/road_asphalt64.png');
        Core.game.load.image('road_asphalt65', 'images/Tiles/Asphalt road/road_asphalt65.png');
        Core.game.load.image('road_asphalt69', 'images/Tiles/Asphalt road/road_asphalt69.png');
        Core.game.load.image('road_asphalt71', 'images/Tiles/Asphalt road/road_asphalt71.png');

        Core.game.load.image('tribune_overhang_red', 'images/Objects/tribune_overhang_red.png');
    };

    /**
     * Создадим машины  и трассу
     */
    this.create = function () {

        // Включаем физику
        Core.game.physics.startSystem(Phaser.Physics.P2JS);
        Core.game.physics.p2.defaultRestitution = 0.8;
        // размеры мира
        Core.game.world.setBounds(0, 0, Config.worldWidth * 128, Config.worldHeight * 128);

        // задний фон(бэкграунд)
        land = Core.game.add.tileSprite(0, 0, Config.worldWidth * 128, Config.worldHeight * 128, 'land_grass11');
        land.fixedToCamera = true;

        // создадим трассу
        Track.build(
            TrackGenerator.generate()
        );

        // создадим машины
        car1 = new CarClass(2 * 128 - 32, 3 * 128, CarClass.CAR_NAME_1);
        car1.setControl(
            Phaser.Keyboard.W,
            Phaser.Keyboard.S,
            Phaser.Keyboard.A,
            Phaser.Keyboard.D
        );
        car2 = new CarClass(2 * 128 + 32, 3 * 128, CarClass.CAR_NAME_2);
        car2.setControl(
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN,
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT
        );

        CameraManager.followTwoSprites(car1.sprite, car2.sprite);

        // создадим диалоговый текст
        Dialogs.init();

        // покажем хелп по управлению
        let showHelp = true;

        Dialogs.showText('Управление: \r\n\r\nWASD - красная машина\r\n\r\n Стрелки - чёрная машина');
        // по нажатию любой клавиши , хелп исчезает
        Core.game.input.keyboard.onDownCallback = function (e) {
            if (showHelp) {
                Dialogs.showText('');
                showHelp = false;
            }
        }
    };

    this.update = function () {
        car1.update();
        car2.update();
        CameraManager.update();
        Dialogs.update();

        land.tilePosition.x = -Core.game.camera.x / CameraManager.scale;
        land.tilePosition.y = -Core.game.camera.y / CameraManager.scale;
    };
});
