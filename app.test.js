'use strict';

const fs = require('fs'); 
const fsp = require('fs').promises;
const path = require('path');
const request = require('supertest');
const app = require('./app');

describe('Test the heartbeat for checking when the server goes down', () => {
    test('GET /heartbeat succeeds', () => {
        return request(app)
	    .get('/heartbeat')
	    .expect(200);
    });
    test('GET heartbeat returns JSON', () => {
        return request(app)
	    .get('/heartbeat')
        .expect('Content-type', /json/);
    });
});

describe('Test the carousel functionality', () => {
    test('GET /carouselinfo succeeds', () => {
        return request(app)
	    .get('/carouselinfo')
	    .expect(200);
    });

    test('GET carouselinfo returns JSON', () => {
        return request(app)
	    .get('/carouselinfo')
        .expect('Content-type', /json/);
    });

    test('GET /carouselimage/1 succeeds', () => {
        return request(app)
            .get('/carouselimage/1')
            .expect(200);
    });

    test('GET /carouselimage/1 returns an image', () => {
        return request(app)
            .get('/carouselimage/1')
            .expect(200)
            .expect('Content-Type', /image\/jpeg/);
    });

    test('GET /carouselimage/2 succeeds', () => {
        return request(app)
            .get('/carouselimage/2')
            .expect(200);
    });

    test('GET /carouselimage/2 returns an image', () => {
        return request(app)
            .get('/carouselimage/2')
            .expect(200)
            .expect('Content-Type', /image\/jpeg/);
    });

    test('GET /carouselimage/3 succeeds', () => {
        return request(app)
            .get('/carouselimage/3')
            .expect(200);
    });

    test('GET /carouselimage/3 returns an image', () => {
        return request(app)
            .get('/carouselimage/3')
            .expect(200)
            .expect('Content-Type', /image\/jpeg/);
    });

    test('GET /carouselimage/4 succeeds', () => {
        return request(app)
            .get('/carouselimage/4')
            .expect(200);
    });

    test('GET /carouselimage/4 returns an image', () => {
        return request(app)
            .get('/carouselimage/4')
            .expect(200)
            .expect('Content-Type', /image\/jpeg/);
    });

    test('GET /carouselimage/5 succeeds', () => {
        return request(app)
            .get('/carouselimage/5')
            .expect(200);
    });

    test('GET /carouselimage/5 returns an image', () => {
        return request(app)
            .get('/carouselimage/5')
            .expect(200)
            .expect('Content-Type', /image\/jpeg/);
    });

    test('GET /carouselimage/ returns an error when nothing specified', () => {
        return request(app)
            .get('/carouselimage/')
            .expect(404);
    });

    test('GET /carouselimage/ returns an error when a non-integer is specified', () => {
        return request(app)
            .get('/carouselimage/abc')
            .expect(400);
    });
});

