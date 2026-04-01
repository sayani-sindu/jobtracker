package com.jobtrackpro.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobtrackpro.model.Reminder;

public interface ReminderRepository extends JpaRepository<Reminder, Long>{
    List<Reminder> findByUser_Id(Long userId);
}
