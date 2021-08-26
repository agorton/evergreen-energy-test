exports.calculateHeatLoss = (floorArea, heatingFactor, insulationFactor) => {
    return floorArea * heatingFactor * insulationFactor
}

exports.processHouses = (houses) => {
    houses.map(house => {
        const floorArea = house.floorArea
        const heatingFactor = house.heatingFactor
        const insulationFactor = house.insulationFactor

        this.printHouseInfo(this.calculateHeatLoss(floorArea, heatingFactor, insulationFactor))
    })
}

exports.printHouseInfo = (heatLoss) => {
    const format = `--------------------------------------
    <Submission ID>
    --------------------------------------
      Estimated Heat Loss = ${heatLoss}
      Design Region = 
      Power Heat Loss = 
      Recommended Heat Pump = 
      Cost Breakdown
        <label>, <cost>
        <label>, <cost>
        ...
      Total Cost, including VAT = 
    `
    console.log(format);
}