describe('Test the painting thumbnail functionality', () => {
    test('GET /paintingthumbnail/1 succeeds', () => {
        return request(app)
            .get('/paintingthumbnail/1')
            .expect(200);
    });

    test('GET /paintingthumbnail/1 returns an image', () => {
        return request(app)
            .get('/paintingthumbnail/1')
            .expect(200)
            .expect('Content-Type', /image\/jpeg/);
    });

    test('GET /paintingthumbnail/2 succeeds', () => {
        return request(app)
            .get('/paintingthumbnail/2')
            .expect(200);
    });

    test('GET /paintingthumbnail/2 returns an image', () => {
        return request(app)
            .get('/paintingthumbnail/2')
            .expect(200)
            .expect('Content-Type', /image\/jpeg/);
    });

    test('GET /paintingthumbnail/3 succeeds', () => {
        return request(app)
            .get('/paintingthumbnail/3')
            .expect(200);
    });

    test('GET /paintingthumbnail/3 returns an image', () => {
        return request(app)
            .get('/paintingthumbnail/3')
            .expect(200)
            .expect('Content-Type', /image\/jpeg/);
    });

    test('GET /paintingthumbnail/4 succeeds', () => {
        return request(app)
            .get('/paintingthumbnail/4')
            .expect(200);
    });

    test('GET /paintingthumbnail/4 returns an image', () => {
        return request(app)
            .get('/paintingthumbnail/4')
            .expect(200)
            .expect('Content-Type', /image\/jpeg/);
    });

    test('GET /paintingthumbnail/5 succeeds', () => {
        return request(app)
            .get('/paintingthumbnail/5')
            .expect(200);
    });

    test('GET /paintingthumbnail/5 returns an image', () => {
        return request(app)
            .get('/carouselimage/5')
            .expect(200)
            .expect('Content-Type', /image\/jpeg/);
    });

    test('GET /paintingthumbnail/6 succeeds', () => {
        return request(app)
            .get('/paintingthumbnail/6')
            .expect(200);
    });

    test('GET /paintingthumbnail/6 returns an image', () => {
        return request(app)
            .get('/paintingthumbnail/6')
            .expect(200)
            .expect('Content-Type', /image\/jpeg/);
    });

    test('GET /paintingthumbnail/7 succeeds', () => {
        return request(app)
            .get('/paintingthumbnail/7')
            .expect(200);
    });

    test('GET /paintingthumbnail/7 returns an image', () => {
        return request(app)
            .get('/paintingthumbnail/7')
            .expect(200)
            .expect('Content-Type', /image\/jpeg/);
    });

    test('GET /paintingthumbnail/8 succeeds', () => {
        return request(app)
            .get('/paintingthumbnail/8')
            .expect(200);
    });

    test('GET /paintingthumbnail/8 returns an image', () => {
        return request(app)
            .get('/paintingthumbnail/8')
            .expect(200)
            .expect('Content-Type', /image\/jpeg/);
    });

    test('GET /paintingthumbnail/9 succeeds', () => {
        return request(app)
            .get('/paintingthumbnail/9')
            .expect(200);
    });

    test('GET /paintingthumbnail/9 returns an image', () => {
        return request(app)
            .get('/paintingthumbnail/9')
            .expect(200)
            .expect('Content-Type', /image\/jpeg/);
    });

    test('GET /paintingthumbnail/10 succeeds', () => {
        return request(app)
            .get('/paintingthumbnail/10')
            .expect(200);
    });

    test('GET /paintingthumbnail/10 returns an image', () => {
        return request(app)
            .get('/paintingthumbnail/10')
            .expect(200)
            .expect('Content-Type', /image\/jpeg/);
    });

    test('GET /paintingthumbnail/11 succeeds', () => {
        return request(app)
            .get('/paintingthumbnail/11')
            .expect(200);
    });

    test('GET /paintingthumbnail/11 returns an image', () => {
        return request(app)
            .get('/paintingthumbnail/11')
            .expect(200)
            .expect('Content-Type', /image\/jpeg/);
    });

    test('GET /paintingthumbnail/12 succeeds', () => {
        return request(app)
            .get('/paintingthumbnail/12')
            .expect(200);
    });

    test('GET /paintingthumbnail/12 returns an image', () => {
        return request(app)
            .get('/paintingthumbnail/12')
            .expect(200)
            .expect('Content-Type', /image\/jpeg/);
    });

    test('GET /paintingthumbnail/13 succeeds', () => {
        return request(app)
            .get('/paintingthumbnail/13')
            .expect(200);
    });

    test('GET /paintingthumbnail/13 returns an image', () => {
        return request(app)
            .get('/paintingthumbnail/13')
            .expect(200)
            .expect('Content-Type', /image\/jpeg/);
    });

    test('GET /paintingthumbnail/14 succeeds', () => {
        return request(app)
            .get('/paintingthumbnail/14')
            .expect(200);
    });

    test('GET /paintingthumbnail/15 returns an image', () => {
        return request(app)
            .get('/paintingthumbnail/15')
            .expect(200)
            .expect('Content-Type', /image\/jpeg/);
    });

    test('GET /paintingthumbnail/15 returns an image', () => {
        return request(app)
            .get('/paintingthumbnail/15')
            .expect(200)
            .expect('Content-Type', /image\/jpeg/);
    });

    test('GET /paintingthumbnail/ returns an error when nothing specified', () => {
        return request(app)
            .get('/paintingthumbnail/')
            .expect(404);
    });

    test('GET /carouselimage/ returns an error when a non-integer is specified', () => {
        return request(app)
            .get('/paintingthumbnail/abc')
            .expect(400);
    });
});

describe('Test the functionality to list all the artists', () => {
    test('GET /artists succeeds', () => {
        return request(app)
	    .get('/artists')
	    .expect(200);
    });
    test('GET artists returns JSON', () => {
        return request(app)
	    .get('/artists')
        .expect('Content-type', /json/);
    });
});

describe('Test the functionality to list all the paintings', () => {
    test('GET /paintings succeeds', () => {
        return request(app)
	    .get('/paintings')
	    .expect(200);
    });
    test('GET paintings returns JSON', () => {
        return request(app)
	    .get('/paintings')
        .expect('Content-type', /json/);
    });
});

describe('Test the functionality for the paintings dropdown', () => {
    test('GET /artistsdropdown succeeds', () => {
        return request(app)
	    .get('/artistsdropdown')
	    .expect(200);
    });
    test('GET paintingsdropdown returns JSON', () => {
        return request(app)
	    .get('/artistsdropdown')
        .expect('Content-type', /json/);
    });
});

describe('Test the functionality for the artists dropdown', () => {
    test('GET /artistsdropdown succeeds', () => {
        return request(app)
	    .get('/artistsdropdown')
	    .expect(200);
    });
    test('GET paintingsdropdown returns JSON', () => {
        return request(app)
	    .get('/artistsdropdown')
        .expect('Content-type', /json/);
    });
});

