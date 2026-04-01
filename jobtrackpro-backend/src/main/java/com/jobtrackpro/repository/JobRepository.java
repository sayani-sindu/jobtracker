package com.jobtrackpro.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobtrackpro.model.Job;

public interface JobRepository extends JpaRepository<Job, Long>{

    List<Job> findByUserId(Long userId);

    List<Job> findByUserIdAndStatus(Long userId, String status);

    int countByUserId(long userId);

    int countByUserIdAndStatus(long userId, String string);

    List<Job> findByUserIdOrderByAppliedAtDesc(Long userId);
}
