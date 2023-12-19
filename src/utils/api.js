import axios from '../utils/axiosCustomize'
// Camera man - By Admin 
const postCreateCameraMan = (data) => {
    return axios.post('api/v1/cameraman', data)
}

const getCameraMan = (query) => {
    return axios.get(`api/v1/cameraman?${query}`)
}

const deleteCameraMan = (id) => {
    return axios.delete(`api/v1/cameraman/${id}`)
}

const updateCameraMan = (data) => {
    return axios.patch('api/v1/cameraman', data)
}

// Notification - By Admin 
const postCreateNoti = (data) => {
    return axios.post('api/v1/notification', data)
}

const getNoti = () => {
    return axios.get(`api/v1/notification`)
}

const deleteNoti = () => {
    return axios.delete(`api/v1/notification`)
}


// TaskList - By Admin -----------------------------------------------------------------------------------------

const deleteTaskListByAdmin = (id) => {
    return axios.delete(`api/v1/tasklist/admin/${id}`)
}

const updateTaskListByAdmin = (data) => {
    return axios.patch('api/v1/tasklist/admin', data)
}

// TaskList - By User -----------------------------------------------------------------------------------------

const getAllTaskListByUser = (query) => {
    return axios.get(`api/v1/tasklist/${query}`)
}

const postCreateTaskListByUser = (data) => {
    return axios.post('api/v1/tasklist', data)
}

const deleteTaskListByUser = (id) => {
    return axios.delete(`api/v1/tasklist/${id}`)
}

const updateTaskListByUser = (data) => {
    return axios.patch('api/v1/tasklist', data)
}

// TaskList Public ------------------------------------------------------------------------------------------------

const getAllUsersWithTask = (query) => {
    return axios.get(`api/v1/users/tasklist?${query}`)
}

// User ----------------------------------------------------------------------------------------------------

const getUsers = (query) => {
    return axios.get(`api/v1/users?${query}`)
}

const postCreateUser = (data) => {
    return axios.post('api/v1/users', data)
}

const deleteUser = (id) => {
    return axios.delete(`api/v1/users/${id}`)
}

const updateUser = (data) => {
    return axios.patch('api/v1/users', data)
}

// Auth ----------------------------------------------------------------------------------------------------

const postLogin = (username, password) => {
    return axios.post('api/v1/auth/login', { username, password })
}

const getAccount = () => {
    return axios.get('api/v1/auth/account')
}

const postLogOut = () => {
    return axios.post('api/v1/auth/logout')
}


export {
    updateCameraMan,
    deleteCameraMan,
    postCreateCameraMan,
    getCameraMan,
    deleteNoti,
    getNoti,
    postCreateNoti,
    deleteTaskListByAdmin,
    updateTaskListByAdmin,
    getAllUsersWithTask,
    getAllTaskListByUser,
    postCreateTaskListByUser,
    deleteTaskListByUser,
    updateTaskListByUser,
    // ----- user
    getUsers,
    postCreateUser,
    deleteUser,
    updateUser,
    // ----- auth
    postLogin,
    getAccount,
    postLogOut,

}