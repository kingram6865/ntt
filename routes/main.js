const { Router } = require('express')
const ntt = require('../controllers/ntt')
const router = Router()

router.get('/audio/topten', ntt.topCalls)
router.get('/audio/all', ntt.audioList)
router.get('/audio/:year', ntt.recordingsForYear)
router.get('/audio/:id', ntt.recordingNumber)
router.get('/audio/:id/regions', ntt.allRecordingRegions)
router.get('/audio/region/:regionId', ntt.recordingRegion)
router.get('/audio/regions/:year', ntt.regionsForYear)
router.get('/audio/callers/:year', ntt.callersForYear)
router.get('/audio/readings/:year', ntt.readingsForYear)
router.get('/audio/lectures/:year', ntt.lecturesForYear)


// router.get('/audio/search/:term', ntt.)
// router.get('/audio/:year/:month/:day', ntt.)
// router.get('/audio/:year/:month/:day/:section', ntt.)

module.exports = router