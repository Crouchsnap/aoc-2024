const input = require("./input.js")

const testInput = 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))'
const partTwoTestInput = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"

const doIt = (input) => {
    return getStatements(input).map((statement) => {
        return getNumbers(statement)
    }).reduce((acc, curr) => {
        return acc += (curr[0] * curr[1])
    }, 0)
}

const doItPartTwo = (input) => {
    let enabled = true
    return getPartTwoStatements(input).reduce((acc, curr) => {
        if (curr === 'do()') {
            enabled = true
            return acc
        } else if (curr === "don't()") {
            enabled = false
            return acc
        } else {
            if (enabled) {
                const numbers = getNumbers(curr)
                return acc += (numbers[0] * numbers[1])
            }
            return acc
        }
    }, 0)
}

const getStatements = (input) => {
    const filter = /mul\(\d*,\d*\)/g
    return input.match(filter)
}

const getPartTwoStatements = (input) => {
    const filter = /(mul\(\d*,\d*\))|(don't\(\))|(do\(\))/g
    return input.match(filter)
}

const getNumbers = (input) => {
    return input.slice(4, -1).split(',').map((item) => parseInt(item))
}


describe('day 3 part 1', () => {

    test('gets statements', () => {
        expect(getStatements(testInput)).toEqual(['mul(2,4)', 'mul(5,5)', 'mul(11,8)', 'mul(8,5)'])
    })

    test('gets numbers', () => {
        expect(getNumbers('mul(11,8)')).toEqual([11, 8])
    })

    test('test data', () => {
        expect(doIt(testInput)).toEqual(161)
    })

    test('real data', () => {
        expect(doIt(input)).toEqual(184511516)
    })
})

describe('day 3 part 2', () => {
    test('gets statements', () => {
        expect(getPartTwoStatements(partTwoTestInput)).toEqual(['mul(2,4)', "don't()", 'mul(5,5)', 'mul(11,8)', "do()", 'mul(8,5)'])
    })
    test('test data', () => {
        expect(doItPartTwo(partTwoTestInput)).toEqual(48)
    })
    test('real data', () => {
        expect(doItPartTwo(input)).toEqual(184511516)
    })
})