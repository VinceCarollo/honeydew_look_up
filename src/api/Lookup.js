const express = require('express')
const router = express.Router()
const LookupService = require('../services/LookupService')
router.use(express.json())

router.post('/',
  async (req, res) => {
    if (req.body.term) {
      await LookupService.companyLookup(req.body.term)
        .then((companyInfo) => res.json(companyInfo))
        .catch(() => res.json({ message: 'Look up failed' }))
    } else {
      res.json({ message: 'Look up failed' })
    }
  }
)

module.exports = router