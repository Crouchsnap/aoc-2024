const input = require("./input.js")

const descending = (a, b) => a - b

const doIt = (input) => {
    const leftList = []
    const rightList = []

    input.split(`\n`)
        .forEach((line) => {
            const numbers = line.split(`   `)
                .map((number) => { return parseInt(number) })

            leftList.push(numbers[0])
            rightList.push(numbers[1])
        })

    leftList.sort(descending)
    rightList.sort(descending)

    return leftList.reduce((acc, curr, index) => {
        return acc += Math.abs(curr - rightList[index])
    }, 0)
}

describe('day 1', () => {
    test('part 1 test data', () => {
        const testInput = `3   4
4   3
2   5
1   3
3   9
3   3`
        expect(doIt(testInput)).toEqual(11)
    })
    test('part 1 real data', () => {
        expect(doIt(input)).toEqual(2742123)
    })
})