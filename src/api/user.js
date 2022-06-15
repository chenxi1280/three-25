import request from '@/utils/request'

export function getTokenAPI(data) {
  return request({
    url: 'user/getToken',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getUserList(data) {
  return request({
    url: '/user/getUserList',
    method: 'post',
    data
  })
}

export function saveUser(data) {
  return request({
    url: '/user/saveUser',
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/user/deleteUser',
    method: 'post',
    data
  })
}

export function updateUserPassWord(data) {
  return request({
    url: '/user/updateUserPassWord',
    method: 'post',
    data
  })
}

