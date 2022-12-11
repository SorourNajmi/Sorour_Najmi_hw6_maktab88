function racingGame() {
    let carCount = +prompt("Enter number of cars:");
    if (isNaN(carCount)) throw new Error("Not a number!")
    const cars = [];
    function RaceCar(inputName, inputOrder) {
        this.carName = inputName;
        this.carOrder = inputOrder;
        this.carPosition = 0;
        this.inRace = true;
    }
    for (let i = 0; i < carCount; i++) {
        cars.push(new RaceCar(prompt(`Enter car name #${i + 1}:`),
        Math.floor(Math.random() * 10**13)));
    }
    cars.sort(function(a, b) {return a.carOrder - b.carOrder});
    const steps = []
    let winner;
    let winnerFlag = false;
    let endFlag = false;
    while (!endFlag) {
        for (let i = 0; i < cars.length; i++) {
            steps[i] = Math.floor(Math.random() * 10) + 1;
            if (cars[i].inRace) {
                cars[i].carPosition += steps[i];
                if (cars[i].carPosition > 300) {
                    cars[i].inRace = false;
                    if (!winnerFlag) {
                        winner = cars[i].carName;
                        winnerFlag = true;
                    }
                }
            }
            for (let j = 0; j < i; j++) {
                if (cars[j].inRace && cars[j].carPosition === cars[i].carPosition) {
                    cars[j].carPosition = 0;
                }
            }
        }
        let mapRoad = [];
        mapRoad.length = 300;
        mapRoad.fill('-');
        cars.forEach(function(car) {
            if (car.inRace) {
                mapRoad[car.carPosition] = car.carName;
            }
        })
        let mapString = '';
        for (let item of mapRoad) {
            mapString += item;
        }
        console.log(mapString);
        endFlag = cars.every(function(element) {
            return element.inRace === false;
        })
    }
    console.log(`winner: ${winner}`);
}
racingGame();