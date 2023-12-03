import axios from '../utils/axiosCustomize'

// TaskList - By Admin -----------------------------------------------------------------------------------------

const deleteTaskListByAdmin = (id) => {
    return axios.delete(`api/v1/tasklist/admin/${id}`)
}

const updateTaskListByAdmin = (data) => {
    return axios.patch('api/v1/tasklist/admin', data)
}

// TaskList - By User -----------------------------------------------------------------------------------------

const getAllTaskListByUser = (userid, current, pageSize) => {
    return axios.get(`api/v1/tasklist/${userid}?current=${current}&pageSize=${pageSize}`)
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
const getAllUsersWithTask = (current, pageSize) => {
    return axios.get(`api/v1/users/tasklist?current=${current}&pageSize=${pageSize}`)
}

const getAllTaskListWithUserID = (userid, current, pageSize) => {
    return axios.get(`api/v1/users/tasklist/${userid}?current=${current}&pageSize=${pageSize}`)
}

// User ----------------------------------------------------------------------------------------------------

const getUsers = (current, pageSize) => {
    return axios.get(`api/v1/users?current=${current}&pageSize=${pageSize}`)
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
    deleteTaskListByAdmin,
    updateTaskListByAdmin,
    getAllUsersWithTask,
    getAllTaskListWithUserID,
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