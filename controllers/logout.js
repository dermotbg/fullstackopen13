const { tokenExtractor, sessionValidator } = require('../util/middleware')

const router = require('express').Router()

router.delete('/', tokenExtractor, sessionValidator, async (req, resp) => {
 if(req.decodedToken && req.sessionValid) {
   req.activeSession.destroy()
   return resp.status(204).end()
 }
 else {
  resp.status(400).json({ error: 'No session to logout' })
 }
})

module.exports = router