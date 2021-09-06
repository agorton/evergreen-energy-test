const axios = require('axios');

exports.calculateHeatLoss = (floorArea, heatingFactor, insulationFactor) => {
  return floorArea * heatingFactor * insulationFactor
}

exports.calculatePowerHeatLoss = (heatLoss, heatingDegreeDays) => {
  return heatLoss / heatingDegreeDays
}

exports.getWeatherApiData = async (location) => {
  const weatherUrl = `https://063qqrtqth.execute-api.eu-west-2.amazonaws.com/v1/weather?location=${urlEncode(location)}`

  return await axios.get(weatherUrl, { headers: { 'x-api-key': 'f661f74e-20a7-4e9f-acfc-041cfb846505' } })
    .then((response) => {
      console.log('response:', response)
      // do something with response.
      return response
    })
    .catch((error) => {
      // catch and return error.
      console.log('error:', error)
    })
}

exports.processHouses = async (houses) => {
  await houses.map(async house => {
    console.log('called for house: ', house)


    const floorArea = house.floorArea
    const heatingFactor = house.heatingFactor
    const insulationFactor = house.insulationFactor

    return await this.getWeatherApiData(house.designRegion).then(response => {
      console.log('response for weather data:', response)

      const heatLoss = this.calculateHeatLoss(floorArea, heatingFactor, insulationFactor)
      const powerHeatLoss = this.powerHeatLoss(heatLoss, response.location.degreeDays)

      return this.printHouseInfo(heatLoss, powerHeatLoss, house.designRegion)
    })

  })
}

exports.printHouseInfo = (heatLoss, powerHeatLoss, region) => {
  const format = `--------------------------------------
    <Submission ID>
    --------------------------------------
      Estimated Heat Loss = ${heatLoss}
      Design Region = ${region}
      Power Heat Loss = ${powerHeatLoss}
      Recommended Heat Pump = 
      Cost Breakdown
        <label>, <cost>
        <label>, <cost>
        ...
      Total Cost, including VAT = 
    `
  console.log(format)
  return format
}