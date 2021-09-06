
const app = require('../../app.js');
const fs = require('fs');
const chai = require('chai');
const axios = require('axios');
const { stub } = require('sinon');
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

    it('should correctly calculate power heat loss', () => {
        var heatLoss = 8
        var heatingDegreeDays = 2

        var expected = 4
        var result = app.calculatePowerHeatLoss(heatLoss, heatingDegreeDays)
        expect(result).to.be.equal(expected)
    })
})

// Currently this isn't working -- I suspect it's because I'm mocking incorrectly. 
describe('an app run', () => {
    let apiStub = stub(axios, "get").returns(
        Promise.resolve({
            "location": {
                "location": "Borders (Boulmer)",
                "degreeDays": "2483",
                "groundTemp": "9",
                "postcode": "NE66",
                "lat": "55.424",
                "lng": "-1.583"
            }
        })
    )

    it('should run the app with some output', async () => {
        const file = fs.readFileSync('./tests/resources/houses.json')
        const houses = JSON.parse(file)

        await app.processHouses(houses)
        expect(apiStub.callCount).to.be.equal(5)
    })
})
