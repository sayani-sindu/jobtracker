package com.jobtrackpro.service;

import java.util.List;

import com.jobtrackpro.model.Job;

public interface JobService {

    Job createJob(Job job, Long userId);

    Job updateJob(Long jobId, Job updatedJob, Long userId);

    void deleteJob(Long jobId, Long userId);

    List<Job> getJobsByUser(Long userId);

    List<Job> filterByStatus(Long userId, String status);

    List<Job> getJobsByUserSorted(Long userId);
}
