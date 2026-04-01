package com.jobtrackpro.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobtrackpro.model.Reminder;
import com.jobtrackpro.model.User;
import com.jobtrackpro.repository.ReminderRepository;
import com.jobtrackpro.repository.UserRepository;
import com.jobtrackpro.service.ReminderService;

@Service
public class ReminderServiceImpl implements ReminderService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReminderRepository reminderRepository;

    
    public Reminder createReminder(Long userId, Reminder reminder) {
        User user = userRepository.findById(userId).orElseThrow();
        reminder.setUser(user);
        return reminderRepository.save(reminder);

    }

    
    public List<Reminder> getReminderByUser(Long userId) {
        return reminderRepository.findByUser_Id(userId);
    }


    public void deleteReminder(Long reminderId) {
       reminderRepository.deleteById(reminderId);
    }
    
}
