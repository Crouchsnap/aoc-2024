const input = require("./input.js")

let testInput = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`

const parseData = (data) => {
    const rows = data.split(`\n`)
    return rows.map((row) => Array.from(row))
}

const neigboringCoordinates = [{ x: 1, y: 1 }, { x: 1, y: 0 }, { x: 1, y: -1 }, { x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 }]
const topLeft = { x: 1, y: -1 }
const topRight = { x: 1, y: 1 }
const bottomLeft = { x: -1, y: -1 }
const bottomRight = { x: -1, y: 1 }

const validCoordinate = (length, coordinate) => {
    return !(coordinate > length - 1 || coordinate < 0)
}

const checkNeighborsPartTwo = (coordinates, data) => {
    let count = 0
    const topLeftToCheck = { x: coordinates.x + topLeft.x, y: coordinates.y + topLeft.y }
    const topRightToCheck = { x: coordinates.x + topRight.x, y: coordinates.y + topRight.y }
    const bottomLeftToCheck = { x: coordinates.x + bottomLeft.x, y: coordinates.y + bottomLeft.y }
    const bottomRightToCheck = { x: coordinates.x + bottomRight.x, y: coordinates.y + bottomRight.y }

    if ([topLeftToCheck, topRightToCheck, bottomLeftToCheck, bottomRightToCheck].every((element) => {
        return validCoordinate(data.length, element.x) && validCoordinate(data.length, element.y)
    })) {
        const backString = data[topLeftToCheck.x][topLeftToCheck.y] + 'A' + data[bottomRightToCheck.x][bottomRightToCheck.y]
        const forwardString = data[bottomLeftToCheck.x][bottomLeftToCheck.y] + 'A' + data[topRightToCheck.x][topRightToCheck.y]

        if ((backString === 'MAS' || backString === 'SAM') && (forwardString === 'MAS' || forwardString === 'SAM')) {
            count++
        }
    }
    return count
}

const checkNeighbors = (coordinates, data) => {
    let counter = 0
    neigboringCoordinates.forEach((modifier) => {
        const xmToCheck = modifier.x + coordinates.x
        const ymToCheck = modifier.y + coordinates.y
        if (validCoordinate(data.length, xmToCheck) && validCoordinate(data.length, ymToCheck)) {
            if (data[xmToCheck][ymToCheck] === 'M') {
                const xaToCheck = modifier.x * 2 + coordinates.x
                const yaToCheck = modifier.y * 2 + coordinates.y
                if (validCoordinate(data.length, xaToCheck) && validCoordinate(data.length, yaToCheck)) {
                    if (data[xaToCheck][yaToCheck] === 'A') {
                        const xsToCheck = modifier.x * 3 + coordinates.x
                        const ysToCheck = modifier.y * 3 + coordinates.y
                        if (validCoordinate(data.length, xsToCheck) && validCoordinate(data.length, ysToCheck)) {
                            if (data[xsToCheck][ysToCheck] === 'S') {
                                counter++
                            }
                        }
                    }
                }
            }
        }
    })
    return counter
}

const doIt = (data) => {
    let parsed = parseData(data)
    let counter = 0
    parsed.forEach((row, xIndex) => {
        row.forEach((point, yIndex) => {
            if (point === 'X') {
                counter += checkNeighbors({ x: xIndex, y: yIndex }, parsed)
            }
        })
    });
    return counter
}

const doItPart2 = (data) => {
    let parsed = parseData(data)
    let counter = 0
    parsed.forEach((row, xIndex) => {
        row.forEach((point, yIndex) => {
            if (point === 'A') {
                counter += checkNeighborsPartTwo({ x: xIndex, y: yIndex }, parsed)
            }
        })
    });
    return counter
}


describe('day 2 part 1', () => {
    test('parser works', () => {
        expect(parseData(testInput)[0]).toEqual(['M', 'M', 'M', 'S', 'X', 'X', 'M', 'A', 'S', 'M'])
        expect(parseData(testInput)[9][3]).toEqual('X')
    })


    test('test data', () => {
        expect(doIt(testInput)).toEqual(18)
    })

    test('real data', () => {
        expect(doIt(input)).toEqual(2530)
    })
})

describe('day 2 part 2', () => {

    test('test data', () => {
        expect(doItPart2(testInput)).toEqual(9)
    })

    test('real data', () => {
        expect(doItPart2(input)).toEqual(1921)
    })
})