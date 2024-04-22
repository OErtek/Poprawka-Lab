const http = require('http');
const { getCars, getCarInformation, getCarAge } = require('./Cars');
const { getHTMLDocumentStart,getHTMLDocumentEnd } =  require('./getHTMLDocumentStart');
const server = http.createServer((req, res) => {
    const cars = getCars();
    res.setHeader('Content-Type', 'text/html');
    res.write(getHTMLDocumentStart());
    res.write('<body>');

    cars.forEach(car => {
        res.write(`<p>${getCarInformation(car.id)}</p>`);
        res.write(`<p>${getCarAge(car.id)}</p>`);
    });

    res.write('</body>');
    res.write(getHTMLDocumentEnd());
    res.end();
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`The server is running on ${PORT}.`);
});