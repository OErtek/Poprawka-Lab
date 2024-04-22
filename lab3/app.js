const express = require('express');
const app = express();
const PORT = 3000;
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio'); // Dodane

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});
app.get('/car', (req, res) => { // Dodane
    const cars = JSON.parse(fs.readFileSync(path.join(__dirname, 'cars.json'), 'utf-8'));

    fs.readFile(path.join(__dirname, 'public', 'car.html'), 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading car.html:', err);
            return res.status(500).send('Internal Server Error');
        }
        const $ = cheerio.load(data); 

        const carDiv = $('.car'); 

        if (cars.length === 0) {
            carDiv.html('No cars has been found.'); 
        } else {
            const lastCar = cars[cars.length - 1]; 
            carDiv.html(`<h2>Last added car</h2>
                <div><span class="bold">Make:</span> ${lastCar.make}</div>
                <div><span class="bold">Model:</span> ${lastCar.model}</div>
                <div><span class="bold">Color:</span> ${lastCar.color}</div>
                <div><span class="bold">Year:</span> ${lastCar.year}</div>`); 
        }

        res.send($.html()); 
    });
});
app.get('/car/list', (req, res) => {
    const $ = cheerio.load(fs.readFileSync(path.resolve(__dirname, './public/cars-list.html')));
    const carsDiv = $('.cars');
    const cars = JSON.parse(fs.readFileSync(path.join(__dirname, 'cars.json'), 'utf-8'));

    if (cars.length === 0) {
        carsDiv.text('No cars has been found.');
    } else {
        carsDiv.append('<h2>Cars</h2>');
        const ul = $('<ul></ul>');
        cars.forEach(car => {
            ul.append(`
                <li>
                    <p><span class="bold">Make:</span> ${car.make}</p>
                    <p><span class="bold">Model:</span> ${car.model}</p>
                    <p><span class="bold">Year:</span> ${car.year}</p>
                    <p><span class="bold">Color:</span> ${car.color}</p>
                </li>
            `);
        });
        carsDiv.append(ul);
    }

    res.send($.html());
});
app.post('/car/add', (req, res) => {
    const { make, model, year ,color } = req.body;
    const car = { make, model, year ,color};
        console.log(car);
    try {
        let cars = [];
        if (fs.existsSync(path.join(__dirname, 'cars.json'))) {
            cars = JSON.parse(fs.readFileSync(path.join(__dirname, 'cars.json'), 'utf-8'));
            if (!Array.isArray(cars)) {
                throw new Error('Data in cars.json is not an array');
            }
        }

        cars.push(car);
        fs.writeFileSync(path.join(__dirname, 'cars.json'), JSON.stringify(cars, null, 4));
        res.send('Car added');
    } catch (err) {
        console.error('Error adding car:', err);
        res.status(500).send('Internal Server Error');
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
