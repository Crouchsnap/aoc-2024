const input = require("./input.js")

const testInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`

const parseData = (data) => {
    const rows = data.split(`\n`)
    return rows.map((row) => {
        return row.split(' ').map((item) => parseInt(item))
    })
}

const isSafe = (numbers) => {
    return numbers.every((value, index, numbers) => {
        if (index === numbers.length - 1) {
            return true
        } else if (Math.abs(value - numbers[index + 1]) > 3) {
            return false
        } else if (Math.abs(value - numbers[index + 1]) === 0) {
            return false
        } else if (index > 0 && value > numbers[index + 1] && value > numbers[index - 1]) {
            return false
        }
        else if (index > 0 && value < numbers[index + 1] && value < numbers[index - 1]) {
            return false
        }
        else {
            return true
        }
    })
}

const safeRows = (data) => {
    const rows = parseData(data)
    return rows.reduce((acc, curr) => {
        if (isSafe(curr)) {
            acc++
        }
        return acc
    }, 0)
}

describe('day 2 part 1', () => {
    test('safe case 1', () => {
        expect(isSafe([7, 6, 4, 2, 1])).toBeTruthy()
    })
    test('safe case 2', () => {
        expect(isSafe([1, 3, 6, 7, 9])).toBeTruthy()
    })
    test('unsafe case 1', () => {
        expect(isSafe([1, 2, 7, 8, 9])).toBeFalsy()
    })
    test('unsafe case 2', () => {
        expect(isSafe([8, 6, 4, 4, 1])).toBeFalsy()
    })
    test('unsafe case 3', () => {
        expect(isSafe([1, 3, 2, 4, 5])).toBeFalsy()
    })
    test('unsafe case 4', () => {
        expect(isSafe([3, 2, 3, 4, 5])).toBeFalsy()
    })
    test('test data', () => {
        expect(safeRows(testInput)).toEqual(2)
    })
    test('real data', () => {
        expect(safeRows(input)).toEqual(246)
    })
})