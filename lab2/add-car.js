function renderPage() {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Add Car</title>
    </head>
    <body>
        <header>
            <nav>
                <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/add-car">Add car</a>
                    </li>
                    <li>
                        <a href="/car">Last added car</a>
                    </li>
                </ul>
            </nav>
        </header>
        <main>
            <form action="/add-car" method="POST">
                <label for="make">Make:</label>
                <input type="text" id="make" name="make" />
                <label for="model">Model:</label>
                <input type="text" id="model" name="model" />
                <label for="year">Year:</label>
                <input type="number" id="year" name="year" />
                <label for="color">Color:</label>
                <input type="text" id="color" name="color" />
                <button>Add car</button>
            </form>
        </main>
    </body>
    </html>`;
}

module.exports = { renderPage };