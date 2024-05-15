const express = require('express');
const router = express.Router();
const {
  uaParser,
  checkBan,
  requireJwtAuth,
  // concurrentLimiter,
  // messageIpLimiter,
  // messageUserLimiter,
} = require('~/server/middleware');
// const v1 = require('./v1');

const assistants = require('./assistants');
const chat = require('./chat');

router.use(requireJwtAuth);
router.use(checkBan);
router.use(uaParser);
router.use('v1/', assistants);
router.use('v1/chat', chat);
router.use('v2/', assistants);
router.use('v2/chat', chat);

module.exports = router;
