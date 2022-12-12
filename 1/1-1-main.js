function racingGame() {
    const carCount = +prompt("Enter number of cars:");
    if (isNaN(carCount)) throw new Error("Not a number!")
    const cars = [];
    function RaceCar(inputName) {
        this.carName = inputName;
        this.carOrder = null;
        this.carPosition = 0;
        this.inRace = true;
    }
    for (let index = 0; index < carCount; index++) {
        cars.push(new RaceCar(prompt(`Enter car name #${index + 1}:`)));
    }
    for (let order = 1; order <= carCount; order++) {
        const choices = cars.filter(function(car) {
            return car.carOrder === null;
        })
        const selected = Math.floor(Math.random() * (carCount - order + 1));
        choices[selected].carOrder = order;
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
                for (let j = 0; j < i; j++) {
                    if (cars[j].inRace && cars[j].carPosition === cars[i].carPosition) {
                        cars[j].carPosition = 0;
                    }
                }
            }
        }
        const mapArray = [];
        mapArray.length = 300;
        mapArray.fill('-');
        cars.forEach(function(car) {
            if (car.inRace) {
                mapArray[car.carPosition] = car.carName;
            }
        })
        let mapString = '';
        for (let item of mapArray) {
            mapString += item;
        }
        console.log(mapString);
        endFlag = cars.every(function(car) {
            return car.inRace === false;
        })
    }
    console.log(`winner: ${winner}`);
}
racingGame();