var express = require('express');
var router = express.Router();

var job = require("../controller/job.controller");

/// Create a new Job
router.post("/", job.create);

// Retrieve all Jobs
router.get("/", job.findAll);

// Retrieve all Jobs with status of In-review
router.get("/in-review", job.findAllJobsInReview)

// Retrieve all Jobs with status of Posted
router.get("/posted", job.findAllJobsPosted)

// Retrieve a single Job with id
router.get("/:id", job.findOne);

// Update a Job status with id
router.put("/:id", job.updateStatus);

// Delete a Job with id
router.delete("/:id", job.delete);

// Delete all Jobs
router.delete("/", job.deleteAll);

module.exports = router;