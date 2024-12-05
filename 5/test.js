const input = require("./input.js")

const testInput = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`

const parseData = (data) => {
    const rows = data.split('\n')
    const rules = []
    const pages = []

    rows.forEach(row => {
        if (row.includes('|')) {
            const [page, delimiter] = row.split('|')
            rules.push({ page: parseInt(page), delimiter: parseInt(delimiter) })
        } else if (row.includes(',')) {
            pages.push(row.split(',').map(item => parseInt(item)))
        }
    });

    return { rules, pages }
}

const doIt = (data) => {
    const { rules, pages } = parseData(data)

    const goodPages = pages.map((pageList, index) => {
        if (rules.every((rule) => {
            const pageIndex = pageList.indexOf(rule.page)
            const delimiterIndex = pageList.indexOf(rule.delimiter)
            return delimiterIndex == -1 || pageIndex <= delimiterIndex
        })) {
            const validPages = pages[index]
            return validPages[(validPages.length - 1) / 2]
        } else {
            return 0
        }
    })

    return goodPages.reduce((acc, curr) => acc += curr)
}

const doItPartTwo = (data) => {

}

describe('day 5 part 1', () => {

    test('parser', () => {
        expect(parseData(`10|15
5|15
            
12,4,55
12,22,89`))
            .toEqual(
                {
                    rules: [{ page: 10, delimiter: 15 }, { page: 5, delimiter: 15 }],
                    pages: [[12, 4, 55], [12, 22, 89]]
                })
    })

    test('test data', () => {
        expect(doIt(testInput)).toEqual(143)
    })

    test('real data', () => {
        expect(doIt(input)).toEqual(6951)
    })
})

describe('day 5 part 2', () => {

    // test('test data', () => {
    //     expect(doItPartTwo(testInput)).toEqual(true)
    // })
    // test('real data', () => {
    //     expect(doItPartTwo(input)).toEqual(1)
    // })
})