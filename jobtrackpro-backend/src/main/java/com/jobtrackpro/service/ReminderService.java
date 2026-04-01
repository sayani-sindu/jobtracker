package com.jobtrackpro.service;

import java.util.List;

import com.jobtrackpro.model.Reminder;

public interface ReminderService {
    
    Reminder createReminder(Long userId, Reminder reminder);

    List<Reminder> getReminderByUser(Long userId);

    void deleteReminder(Long reminderId);
}
