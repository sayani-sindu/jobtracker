import api from "../api/api"

export const createReminder = (reminder) => {
    return api.post(`/reminders`, reminder);
}
export const getReminders   = () => {
    return api.get(`/reminders`);
}

export const deleteReminder = (reminderId) => {
    return api.delete(`/reminders/${reminderId}`);
}