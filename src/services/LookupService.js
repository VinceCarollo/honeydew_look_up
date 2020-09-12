const got = require('got')

class LookupService {
  static async companyLookup(searchTerm) {
    console.log(searchTerm)
    const url = `https://reqres.in/api/unknown/${Math.floor(Math.random() * 11)}`
    const response = await got(url)
    if (response.statusCode != 200) { throw 'LookupFailed' }
    const body = JSON.parse(response.body)
    return {
      website: body.ad.url,
      phoneNumber: body.data.color,
      email: body.data.pantone_value,
      address: body.ad.company
    }
  }
}

module.exports = LookupService
