package com.jobtrackpro.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobtrackpro.model.Job;
import com.jobtrackpro.model.User;
import com.jobtrackpro.repository.JobRepository;
import com.jobtrackpro.repository.UserRepository;
import com.jobtrackpro.service.JobService;

@Service
public class JobServiceImpl implements JobService{

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Job createJob(Job job, Long userId) {
        
       User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

       job.setUser(user);

       return jobRepository.save(job);
    }

    @Override
    public void deleteJob(Long jobId, Long userId) {
        
        Job job = jobRepository.findById(jobId).orElseThrow(() -> new RuntimeException("Job not found"));

        if(!job.getUser().getId().equals(userId)){
            throw new RuntimeException("Unauthorized Access");
        }

        jobRepository.delete(job);

        
    }

    @Override
    public List<Job> filterByStatus(Long userId, String status) {
        
        return jobRepository.findByUserIdAndStatus(userId, status);
        
    }

    @Override
    public List<Job> getJobsByUser(Long userId) {
        
        return jobRepository.findByUserId(userId);
    }

    @Override
    public Job updateJob(Long jobId, Job updatedJob, Long userId) {

        Job job = jobRepository.findById(jobId).orElseThrow(() -> new RuntimeException("Job not found"));

        if(!job.getUser().getId().equals(userId)){
            throw new RuntimeException("Unauthorized Access");
        }

        job.setCompany(updatedJob.getCompany());
        job.setRole(updatedJob.getRole());
        job.setStatus(updatedJob.getStatus());
        //job.setInterviewRounds(updatedJob.getInterviewRounds());
        job.setAppliedAt(updatedJob.getAppliedAt());    
        job.setJdLink(updatedJob.getJdLink());           
        job.setNotes(updatedJob.getNotes());              
        job.setResumeVersion(updatedJob.getResumeVersion());
        
        return jobRepository.save(job);
    }

    @Override
    public List<Job> getJobsByUserSorted(Long userId) {
        return jobRepository.findByUserIdOrderByAppliedAtDesc(userId);
    }

    
}
