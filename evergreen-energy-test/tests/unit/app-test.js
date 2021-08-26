
const app = require('../../app.js');
const fs = require('fs');
const chai = require('chai');
const expect = chai.expect;

describe('heat loss', () => {
    it('should correctly calculate heat loss', () => {
        var floorArea = 2
        var heatingFactor = 2
        var insulationFactor = 2

        var expected = 8
        var result = app.calculateHeatLoss(floorArea, heatingFactor, insulationFactor)

        expect(result).to.be.equal(expected)
    })
})

// why would I do such a thing?? This is the easiest / quickest way to do an app run without setting up a local lambda.
describe('an app run', () => {
    it('should run the app with some output', () => {
        const file = fs.readFileSync('./tests/resources/houses.json')
        const houses = JSON.parse(file)

        app.processHouses(houses)
    })
})
