const { jobStatus } = require("../enums/job.enum");

module.exports = (sequelize, Sequelize) => {
    const Job = sequelize.define("job", {
        job_title: {
            type: Sequelize.STRING
        },
        job_location: {
            type: Sequelize.STRING
        },
        job_description: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.DATEONLY
        },
        job_status: {
            type: Sequelize.ENUM(jobStatus.IN_REVIEW, jobStatus.POSTED)
        },
    });

    return Job;
};