describe('Test the functionality for the artists dropdown', () => {
    test('GET /artistsdropdown succeeds', () => {
        return request(app)
	    .get('/artistsdropdown')
	    .expect(200);
    });
    test('GET paintingsdropdown returns JSON', () => {
        return request(app)
	    .get('/artistsdropdown')
        .expect('Content-type', /json/);
    });
});

describe('Test the functionality to list artists details', () => {
    test('GET /details succeeds', () => {
        return request(app)
	    .get('/details')
	    .expect(200);
    });
    test('GET details returns JSON', () => {
        return request(app)
	    .get('/details')
        .expect('Content-type', /json/);
    });
});

describe('Test the functionality to list painting details', () => {
    test('GET /paintingdetails succeeds', () => {
        return request(app)
	    .get('/paintingdetails')
	    .expect(200);
    });
    test('GET paintingdetails returns JSON', () => {
        return request(app)
	    .get('/paintingdetails')
        .expect('Content-type', /json/);
    });
});

describe('Test the functionality for grabbing images when the user requests more details.', () => {
    test('GET /image/1 succeeds', () => {
        return request(app)
            .get('/image/1')
            .expect(200);
    });

    test('GET /image/1 returns an image', () => {
        return request(app)
            .get('/image/1')
            .expect(200)
            .expect('Content-Type', /image\/jpeg/);
    });

    test('GET /image/2 succeeds', () => {
        return request(app)
            .get('/image/2')
            .expect(200);
    });

    test('GET /image/2 returns an image', () => {
        return request(app)
            .get('/image/2')
            .expect(200)
            .expect('Content-Type', /image\/jpeg/);
    });

    test('GET /image/3 succeeds', () => {
        return request(app)
            .get('/image/3')
            .expect(200);
    });

    test('GET /image/3 returns an image', () => {
        return request(app)
            .get('/image/3')
            .expect(200)
            .expect('Content-Type', /image\/jpeg/);
    });

    test('GET /image/4 succeeds', () => {
        return request(app)
            .get('/image/4')
            .expect(200);
    });

    test('GET /image/4 returns an image', () => {
        return request(app)
            .get('/image/4')
            .expect(200)
            .expect('Content-Type', /image\/jpeg/);
    });

    test('GET /image/5 succeeds', () => {
        return request(app)
            .get('/image/5')
            .expect(200);
    });

    test('GET /image/5 returns an image', () => {
        return request(app)
            .get('/image/5')
            .expect(200)
            .expect('Content-Type', /image\/jpeg/);
    });

    test('GET /image/ returns an error when nothing specified', () => {
        return request(app)
            .get('/image/')
            .expect(404);
    });

    test('GET /image/ returns an error when a non-integer is specified', () => {
        return request(app)
            .get('/image/abc')
            .expect(400);
    });
});
    // POST request - also cleans up after test.

    let maxId;
    const jsondata = 'data/information.json'; 

    describe('Test the functionality for grabbing images when the user requests more details.', () => {
        test('POST /entity/new succeeds', async () => {
            const params = {
                name: 'Test Artist',
                known_for: 'Test Art',
                birth_place: 'Test Place',
                art_era: 'Test Era',
                description1: 'Test Description 1',
                description2: 'Test Description 2',
                description3: 'Test Description 3'
            };

            const facts = JSON.parse(await fsp.readFile(jsondata));
            maxId = Math.max(...facts.artists.map(artist => artist.id));

            await request(app)
                .post('/entity/new')
                .field(params)
                .attach('thumbnail_image', fs.createReadStream(path.join(__dirname, '/client/testimagesforpostrequest/testimage1.jpg')), 'testimage1.jpg')
                .attach('image1', fs.createReadStream(path.join(__dirname, '/client/testimagesforpostrequest/testimage2.jpg')), 'testimage2.jpg')
                .attach('image2', fs.createReadStream(path.join(__dirname, '/client/testimagesforpostrequest/testimage3.jpg')), 'testimage3.jpg')
                .attach('image3', fs.createReadStream(path.join(__dirname, '/client/testimagesforpostrequest/testimage4.jpg')), 'testimage4.jpg')

                .expect(200);
        });

        afterEach(async () => {
            const facts = JSON.parse(await fsp.readFile(jsondata));

            facts.artists = facts.artists.filter(artist => artist.id <= maxId);

            const json = JSON.stringify(facts, null, 2);
            await fsp.writeFile(jsondata, json, 'utf8');

            await Promise.all([
                fsp.unlink(`./data/carouselimages/${maxId + 1}.jpg`),
                fsp.unlink(`./data/${maxId * 3 + 1}.jpg`),
                fsp.unlink(`./data/${maxId * 3 + 2}.jpg`),
                fsp.unlink(`./data/${maxId * 3 + 3}.jpg`)
            ]);
        });
    });
