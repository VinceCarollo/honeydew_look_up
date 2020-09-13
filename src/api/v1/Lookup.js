const express = require('express')
const router = express.Router()
const LookupService = require('../../services/LookupService')
router.use(express.json())

// api/v1/lookup

router.post('/',
  async (req, res) => {
    if (req.body.term) {
      await LookupService.companyLookup(req.body.term)
        .then((companyInfo) => res.json(companyInfo))
        .catch(() => {
          res.status(404)
          res.json({ message: 'Look up failed' })
        })
    } else {
      res.status(404)
      res.json({ message: 'No term given' })
    }
  }
)

module.exports = router
