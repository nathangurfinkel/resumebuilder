import axios from 'axios'

var apiHost = 'https://seahorse-app-cyj7w.ondigitalocean.app/api'
// apiHost = 'http://localhost:8080/api'

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
        headers: {},
    }

    return axios(config)
}

export function postNewResume(data) {
    //add user id to data
    console.log('postNewResume', data)
    data.user_id = localStorage.getItem('userId')

    let config = {
        method: 'post',
        url: `${apiHost}/resumes/add`,
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
        method: 'post',
        url: `${apiHost}/resumes/update/${data._id}`,
        headers: {
            'Content-Type': 'application/json',
        },
        //add user id to data
        data: data,
    }

    return axios(config)
}

export function deleteResumeById(id) {
    let config = {
        method: 'delete',
        url: `${apiHost}/resumes/delete/${id}`,
        headers: {},
    }

    return axios(config)
}

// export function getUserById(token: string) {
//     let config = {
//         method: 'get',
//         url: `${apiHost}/users`,
//         headers: {
//             'x-auth-token': token
//         },
//     };

//     return axios(config);
// }

export function postSignUp(data) {
    let config = {
        method: 'post',
        url: `${apiHost}/auth/signup`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    }

    return axios(config)
}

export function postSignIn(data) {
    let config = {
        method: 'post',
        url: `${apiHost}/auth/signin`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    }

    return axios(config)
}
