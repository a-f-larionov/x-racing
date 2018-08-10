TrackGenerator = new (function () {
    let map;
    let track;

    let createEmptyMap = function () {
        let map = {};
        for (let y = 0; y < Config.worldHeight; y++) {
            map[y] = {};
            for (let x = 0; x < Config.worldWidth; x++) {
                map[y][x] = 0;
            }
        }
        return map;
    };

    let setStartFragment = function (track, map) {
        let segments =
            [
                {x: 0, y: 0},
                {x: 1, y: 0},
                {x: 1, y: 1},
                {x: 1, y: 2},
                {x: 0, y: 2},
                {x: 0, y: 1, dir: Track.SEGMENT_VERTICAL_DOUBLE_FINISH}
            ];

        segments.forEach(function (segment) {
            map[segment.y][segment.x] = 1;
            track.push({x: segment.x, y: segment.y, dir: segment.dir});
        });

    };
    let bloatingTrack = function (track, map, target) {
        track.splice(target.before + 1, 0, target.a);
        track.splice(target.after + 1, 0, target.b);
        map[target.a.y][target.a.x] = 1;
        map[target.b.y][target.b.x] = 1;
    };
    let findPotentialy = function (track, map) {
        let a, b, list, aI, bI;
        list = [];
        for (let i = 0; i < track.length; i++) {
            aI = i;
            bI = track[i + 1] ? i + 1 : 0;
            a = track[aI];
            b = track[bI];
            if (a.dir || b.dir)continue;
            if (a.x == b.x) {
                if (
                    map[a.y] && map[a.y][a.x - 1] == 0
                    &&
                    map[b.y] && map[b.y][b.x - 1] == 0
                ) {
                    list.push({before: aI, a: {x: a.x - 1, y: a.y}, b: {x: b.x - 1, y: b.y}, after: bI});
                }
                if (
                    map[a.y] && map[a.y][a.x + 1] == 0
                    &&
                    map[b.y] && map[b.y][b.x + 1] == 0
                ) {
                    list.push({before: aI, a: {x: a.x + 1, y: a.y}, b: {x: b.x + 1, y: b.y}, after: bI});
                }
            }
            if (a.y == b.y) {
                if (
                    map[a.y - 1] && map[a.y - 1][a.x] == 0
                    &&
                    map[b.y - 1] && map[b.y - 1][b.x] == 0
                ) {
                    list.push({before: aI, a: {x: a.x, y: a.y - 1}, b: {x: b.x, y: b.y - 1}, after: bI});
                }
                if (
                    map[a.y + 1] && map[a.y + 1][a.x] == 0
                    &&
                    map[b.y + 1] && map[b.y + 1][b.x] == 0
                ) {
                    list.push({before: aI, a: {x: a.x, y: a.y + 1}, b: {x: b.x, y: b.y + 1}, after: bI});
                }
            }
        }
        return list;
    };
    let setDirections = function (track) {
        let a, b, c, dir;
        let ABx, ABy, CBx, CBy;
        let dirs;
        dirs = [

            {ABx: -1, ABy: +0, CBx: +1, CBy: +0, dir: Track.SEGMENT_HORIZONTAL_DOUBLE},
            {ABx: +1, ABy: +0, CBx: -1, CBy: +0, dir: Track.SEGMENT_HORIZONTAL_DOUBLE},
            {ABx: +0, ABy: -1, CBx: +0, CBy: +1, dir: Track.SEGMENT_VERTICAL_DOUBLE},
            {ABx: +0, ABy: +1, CBx: +0, CBy: -1, dir: Track.SEGMENT_VERTICAL_DOUBLE},

            {ABx: -1, ABy: +0, CBx: +0, CBy: +1, dir: Track.SEGMENT_LEFT_TO_DOWN},
            {ABx: +0, ABy: -1, CBx: -1, CBy: +0, dir: Track.SEGMENT_UP_TO_LEFT},
            {ABx: +1, ABy: +0, CBx: +0, CBy: -1, dir: Track.SEGMENT_RIGHT_TO_UP},
            {ABx: +0, ABy: +1, CBx: +1, CBy: +0, dir: Track.SEGMENT_DOWN_TO_RIGHT},

            {ABx: +0, ABy: +1, CBx: -1, CBy: +0, dir: Track.SEGMENT_LEFT_TO_DOWN},
            {ABx: -1, ABy: +0, CBx: +0, CBy: -1, dir: Track.SEGMENT_UP_TO_LEFT},
            {ABx: +0, ABy: -1, CBx: +1, CBy: +0, dir: Track.SEGMENT_RIGHT_TO_UP},
            {ABx: +1, ABy: +0, CBx: +0, CBy: +1, dir: Track.SEGMENT_DOWN_TO_RIGHT},

            {ABx: +0, ABy: +0, CBx: +0, CBy: -1, dir: Track.SEGMENT_VERTICAL_DOUBLE},
            {ABx: +0, ABy: +0, CBx: +1, CBy: +0, dir: Track.SEGMENT_HORIZONTAL_DOUBLE},
            {ABx: +0, ABy: +0, CBx: +0, CBy: +1, dir: Track.SEGMENT_VERTICAL_DOUBLE},
            {ABx: +0, ABy: +0, CBx: -1, CBy: +0, dir: Track.SEGMENT_HORIZONTAL_DOUBLE},

            {ABx: +0, ABy: -1, CBx: +0, CBy: +0, dir: Track.SEGMENT_VERTICAL_DOUBLE},
            {ABx: +1, ABy: +0, CBx: +0, CBy: +0, dir: Track.SEGMENT_HORIZONTAL_DOUBLE},
            {ABx: +0, ABy: +1, CBx: +0, CBy: +0, dir: Track.SEGMENT_VERTICAL_DOUBLE},
            {ABx: -1, ABy: +0, CBx: +0, CBy: +0, dir: Track.SEGMENT_HORIZONTAL_DOUBLE}

        ];
        for (let i = 0; i < track.length; i++) {

            if (track[i].dir)continue;
            a = track[i - 1] ? track[i - 1] : track[track.length - 1];
            b = track[i];
            c = track[i + 1] ? track[i + 1] : track[0];

            dir = Track.SEGMENT_VERTICAL_FINISH;

            ABx = a.x - b.x;
            ABy = a.y - b.y;
            CBx = c.x - b.x;
            CBy = c.y - b.y;

            for (let d in dirs) {
                if (dirs[d].ABx == ABx && dirs[d].ABy == ABy && dirs[d].CBx == CBx && dirs[d].CBy == CBy) {
                    dir = dirs[d].dir;
                }
            }

            track[i].dir = dir;
        }
    };
    this.generate = function () {
        let track, map, list, len;

        len = Config.TrackGenerator.length;
        track = [];
        map = createEmptyMap();
        setStartFragment(track, map);
        len -= track.length;
        for (let i = 0; i < len; i += 2) {
            list = findPotentialy(track, map);
            bloatingTrack(track, map, list[Math.floor(Math.random() * list.length)]);
        }

        setDirections(track);

        return track;
    };
});
