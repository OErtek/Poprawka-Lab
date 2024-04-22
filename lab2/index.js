const fs = require('fs');
const querystring = require('querystring');
const renderPageCar = require('./car.js').renderPage;
const renderPageCarAdd = require('./add-car.js').renderPage;
const renderPageCarIndex = require('./home.js').renderPage;
function HandleHome(res) {
    res.setHeader('Content-Type', 'text/html');
    res.write(renderPageCarIndex());
    res.end();
}

function HandleAddCar(req, res) {
    if (req.method === 'GET') {
        res.setHeader('Content-Type', 'text/html');
        res.write(renderPageCarAdd());
        res.end();
    } else if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const formData = querystring.parse(body);
            fs.writeFileSync('formData.json', JSON.stringify(formData));
            res.statusCode = 302;
            res.setHeader('Location', '/car');
            res.end();
        });
    }
}

function HandleCar(res) {
    const data = fs.readFileSync('formData.json', 'utf-8');
    res.setHeader('Content-Type', 'text/html');
    res.write(renderPageCar(data));
    res.end();
}

function handlePageNotFound(res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.write('404 Page Not Found');
    res.end();
}

module.exports = { HandleHome, HandleAddCar, HandleCar, handlePageNotFound };