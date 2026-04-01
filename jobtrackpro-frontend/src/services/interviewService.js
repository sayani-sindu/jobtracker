import api from "../api/api"

export const createRound = (round, jobId) =>{
    return api.post("/interviews", round, {params: {jobId}});
}

export const getRounds = (jobId) =>{
    return api.get("/interviews", {params: {jobId}});
}

export const deleteRound = (roundId) =>{
    return api.delete(`/interviews/${roundId}`)
}
