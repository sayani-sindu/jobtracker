package com.jobtrackpro.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobtrackpro.dto.job.JobRequestDTO;
import com.jobtrackpro.dto.job.JobResponseDTO;
import com.jobtrackpro.model.Job;
import com.jobtrackpro.security.AuthHelper;
import com.jobtrackpro.service.JobService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;



@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/jobs")
public class JobController {
    @Autowired
    private JobService jobService;

    @Autowired 
    private AuthHelper authHelper;

    @PostMapping
    public JobResponseDTO createJob( @Valid @RequestBody JobRequestDTO request) {
        Long userId = authHelper.getCurrentUser().getId();
        Job job = new Job();

        job.setRole(request.getRole());
        job.setCompany(request.getCompany());
        job.setLocation(request.getLocation());
        job.setStatus(request.getStatus());
        job.setAppliedAt(request.getAppliedAt());
        job.setJdLink(request.getJdLink());
        job.setNotes(request.getNotes());
        job.setResumeVersion(request.getResumeVersion());

        Job savedJob = jobService.createJob(job, userId);

        JobResponseDTO response = new JobResponseDTO();

        response.setId(savedJob.getId());
        response.setCompany(savedJob.getCompany());
        response.setRole(savedJob.getRole());
        response.setLocation(savedJob.getLocation());
        response.setStatus(savedJob.getStatus());
        response.setAppliedAt(savedJob.getAppliedAt());
        
        return response;
    }

    @PutMapping("/{jobId}")
    public Job editJob(@PathVariable Long jobId, @RequestBody Job job) {
        Long userId = authHelper.getCurrentUser().getId();
        return jobService.updateJob(jobId, job, userId);
    }

    @DeleteMapping("/{jobId}")
    public void deleteJob(@PathVariable Long jobId){
        Long userId = authHelper.getCurrentUser().getId();
        jobService.deleteJob(jobId, userId);
        
    }

    @GetMapping
    public List<Job> getJobsByUser() {
        Long userId = authHelper.getCurrentUser().getId();
        return jobService.getJobsByUserSorted(userId);
    }

    @GetMapping("/status")
    public List<Job> getJobStatus(@RequestParam String status) {
        Long userId = authHelper.getCurrentUser().getId();
        return jobService.filterByStatus(userId, status);
    }
    
    @GetMapping("/stats")
    public Map<String, Long> getStats() {
        Long userId = authHelper.getCurrentUser().getId();
        List<Job> jobs = jobService.getJobsByUserSorted(userId);

        Map<String, Long> stats = new HashMap<>();
        stats.put("Applied", jobs.stream().filter(j -> "Applied".equals(j.getStatus())).count());
        stats.put("Interview", jobs.stream().filter(j -> "Interview".equals(j.getStatus())).count());
        stats.put("Offer", jobs.stream().filter(j -> "Offer".equals(j.getStatus())).count());
        stats.put("Rejected", jobs.stream().filter(j -> "Rejected".equals(j.getStatus())).count());
        return stats;
    }
    
    
    
}
