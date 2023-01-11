import axios from 'axios'

// var apiHost = 'https://seahorse-app-cyj7w.ondigitalocean.app/api'
var apiHost = 'http://localhost:8080/api'

//routes :
// auth
// router.post('/login', authController.login);
// router.post('/register', authController.register);
//
// router.get('/', resumesController.list);
// router.get('/:id', resumesController.show);
// router.post('/', resumesController.create);
// router.put('/:id', resumesController.update);
// router.delete('/:id', resumesController.delete);
//
// router.get('/', usersController.list);
// router.get('/:id', usersController.show);
// router.post('/', usersController.create);
// router.put('/:id', usersController.update);
// router.delete('/:id', usersController.delete);
//
//
//

export function getResumeList() {
    const userId = localStorage.getItem('userId')
    const params = { user_id: userId }
    let config = {
        method: 'get',
        url: `${apiHost}/resumes`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        params: params,
    }
    return axios(config)
}

export function getResumeById(id) {
    let config = {
        method: 'get',
        url: `${apiHost}/resumes/${id}`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    }

    return axios(config)
}

export function postNewResume(data) {
    //add user id to data
    data.user_id = localStorage.getItem('userId')

    let config = {
        method: 'post',
        url: `${apiHost}/resumes`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    }

    return axios(config)
}

export function updateResumeById(data) {
    //add user id to data
    data.user_id = localStorage.getItem('userId')
    let config = {
        method: 'put',
        url: `${apiHost}/resumes/update/${data.id}`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    }

    return axios(config)
}

export function deleteResumeById(id) {
    let config = {
        method: 'delete',
        url: `${apiHost}/resumes/${id}`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    }

    return axios(config)
}

export function getUserList() {
    let config = {
        method: 'get',
        url: `${apiHost}/users`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    }

    return axios(config)
}

export function getUserById(id) {
    let config = {
        method: 'get',
        url: `${apiHost}/users/${id}`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    }

    return axios(config)
}

export function postNewUser(data) {
    let config = {
        method: 'post',
        url: `${apiHost}/users`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    }

    return axios(config)
}

export function updateUserById(data) {
    let config = {
        method: 'put',
        url: `${apiHost}/users/update/${data.id}`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    }

    return axios(config)
}

export function deleteUserById(id) {
    let config = {
        method: 'delete',
        url: `${apiHost}/users/${id}`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    }

    return axios(config)
}

export function login(data) {
    let config = {
        method: 'post',
        url: `${apiHost}/auth/login`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    }

    return axios(config)
}

export function register(data) {
    let config = {
        method: 'post',
        url: `${apiHost}/auth/register`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    }

    return axios(config)
}

// Path: src\components\ResumeList.jsx
