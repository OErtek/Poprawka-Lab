function renderPage(data) {
    let car = JSON.parse(data); 
    let tableRows = '';
    for (let key in car) {
        tableRows += `<tr><th>${key}</th><td>${car[key]}</td></tr>`;
    }
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Car</title>
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
            <table>
                <thead>
                    <tr>
                        <th>Attribute</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
        </main>
    </body>
    </html>`;
}

module.exports = { renderPage };
