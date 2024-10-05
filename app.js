const express = require('express');
const app = express();
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'data' });
const path = require('path');
const { body, validationResult } = require('express-validator');
app.use(express.static('client'));

app.use(express.json());

const jsondata = 'data/information.json';
const paintingdata = 'data/informationpaintings.json';
const carouseldata = 'data/carouselinformation.json';

const facts = JSON.parse(fs.readFileSync(jsondata));
const paintingsjsondata = JSON.parse(fs.readFileSync(paintingdata));
const carouseldatashorthand = JSON.parse(fs.readFileSync(carouseldata));

// Don't need GET for index.html - node will provide that for me.

// For the heartbeat
app.get('/heartbeat', function (req, res) {
    res.json({ message: 'Server is up' });
});
/*
//For the search
app.get('/search/:id', function (request, response) {
    let idvalue = parseInt(request.params.id);
    console.log(idvalue);

    if (idvalue >= 0 && idvalue < facts.artists.length) {
        let artist = facts.artists[idvalue];
        response.json(artist);
    } else {
        response.status(400).send('No artists found');
    }
});
*/

// For the carousel
app.get('/carouselinfo', function (request, response) {
    const artistInfo = carouseldatashorthand.artists.map(artist => ({ id: artist.ID, description: artist.description }));
    response.send(artistInfo);
});

// Get the images for the carousel:
app.get('/carouselimage/:id', function (req, res) {
    const imageId = req.params.id;
    fs.readFile(`./data/carouselimages/${imageId}.jpg`, function (err, data) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(data);
        }
    });
});

app.get('/paintingthumbnail/:id', function (req, res) {
    const imageId = req.params.id;
    fs.readFile(`./data/paintingthumbnails/${imageId}.jpg`, function (err, data) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(data);
        }
    });
});

// The three in the assignment
app.get('/artists', function (request, response) { // GET request to list artists.
    const artistNames = facts.artists.map(artist => [artist.name, artist.known_for]);
    response.send(artistNames);
});

app.get('/paintings', function (request, response) { // GET request to list paintings.
    const paintingNames = paintingsjsondata.paintings.map(painting => [painting.name, painting.artist]);
    response.send(paintingNames);
});

app.get('/paintingsdropdown', function (request, response) { // GET request to list paintings.
    const paintingNames = paintingsjsondata.paintings.map(painting => ({ id: painting.id, name: painting.name }));
    response.send(paintingNames);
});

app.get('/artistsdropdown', function (req, res) {
    const artistData = facts.artists.map(artist => ({ id: artist.id, name: artist.name }));
    res.json(artistData);
  });

app.get('/details', function (request, response) { // GET request to list details. (Second GET request)
    const dataArray = facts.artists.map(item => [item.heading1, item.description1, item.heading2, item.description2, item.heading3, item.description3]);
    response.send(dataArray);
});

app.get('/paintingdetails', function (request, response) { // GET request to list details. (Second GET request)
    const dataArray = paintingsjsondata.paintings.map(item => [item.heading, item.description, item.year, item.location]);
    response.send(dataArray);
});

// Image Route
app.get('/image/:id', function (req, res) {
    const imageId = req.params.id;
    fs.readFile(`./data/${imageId}.jpg`, function (err, data) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(data);
        }
    });
});

// This post request is for the text/json data in the form
// This post request is for the text/json data in the form
app.post('/entity/new', upload.fields([{ name: 'thumbnail_image', maxCount: 1 }, { name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }]),
    body('name').notEmpty().withMessage('Artist Name is required'),
    async function (request, response) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    console.log('Loaded post request');
    console.log(request.body);

    const maxId = Math.max(...facts.artists.map(artist => artist.id));

    let files = fs.readdirSync('./data/carouselimages/');
    let maxNumberCarousel = Math.max(...files.map(file => {
        const match = file.match(/^(\d+)\.jpg$/);
        return match ? parseInt(match[1]) : 0;
    }));

    files = fs.readdirSync('./data/');
    let maxNumberData = Math.max(...files.map(file => {
        const match = file.match(/^(\d+)\.jpg$/);
        return match ? parseInt(match[1]) : 0;
    }));

    const newData = {
        id: String(maxId + 1),
        name: request.body.name,
        known_for: request.body.known_for,
        birth_place: request.body.birth_place,
        art_era: request.body.art_era,
        heading1: 'Childhood',
        description1: request.body.description1,
        heading2: 'Era of Art',
        description2: request.body.description2,
        heading3: 'Famous Paintings',
        description3: request.body.description3,
        thumbnail_image: renameFile(request.files.thumbnail_image[0].path, './data/carouselimages/', ++maxNumberCarousel),
        image1: renameFile(request.files.image1[0].path, './data/', ++maxNumberData),
        image2: renameFile(request.files.image2[0].path, './data/', ++maxNumberData),
        image3: renameFile(request.files.image3[0].path, './data/', ++maxNumberData)
    };

    facts.artists.push(newData);

    const json = JSON.stringify(facts, null, 2);

    fs.writeFileSync('data/information.json', json, 'utf8');
    console.log('The file has been saved!');

    response.send(request.body);
});

function renameFile (oldPath, directory, newNumber) {
    const newPath = path.join(directory, newNumber + '.jpg');
    fs.renameSync(oldPath, newPath);
    return newPath;
}

module.exports = app;
