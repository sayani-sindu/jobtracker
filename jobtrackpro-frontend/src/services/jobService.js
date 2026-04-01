import api from "../api/api";

export const getJobs = () =>{
    return api.get(`/jobs`);
}

export const createJob = (job) =>{
    return api.post(`/jobs`, job);
}

export const updateJob = (id, job) =>{
    return api.put(`/jobs/${id}`, job);
}

export const deleteJob = (id) =>{
    return api.delete(`/jobs/${id}`);
}

export const getJobStats = () =>{
    return api.get(`/jobs/stats`);
}