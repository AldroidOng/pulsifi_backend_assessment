const { jobStatus } = require("../enums/job.enum");

module.exports = (sequelize, Sequelize) => {
    const Job = sequelize.define("job", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        },
        jobTitle: {
            type: Sequelize.STRING
        },
        jobLocation: {
            type: Sequelize.STRING
        },
        jobDescription: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.DATEONLY
        },
        jobStatus: {
            type: Sequelize.ENUM(jobStatus.IN_REVIEW, jobStatus.POSTED)
        },
    });

    return Job;
};