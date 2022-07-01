const { testing, jobStatus } = require("../enums/job.enum");
const db = require("../models");
const Job = db.job;
const Op = db.Sequelize.Op;

// Create and Save a new Job
exports.create = (req, res) => {
    // Validate request
    if (!req.body.jobTitle || !req.body.jobLocation || !req.body.jobDescription) {
        res.status(400).send({
            message: "Content must contain jobTitle, jobLocation, jobDescription!"
        });
        return;
    }

    const { jobTitle, jobLocation, jobDescription } = req.body

    // Create a Job
    const job = {
        jobTitle,
        jobLocation,
        jobDescription,
        date: new Date(),
        jobStatus: jobStatus.IN_REVIEW
    };

    // Save Job in the database
    Job.create(job)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Job."
            });
        });
};

// Retrieve all Jobs from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Job.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving jobs."
            });
        });
};

// Find a single Job with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Job.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Job with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Job with id=" + id
            });
        });
};

// Update a Job by the id in the request
exports.updateStatus = (req, res) => {
    const id = req.params.id;

    Job.update({ jobStatus: req.body.jobStatus }, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Job was updated successfully."
                });
            } else {
                res.status(400).send({
                    message: `Cannot update Job with id=${id}. Maybe Job was not found or req.body.jobStatus is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Job with id=" + id
            });
        });
};

// Delete a Job with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Job.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Job was deleted successfully!"
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Job with id=${id}. Maybe Job was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Job with id=" + id
            });
        });
};

// Delete all Jobs from the database.
exports.deleteAll = (req, res) => {
    Job.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Jobs were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all jobs."
            });
        });
};

// find all Jobs with Status In-Review
exports.findAllJobsInReview = (req, res) => {
    Job.findAll({ where: { jobStatus: jobStatus.IN_REVIEW } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving jobs."
            });
        });
};

// find all Jobs with Status Posted
exports.findAllJobsPosted = (req, res) => {
    Job.findAll({ where: { jobStatus: jobStatus.POSTED } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving jobs."
            });
        });
};
