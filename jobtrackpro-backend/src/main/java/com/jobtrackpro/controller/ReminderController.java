package com.jobtrackpro.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobtrackpro.model.Reminder;
import com.jobtrackpro.security.AuthHelper;
import com.jobtrackpro.service.ReminderService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/reminders")
public class ReminderController {
    @Autowired 
    private ReminderService reminderService;

    @Autowired 
    private AuthHelper authHelper;

    

    @PostMapping
    public Reminder createReminder(@RequestBody Reminder reminder) {
        Long userId = authHelper.getCurrentUser().getId();
        return reminderService.createReminder(userId, reminder);
    }

    @GetMapping
    public List<Reminder> getReminders() {
        Long userId = authHelper.getCurrentUser().getId();
        return reminderService.getReminderByUser(userId);
    }

    @DeleteMapping("/{reminderId}")
    public void deleteReminder(@PathVariable Long reminderId) {
        reminderService.deleteReminder(reminderId);
    }
}

