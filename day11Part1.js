'use strict'

const oct = [
    4525436417,
    1851242553,
    5421435521,
    8431325447,
    4517438332,
    3521262111,
    3331541734,
    4351836641,
    2753881442,
    7717616863,
]
let flashCounter = 0


//Each number (octopus) is an object of class Octopus that remembers whether it flashed, its energy level and coordinates.
class Octopus {
    constructor(level, row, col) {
        this.level = level
        this.row = row
        this.col = col
        this.isFlashed = false
    }

    //Method for increasing adjacent numbers. Calls dynamically objects of class Octopus from the array of octopuses that are adjacent to the number that flashed and setter increaseLevel on them
    increaseAdjacents() {

       // I know try catch block is not optimal, but I think it's okay to use it for this purpose
        try {
            //left
            octopuses[this.row][this.col - 1].increaseLevel = 1
        } catch {
        }
        try {
            //right
            octopuses[this.row][this.col + 1].increaseLevel = 1
        } catch {
        }
        try {
            //up
            octopuses[this.row - 1][this.col].increaseLevel = 1
        } catch {
        }
        try {
            //down
            octopuses[this.row + 1][this.col].increaseLevel = 1
        } catch {
        }
        try {
            //up left
            octopuses[this.row - 1][this.col - 1].increaseLevel = 1
        } catch {
        }
        try {
            //up right
            octopuses[this.row - 1][this.col + 1].increaseLevel = 1
        } catch {
        }
        try {
            //down left
            octopuses[this.row + 1][this.col - 1].increaseLevel = 1
        } catch {
        }
        try {
            //down right
            octopuses[this.row + 1][this.col + 1].increaseLevel = 1
        } catch {
        }

    }

    //setter
    set increaseLevel(num) {
        //if the octopus hasn't blinked yet, its level increases by +1 each round
        if (!this.isFlashed) {
            this.level += num

            /**
             * If the level increases above 9, isFlashed is set to true, level is set to 0 and the level is not increased in the current round, at the same time the method for increasing the level of the surrounding numbers is triggered and a flash is added
             */
            if (this.level > 9) {
                this.isFlashed = true
                flashCounter++
                this.level = 0
                this.increaseAdjacents()
            }
        }
    }
}

//Converts numbers from the oct array to objects of the Octopus class and assigns coordinates to them
const octopuses = oct.map((oneRow, row) => {
    return [oneRow].toString().split("").map((level, col) => {
        const octopus = new Octopus(+level, row, col)
        return octopus
    })
})

//100 x loop 
for (let i = 0; i < 100; i++) {
    octopuses.forEach((row) => {
        row.forEach((oct) => {
            //The setter increaseLeve is called on each object of the octopus class
            oct.increaseLevel = 1
        })
    })

    //At the end of each round, the isFlashed property is set to false for all octopus objects.
    octopuses.forEach((row) => {
        row.forEach((oct) => {
            oct.isFlashed = false
        })
    })
}

console.log(flashCounter)

