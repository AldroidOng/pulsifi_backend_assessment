const request = require('supertest');
const app = require('./app');
const { jobStatus } = require('./enums/job.enum');

describe('Jobs API', () => {

    it('POST /job -> created a job', () => {
        return request(app).post('/job')
            .send({
                jobTitle: "Senior Sleeper 2",
                jobLocation: "Kelana Jaya",
                jobDescription: "Just keep sleeping"
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                        jobTitle: "Senior Sleeper 2",
                        jobLocation: "Kelana Jaya",
                        jobDescription: "Just keep sleeping",
                        date: expect.any(String),
                        jobStatus: jobStatus.IN_REVIEW,
                    })
                )
            })
    })

    it('GET /job -> array of jobs', () => {
        return request(app)
            .get('/job')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(Number),
                            createdAt: expect.any(String),
                            updatedAt: expect.any(String),
                            jobTitle: expect.any(String),
                            jobLocation: expect.any(String),
                            jobDescription: expect.any(String),
                            date: expect.any(String),
                            jobStatus: expect.any(String),
                        })
                    ])
                )
            })
    })

    it('GET /job/in-review -> array of jobs with status "in-review"', () => {
        return request(app)
            .get('/job/in-review')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(Number),
                            createdAt: expect.any(String),
                            updatedAt: expect.any(String),
                            jobTitle: expect.any(String),
                            jobLocation: expect.any(String),
                            jobDescription: expect.any(String),
                            date: expect.any(String),
                            jobStatus: expect.any(String),
                        })
                    ])
                )
            })
    })

    it('PUT /job/id -> update job status by ID', () => {
        request(app).post('/job')
            .send({
                jobTitle: "Senior Sleeper 2",
                jobLocation: "Kelana Jaya",
                jobDescription: "Just keep sleeping"
            }).then((createJobResponse) => {
                return request(app).put(`/job/${createJobResponse.body.id}`)
                    .send({
                        jobStatus: jobStatus.POSTED
                    })
                    .expect('Content-Type', /json/)
                    .expect(200)
            });
    });

    it('GET /job/posted -> array of jobs with status "posted"', () => {
        request(app).post('/job')
            .send({
                jobTitle: "Senior Sleeper 2",
                jobLocation: "Kelana Jaya",
                jobDescription: "Just keep sleeping"
            }).then((createJobResponse) => {
                request(app).put(`/job/${createJobResponse.body.id}`)
                    .send({
                        jobStatus: jobStatus.POSTED
                    })
                    .then(() => {
                        return request(app)
                            .get('/job/posted')
                            .expect('Content-Type', /json/)
                            .expect(200)
                            .then((response) => {
                                expect(response.body).toEqual(
                                    expect.arrayContaining([
                                        expect.objectContaining({
                                            id: expect.any(Number),
                                            createdAt: expect.any(String),
                                            updatedAt: expect.any(String),
                                            jobTitle: expect.any(String),
                                            jobLocation: expect.any(String),
                                            jobDescription: expect.any(String),
                                            date: expect.any(String),
                                            jobStatus: expect.any(String),
                                        })
                                    ])
                                )
                            })
                    });
            });
    });

    it('GET /job/id -> specific job by ID', () => {
        request(app).post('/job')
            .send({
                jobTitle: "Senior Sleeper 2",
                jobLocation: "Kelana Jaya",
                jobDescription: "Just keep sleeping"
            }).then((createJobResponse) => {
                return request(app)
                    .get(`/job/${createJobResponse.body.id}`)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((response) => {
                        expect(response.body).toEqual(
                            expect.objectContaining({
                                id: expect.any(Number),
                                createdAt: expect.any(String),
                                updatedAt: expect.any(String),
                                jobTitle: expect.any(String),
                                jobLocation: expect.any(String),
                                jobDescription: expect.any(String),
                                date: expect.any(String),
                                jobStatus: expect.any(String),
                            })
                        )
                    })
            })
    })

    it('GET /job/id -> 404 if not found', () => {
        return request(app).get('/job/999').expect(404);
    })

    it('POST /job -> 400 if expected key-value not provided', () => {
        return request(app).post('/job')
            .send({
                jobTitle: "Senior Sleeper 2",
            })
            .expect(400)
    })

    it('PUT /job/id -> 400 if key jobStatus not provided', () => {
        request(app).post('/job')
            .send({
                jobTitle: "Senior Sleeper 2",
                jobLocation: "Kelana Jaya",
                jobDescription: "Just keep sleeping"
            }).then((createJobResponse) => {
                return request(app).put(`/job/${createJobResponse.body.id}`)
                    .send({})
                    .expect(400);
            });
    });

    it('PUT /job/id -> 400 if not found', () => {
        return request(app).put('/job/999').send({
            jobStatus: jobStatus.POSTED
        }).expect(400);
    });

    it('PUT /job/id -> 500 if key of jobStatus value provided does not match any of the expected values required', () => {
        request(app).post('/job')
            .send({
                jobTitle: "Senior Sleeper 2",
                jobLocation: "Kelana Jaya",
                jobDescription: "Just keep sleeping"
            }).then((createJobResponse) => {
                return request(app).put(`/job/${createJobResponse.body.id}`)
                    .send({
                        jobStatus: "random status"
                    })
                    .expect(500);
            })
    });

    it('DELETE /job/id -> delete jobs by ID', () => {
        request(app).post('/job')
            .send({
                jobTitle: "Senior Sleeper 2",
                jobLocation: "Kelana Jaya",
                jobDescription: "Just keep sleeping"
            }).then((createJobResponse) => {
                return request(app)
                    .delete(`/job/${createJobResponse.body.id}`)
                    .expect(200)
            })
    })

    it('DELETE /job/id -> 404 for job not found', () => {
        return request(app).delete('/job/1').expect(404)
    })

    it('DELETE /job -> delete all jobs', () => {
        return request(app).delete('/job').expect(200)
    })
})
