const cars = [
    {id: 1, make: "Toyota", model: "Yaris", year: 2001, color: "white"},
    {id: 2, make: "Honda", model: "Civic", year: 2005, color: "black"},
    {id: 3, make: "Ford", model: "Mustang", year: 2010, color: "red"},
    {id: 4, make: "Chevrolet", model: "Camaro", year: 2015, color: "blue"},
    {id: 5, make: "Mercedes", model: "E Class", year: 2020, color: "silver"}
];

function getCars() {
    return cars;
}

function getCarInformation(id) {
    const car = cars.find(car => car.id === id);
    if (!car) return "Samochód niedostępny";
    return `Marka: ${car.make}, Model: ${car.model}, Rok: ${car.year}, Kolor: ${car.color}`;
}

function getCarAge(id) {
    const car = cars.find(car => car.id === id);
    if (!car) return "Samochód niedostępny";
    const currentYear = new Date().getFullYear();
    const carAge = currentYear - car.year;
    return `Samochód ${carAge} wiek`;
}

module.exports = { getCars, getCarInformation, getCarAge };