TrackClass = function () {

    /**
     * тут будет хранится трасса
     * @type {Array}
     */
    this.track = [];

    /**
     * Объекты для проверки пересечения(intersects)
     * @type {Array}
     */
    this.overlaps = [];

    // константы тайлов - это часть дороги, её блоки и т.д.
    this.TILE_HORIZONTAL_UP = 2;
    this.TILE_HORIZONTAL_DOWN = 3;

    this.TILE_VERTICAL_LEFT = 4;
    this.TILE_VERTICAL_RIGHT = 5;

    this.TILE_LEFT_TO_DOWN_1 = 6;
    this.TILE_LEFT_TO_DOWN_2 = 7;
    this.TILE_LEFT_TO_DOWN_3 = 8;
    this.TILE_LEFT_TO_DOWN_4 = 9;

    this.TILE_UP_TO_LEFT_1 = 10;
    this.TILE_UP_TO_LEFT_2 = 11;
    this.TILE_UP_TO_LEFT_3 = 12;
    this.TILE_UP_TO_LEFT_4 = 13;

    this.TILE_RIGHT_TO_UP_1 = 14;
    this.TILE_RIGHT_TO_UP_2 = 15;
    this.TILE_RIGHT_TO_UP_3 = 16;
    this.TILE_RIGHT_TO_UP_4 = 17;

    this.TILE_DOWN_TO_RIGHT_1 = 18;
    this.TILE_DOWN_TO_RIGHT_2 = 19;
    this.TILE_DOWN_TO_RIGHT_3 = 20;
    this.TILE_DOWN_TO_RIGHT_4 = 21;

    this.TILE_VERTICAL_LEFT_FINISH = 22;
    this.TILE_VERTICAL_RIGHT_FINISH = 23;

    // константы сегментов - группы тайлов
    this.SEGMENT_HORIZONTAL = 1;
    this.SEGMENT_VERTICAL = 2;
    this.SEGMENT_HORIZONTAL_DOUBLE = 101;
    this.SEGMENT_VERTICAL_DOUBLE = 102;

    this.SEGMENT_LEFT_TO_DOWN = 3;
    this.SEGMENT_UP_TO_LEFT = 4;
    this.SEGMENT_RIGHT_TO_UP = 5;
    this.SEGMENT_DOWN_TO_RIGHT = 6;

    this.SEGMENT_VERTICAL_FINISH = 7;
    this.SEGMENT_VERTICAL_DOUBLE_FINISH = 8;

    // картинки тайлов
    this.tileImages = {};
    this.tileImages[this.TILE_HORIZONTAL_UP] = 'road_asphalt04';
    this.tileImages[this.TILE_HORIZONTAL_DOWN] = 'road_asphalt40';
    this.tileImages[this.TILE_VERTICAL_LEFT] = 'road_asphalt21';
    this.tileImages[this.TILE_VERTICAL_RIGHT] = 'road_asphalt23';
    this.tileImages[this.TILE_LEFT_TO_DOWN_1] = 'road_asphalt10';
    this.tileImages[this.TILE_LEFT_TO_DOWN_2] = 'road_asphalt11';
    this.tileImages[this.TILE_LEFT_TO_DOWN_3] = 'road_asphalt28';
    this.tileImages[this.TILE_LEFT_TO_DOWN_4] = 'road_asphalt29';
    this.tileImages[this.TILE_UP_TO_LEFT_1] = 'road_asphalt46';
    this.tileImages[this.TILE_UP_TO_LEFT_2] = 'road_asphalt47';
    this.tileImages[this.TILE_UP_TO_LEFT_3] = 'road_asphalt64';
    this.tileImages[this.TILE_UP_TO_LEFT_4] = 'road_asphalt65';
    this.tileImages[this.TILE_RIGHT_TO_UP_1] = 'road_asphalt44';
    this.tileImages[this.TILE_RIGHT_TO_UP_2] = 'road_asphalt45';
    this.tileImages[this.TILE_RIGHT_TO_UP_3] = 'road_asphalt62';
    this.tileImages[this.TILE_RIGHT_TO_UP_4] = 'road_asphalt63';
    this.tileImages[this.TILE_DOWN_TO_RIGHT_1] = 'road_asphalt08';
    this.tileImages[this.TILE_DOWN_TO_RIGHT_2] = 'road_asphalt09';
    this.tileImages[this.TILE_DOWN_TO_RIGHT_3] = 'road_asphalt26';
    this.tileImages[this.TILE_DOWN_TO_RIGHT_4] = 'road_asphalt27';
    this.tileImages[this.TILE_VERTICAL_LEFT_FINISH] = 'road_asphalt69';
    this.tileImages[this.TILE_VERTICAL_RIGHT_FINISH] = 'road_asphalt71';

    // типы : 1 - спрайт, 2 - препятствие, 3 - финиш
    this.TILE_TYPE_SPRITE = 1;
    this.TILE_TYPE_BLOCK = 2;
    this.TILE_TYPE_FINISH = 3;

    // шаблоны тайлов: т.е. например спрайт тайла и препятсвия
    this.tileTmpls = {};

    this.tileTmpls[this.TILE_HORIZONTAL_UP] = [
        {t: this.TILE_TYPE_SPRITE, x: 0, y: 0, w: 128, h: 128, a: 0, src: this.tileImages[this.TILE_HORIZONTAL_UP]},
        {t: this.TILE_TYPE_BLOCK, x: 0, y: 0, w: 128, h: 22, a: 0}
    ];
    this.tileTmpls[this.TILE_HORIZONTAL_DOWN] = [
        {t: this.TILE_TYPE_SPRITE, x: 0, y: 0, w: 128, h: 128, a: 0, src: this.tileImages[this.TILE_HORIZONTAL_DOWN]},
        {t: this.TILE_TYPE_BLOCK, x: 0, y: 128 - 22, w: 128, h: 22, a: 0}
    ];
    this.tileTmpls[this.TILE_VERTICAL_LEFT] = [
        {t: this.TILE_TYPE_SPRITE, x: 0, y: 0, w: 128, h: 128, a: 0, src: this.tileImages[this.TILE_VERTICAL_LEFT]},
        {t: this.TILE_TYPE_BLOCK, x: 0, y: 0, w: 22, h: 128, a: 0}
    ];
    this.tileTmpls[this.TILE_VERTICAL_RIGHT] = [
        {t: this.TILE_TYPE_SPRITE, x: 0, y: 0, w: 128, h: 128, a: 0, src: this.tileImages[this.TILE_VERTICAL_RIGHT]},
        {t: this.TILE_TYPE_BLOCK, x: 128 - 22, y: 0, w: 22, h: 128, a: 0}
    ];
    this.tileTmpls[this.TILE_LEFT_TO_DOWN_1] = [
        {t: this.TILE_TYPE_SPRITE, x: 0, y: 0, w: 128, h: 128, a: 0, src: this.tileImages[this.TILE_LEFT_TO_DOWN_1]},
        {t: this.TILE_TYPE_BLOCK, x: 0, y: 12, w: 128, h: 22, a: 15}
    ];
    this.tileTmpls[this.TILE_LEFT_TO_DOWN_2] = [
        {t: this.TILE_TYPE_SPRITE, x: 0, y: 0, w: 128, h: 128, a: 0, src: this.tileImages[this.TILE_LEFT_TO_DOWN_2]},
        {t: this.TILE_TYPE_BLOCK, x: -30, y: 75, w: 150, h: 22, a: 45}
    ];
    this.tileTmpls[this.TILE_LEFT_TO_DOWN_3] = [
        {t: this.TILE_TYPE_SPRITE, x: 0, y: 0, w: 128, h: 128, a: 0, src: this.tileImages[this.TILE_LEFT_TO_DOWN_3]},
        {t: this.TILE_TYPE_BLOCK, x: 0, y: 128 - 22, w: 22, h: 22, a: 0}
    ];
    this.tileTmpls[this.TILE_LEFT_TO_DOWN_4] = [
        {t: this.TILE_TYPE_SPRITE, x: 0, y: 0, w: 128, h: 128, a: 0, src: this.tileImages[this.TILE_LEFT_TO_DOWN_4]},
        {t: this.TILE_TYPE_BLOCK, x: 90, y: 0, w: 22, h: 128, a: -15}
    ];
    // up to left
    this.tileTmpls[this.TILE_UP_TO_LEFT_1] = [
        {t: this.TILE_TYPE_SPRITE, x: 0, y: 0, w: 128, h: 128, a: 0, src: this.tileImages[this.TILE_UP_TO_LEFT_1]},
        {t: this.TILE_TYPE_BLOCK, x: 0, y: 0, w: 22, h: 22, a: 0}
    ];
    this.tileTmpls[this.TILE_UP_TO_LEFT_2] = [
        {t: this.TILE_TYPE_SPRITE, x: 0, y: 0, w: 128, h: 128, a: 0, src: this.tileImages[this.TILE_UP_TO_LEFT_2]},
        {t: this.TILE_TYPE_BLOCK, x: 100, y: 0, w: 22, h: 128, a: 15}
    ];
    this.tileTmpls[this.TILE_UP_TO_LEFT_3] = [
        {t: this.TILE_TYPE_SPRITE, x: 0, y: 0, w: 128, h: 128, a: 0, src: this.tileImages[this.TILE_UP_TO_LEFT_3]},
        {t: this.TILE_TYPE_BLOCK, x: 30, y: 45, w: 22, h: 128, a: 75}
    ];
    this.tileTmpls[this.TILE_UP_TO_LEFT_4] = [
        {t: this.TILE_TYPE_SPRITE, x: 0, y: 0, w: 128, h: 128, a: 0, src: this.tileImages[this.TILE_UP_TO_LEFT_4]},
        {t: this.TILE_TYPE_BLOCK, x: 30, y: -10, w: 22, h: 128, a: 45}
    ];
    // right to up
    this.tileTmpls[this.TILE_RIGHT_TO_UP_1] = [
        {t: this.TILE_TYPE_SPRITE, x: 0, y: 0, w: 128, h: 128, a: 0, src: this.tileImages[this.TILE_RIGHT_TO_UP_1]},
        {t: this.TILE_TYPE_BLOCK, x: 12, y: 0, w: 22, h: 128, a: -15}
    ];
    this.tileTmpls[this.TILE_RIGHT_TO_UP_2] = [
        {t: this.TILE_TYPE_SPRITE, x: 0, y: 0, w: 128, h: 128, a: 0, src: this.tileImages[this.TILE_RIGHT_TO_UP_2]},
        {t: this.TILE_TYPE_BLOCK, x: 128 - 22, y: 0, w: 22, h: 22, a: 0}
    ];
    this.tileTmpls[this.TILE_RIGHT_TO_UP_3] = [
        {t: this.TILE_TYPE_SPRITE, x: 0, y: 0, w: 128, h: 128, a: 0, src: this.tileImages[this.TILE_RIGHT_TO_UP_3]},
        {t: this.TILE_TYPE_BLOCK, x: 70, y: -15, w: 22, h: 128, a: -45}
    ];
    this.tileTmpls[this.TILE_RIGHT_TO_UP_4] = [
        {t: this.TILE_TYPE_SPRITE, x: 0, y: 0, w: 128, h: 128, a: 0, src: this.tileImages[this.TILE_RIGHT_TO_UP_4]},
        {t: this.TILE_TYPE_BLOCK, x: 50, y: 45, w: 22, h: 128, a: -75}
    ];
    // downt to right
    this.tileTmpls[this.TILE_DOWN_TO_RIGHT_1] = [
        {t: this.TILE_TYPE_SPRITE, x: 0, y: 0, w: 128, h: 128, a: 0, src: this.tileImages[this.TILE_DOWN_TO_RIGHT_1]},
        {t: this.TILE_TYPE_BLOCK, x: 80, y: 5, w: 22, h: 128, a: 45}
    ];
    this.tileTmpls[this.TILE_DOWN_TO_RIGHT_2] = [
        {t: this.TILE_TYPE_SPRITE, x: 0, y: 0, w: 128, h: 128, a: 0, src: this.tileImages[this.TILE_DOWN_TO_RIGHT_2]},
        {t: this.TILE_TYPE_BLOCK, x: 0, y: 10, w: 128, h: 22, a: -15}
    ];
    this.tileTmpls[this.TILE_DOWN_TO_RIGHT_3] = [
        {t: this.TILE_TYPE_SPRITE, x: 0, y: 0, w: 128, h: 128, a: 0, src: this.tileImages[this.TILE_DOWN_TO_RIGHT_3]},
        {t: this.TILE_TYPE_BLOCK, x: 10, y: 0, w: 22, h: 128, a: 15}
    ];
    this.tileTmpls[this.TILE_DOWN_TO_RIGHT_4] = [
        {t: this.TILE_TYPE_SPRITE, x: 0, y: 0, w: 128, h: 128, a: 0, src: this.tileImages[this.TILE_DOWN_TO_RIGHT_4]},
        {t: this.TILE_TYPE_BLOCK, x: 128 - 22, y: 128 - 22, w: 22, h: 22, a: 0}
    ];
    this.tileTmpls[this.TILE_VERTICAL_LEFT_FINISH] = [
        {
            t: this.TILE_TYPE_SPRITE,
            x: 0,
            y: 0,
            w: 128,
            h: 128,
            a: 0,
            src: this.tileImages[this.TILE_VERTICAL_LEFT_FINISH]
        },
        {t: this.TILE_TYPE_BLOCK, x: 0, y: 0, w: 22, h: 128, a: 0},
        {t: this.TILE_TYPE_FINISH, x: 0, y: 64 - 11, w: 128, h: 20, a: 0}
    ];
    this.tileTmpls[this.TILE_VERTICAL_RIGHT_FINISH] = [
        {
            t: this.TILE_TYPE_SPRITE,
            x: 0,
            y: 0,
            w: 128,
            h: 128,
            a: 0,
            src: this.tileImages[this.TILE_VERTICAL_RIGHT_FINISH]
        },
        {t: this.TILE_TYPE_BLOCK, x: 128 - 22, y: 0, w: 22, h: 128, a: 0},
        {t: this.TILE_TYPE_FINISH, x: 0, y: 64 - 11, w: 128, h: 20, a: 0}
    ];

    // шаблоны сегментов
    this.segmentTmpls = {};
    this.segmentTmpls[this.SEGMENT_HORIZONTAL] = [
        {tileId: this.TILE_HORIZONTAL_UP, x: 0, y: 0},
        {tileId: this.TILE_HORIZONTAL_DOWN, x: 0, y: 1},
    ];
    this.segmentTmpls[this.SEGMENT_VERTICAL] = [
        {tileId: this.TILE_VERTICAL_LEFT, x: 0, y: 0},
        {tileId: this.TILE_VERTICAL_RIGHT, x: 1, y: 0}
    ];
    this.segmentTmpls[this.SEGMENT_VERTICAL_DOUBLE] = [
        {tileId: this.TILE_VERTICAL_LEFT, x: 0, y: 0},
        {tileId: this.TILE_VERTICAL_RIGHT, x: 1, y: 0},
        {tileId: this.TILE_VERTICAL_LEFT, x: 0, y: 1},
        {tileId: this.TILE_VERTICAL_RIGHT, x: 1, y: 1}
    ];
    this.segmentTmpls[this.SEGMENT_HORIZONTAL_DOUBLE] = [
        {tileId: this.TILE_HORIZONTAL_UP, x: 0, y: 0},
        {tileId: this.TILE_HORIZONTAL_DOWN, x: 0, y: 1},
        {tileId: this.TILE_HORIZONTAL_UP, x: 1, y: 0},
        {tileId: this.TILE_HORIZONTAL_DOWN, x: 1, y: 1}
    ];
    this.segmentTmpls[this.SEGMENT_LEFT_TO_DOWN] = [
        {tileId: this.TILE_LEFT_TO_DOWN_1, x: 0, y: 0},
        {tileId: this.TILE_LEFT_TO_DOWN_2, x: 1, y: 0},
        {tileId: this.TILE_LEFT_TO_DOWN_3, x: 0, y: 1},
        {tileId: this.TILE_LEFT_TO_DOWN_4, x: 1, y: 1}
    ];
    this.segmentTmpls[this.SEGMENT_UP_TO_LEFT] = [
        {tileId: this.TILE_UP_TO_LEFT_1, x: 0, y: 0},
        {tileId: this.TILE_UP_TO_LEFT_2, x: 1, y: 0},
        {tileId: this.TILE_UP_TO_LEFT_3, x: 0, y: 1},
        {tileId: this.TILE_UP_TO_LEFT_4, x: 1, y: 1}
    ];
    this.segmentTmpls[this.SEGMENT_RIGHT_TO_UP] = [
        {tileId: this.TILE_RIGHT_TO_UP_1, x: 0, y: 0},
        {tileId: this.TILE_RIGHT_TO_UP_2, x: 1, y: 0},
        {tileId: this.TILE_RIGHT_TO_UP_3, x: 0, y: 1},
        {tileId: this.TILE_RIGHT_TO_UP_4, x: 1, y: 1}
    ];
    this.segmentTmpls[this.SEGMENT_DOWN_TO_RIGHT] = [
        {tileId: this.TILE_DOWN_TO_RIGHT_1, x: 0, y: 0},
        {tileId: this.TILE_DOWN_TO_RIGHT_2, x: 1, y: 0},
        {tileId: this.TILE_DOWN_TO_RIGHT_3, x: 0, y: 1},
        {tileId: this.TILE_DOWN_TO_RIGHT_4, x: 1, y: 1}
    ];
    this.segmentTmpls[this.SEGMENT_VERTICAL_FINISH] = [
        {tileId: this.TILE_VERTICAL_LEFT_FINISH, x: 0, y: 0},
        {tileId: this.TILE_VERTICAL_RIGHT_FINISH, x: 1, y: 0}
    ];
    this.segmentTmpls[this.SEGMENT_VERTICAL_DOUBLE_FINISH] = [
        {tileId: this.TILE_VERTICAL_LEFT_FINISH, x: 0, y: 0},
        {tileId: this.TILE_VERTICAL_RIGHT_FINISH, x: 1, y: 0},
        {tileId: this.TILE_VERTICAL_LEFT, x: 0, y: 1},
        {tileId: this.TILE_VERTICAL_RIGHT, x: 1, y: 1}
    ];

    /**
     * Построить дорогу из массива
     * @param track
     */
    this.build = function (track) {
        track.forEach(function (segment, i) {
            Track.addSegment(
                segment.dir,
                segment.x * 2 + 1,
                segment.y * 2 + 1,
                i);
        });

        this.drawTrack();
    };

    this.addSegment = function (id, x, y, segmentIndex) {

        this.segmentTmpls[id].forEach(function (seg) {
            Track.addTile(seg.tileId, x + seg.x, y + seg.y, segmentIndex);
        });
    };

    this.addTile = function (id, x, y, segmentIndex) {
        this.track.push({
            id: id,
            x: x,
            y: y,
            segmentIndex: segmentIndex,
            sprite: null,
            blocks: []
        })
    };

    this.drawTile = function (tile, i) {
        let tpl, sprite, x, y, s, r, alpha;
        alpha = 0.0;
        if (this.tileTmpls[tile.id] == undefined) {
            console.log("no tile data", tile);
        }
        for (let e in this.tileTmpls[tile.id]) {
            tpl = this.tileTmpls[tile.id][e];
            sprite = null;

            switch (tpl.t) {
                case 1:
                    sprite = Main.game.add.sprite(tile.x * 128 + tpl.x, tile.y * 128 + tpl.y, tpl.src);
                    sprite.angle = tpl.a;
                    tile.sprite = sprite;
                    Track.overlaps.push({sprite: sprite, type: tpl.t, segmentIndex: tile.segmentIndex});
                    break;
                case 2:
                    x = tile.x * 128 + tpl.x + tpl.w / 2;
                    y = tile.y * 128 + tpl.y + tpl.h / 2;
                    sprite = Main.game.add.sprite(x, y, "tribune_overhang_red");
                    sprite.width = tpl.w;
                    sprite.height = tpl.h;
                    sprite.alpha = alpha;
                    Main.game.physics.p2.enable(sprite);
                    sprite.body.static = true;
                    sprite.body.angle = tpl.a;
                    break;
                case 3:
                    x = tile.x * 128 + tpl.x;
                    y = tile.y * 128 + tpl.y;
                    sprite = Main.game.add.sprite(x, y, "tribune_overhang_red");
                    sprite.width = tpl.w;
                    sprite.height = tpl.h;
                    sprite.alpha = alpha;
                    Track.overlaps.push({sprite: sprite, type: tpl.t});
                    break;
            }
        }
    };

    this.drawTrack = function () {
        let tile;
        for (let t in this.track) {
            tile = this.track[t];
            this.drawTile(tile, t);
        }
    };

    this.checkOverlap = function (spriteA, callback) {
        let spriteB;
        this.overlaps.forEach(function (tile) {
            spriteB = tile.sprite;
            var boundsA = spriteA.getBounds();
            var boundsB = spriteB.getBounds();

            if (Phaser.Rectangle.intersects(boundsA, boundsB)) {
                callback.call(null, tile);
            }
        });
    }
};

Track = new TrackClass();