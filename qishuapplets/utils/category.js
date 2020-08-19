import request from './network'

export function getListTree() {
  return request({
     url: '/api/v1/category/getListTree',
     header: {
      
     }
   })
 }

 export function getParent() {
  return request({
     url: '/api/v1/category/getParent',
     header: {
      
     }
   })
 }