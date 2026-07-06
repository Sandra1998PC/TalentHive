import commonAPI from "./commonAPI";

const serverURL = "https://talenthivebackend.onrender.com"

// Register

export const addRegData = async (data) => {
    return await commonAPI("POST",`${serverURL}/userLoginDetails`,data)
}

// Get all data

export const getAllRegData = async () => {
    return await commonAPI("GET",`${serverURL}/userLoginDetails`,"")
}

// Update password
export const updatePassword = async (data,id) => {
    return await commonAPI("PUT",`${serverURL}/userLoginDetails/${id}`,data)
}

// add employer

export const addEmployerData = async (data) => {
    return await commonAPI("POST",`${serverURL}/employerData`,data)
}

// Get one employer data

export const getEmpData = async () => {
    return await commonAPI("GET",`${serverURL}/employerData`,"")
}

// Update employer
export const updateEmpDetails = async (data,id) => {
    return await commonAPI("PUT",`${serverURL}/employerData/${id}`,data)
}

// add user

export const addUserData = async (data) => {
    return await commonAPI("POST",`${serverURL}/userData`,data)
}

// Get one user data

export const getUserData = async () => {
    return await commonAPI("GET",`${serverURL}/userData`,"")
}

// Update user
export const updateUserDetails = async (data,id) => {
    return await commonAPI("PUT",`${serverURL}/userData/${id}`,data)
}

// post a job

export const addJob = async (data) => {
    return await commonAPI("POST",`${serverURL}/jobs`,data)
}

// Update job
export const updateJobDetails = async (data,id) => {
    return await commonAPI("PUT",`${serverURL}/jobs/${id}`,data)
}

//delete job

export const deleteJob = async (id) => {
    return await commonAPI("DELETE",`${serverURL}/jobs/${id}`,"")
}

// Get one user data

export const getJobs = async () => {
    return await commonAPI("GET",`${serverURL}/jobs`,"")
}

// submit application

export const submitApplication = async (data) => {
    return await commonAPI("POST",`${serverURL}/applications`,data)
}

// Update Application
export const updateapplications = async (data,id) => {
    return await commonAPI("PUT",`${serverURL}/applications/${id}`,data)
}

// Get Application
export const getApplications = async () => {
    return await commonAPI("GET",`${serverURL}/applications`,"")
}