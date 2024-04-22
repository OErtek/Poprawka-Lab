const http = require('http');
const { HandleHome, HandleAddCar, HandleCar, handlePageNotFound } = require('./index');

const server = http.createServer((req, res) => {
    const { method, url } = req;

    if (method === 'GET' && url === '/') {
        HandleHome(res);
    } else if (url === '/add-car') {
        HandleAddCar(req, res);
    } else if (method === 'GET' && url.startsWith('/car')) {
        HandleCar(res);
    } else {
        handlePageNotFound(res);
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`The server is running on ${PORT}.`);
});
