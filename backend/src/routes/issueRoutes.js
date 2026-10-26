const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');

router.post('/', issueController.createIssue);
router.get('/', issueController.getIssues);
router.patch('/:issueId/assign', issueController.assignIssue);
router.patch('/:issueId/status', issueController.updateIssueStatus);

module.exports = router;