const input = require("./input.js")

const testInput = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`

const parseData = (data) => {
    const rows = data.split(`\n`)
    return rows.map((row) => Array.from(row))
}

const findCaret = (rows) => {
    let result
    rows.forEach((element, y) => {
        const x = element.findIndex((value) => value === '^')
        if (x > -1) {
            result = { x: x, y: y }
        }
    });
    return result
}

const up = { x: 0, y: -1 }
const right = { x: 1, y: 0 }
const down = { x: 0, y: 1 }
const left = { x: -1, y: 0 }

const onGrid = ({ x, y }, length) => {
    return x <= length - 1 && y <= length - 1 && x >= 0 && y >= 0
}

const traverse = (input) => {
    const grid = parseData(input)
    const start = findCaret(grid)
    let current = { x: start.x, y: start.y }
    let direction = up

    while (onGrid(current), grid.length) {
        const possibleNext = { x: current.x + direction.x, y: current.y + direction.y }
        grid[current.y][current.x] = '*'

        if (!onGrid(possibleNext, grid.length)) {
            break
        }

        if (grid[possibleNext.y][possibleNext.x] === '#') {
            if (direction === up) {
                direction = right
            } else if (direction === right) {
                direction = down
            } else if (direction === down) {
                direction = left
            } else if (direction === left) {
                direction = up
            }
        }

        current.x += direction.x
        current.y += direction.y
    }

    return grid.reduce((acc, curr) => {
        const traveled = curr.filter((value) => value === '*')
        return acc += traveled.length
    }, 0)
}

const doItPartTwo = (data) => {

}

describe('day 6 part 1', () => {

    test('find caret', () => {
        expect(findCaret(parseData(testInput))).toEqual({ x: 4, y: 6 })
    })

    test('test data', () => {
        expect(traverse(testInput)).toEqual(41)
    })

    test('real data', () => {
        expect(traverse(input)).toEqual(5534)
    })
})

describe('day 6 part 2', () => {

    // test('test data', () => {
    //     expect(doItPartTwo(testInput)).toEqual(true)
    // })
    // test('real data', () => {
    //     expect(doItPartTwo(input)).toEqual(1)
    // })
})