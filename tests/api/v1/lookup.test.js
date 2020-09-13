const request = require('supertest')
const app = require('../../../src/app')
const LookupService = require('../../../src/services/LookupService')

jest.mock('../../../src/services/LookupService', () => ({ companyLookup: jest.fn() }))

describe('Lookup API', () => {
  it('should retreive company info from search term', async () => {
    LookupService.companyLookup.mockResolvedValue({
      'website': 'https://kiewit.com/',
      'phoneNumber': '8005551234',
      'email': 'test@kiewit.com',
      'address': '3321 S Test St, Denver, CO 80202'
    })
    const res = await request(app)
      .post('/api/v1/lookup')
      .send({
        term: 'Kiewit'
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body.website).toEqual('https://kiewit.com/')
    expect(res.body.phoneNumber).toEqual('8005551234')
    expect(res.body.email).toEqual('test@kiewit.com')
    expect(res.body.address).toEqual('3321 S Test St, Denver, CO 80202')
  })

  it('should return 404 with bad search term', async () => {
    LookupService.companyLookup.mockRejectedValue(new Error('LookupFailed'))
    const res = await request(app)
      .post('/api/v1/lookup')
      .send({
        term: 'bad search term'
      })
    expect(res.statusCode).toEqual(404)
    expect(res.body.message).toEqual('Look up failed')
  })

  it('should return 404 with no search term', async () => {
    const res = await request(app)
      .post('/api/v1/lookup')
      .send({
        term: ''
      })
    expect(res.statusCode).toEqual(404)
    expect(res.body.message).toEqual('No term given')
  })
})

afterAll(() => {
  app.close()
})
