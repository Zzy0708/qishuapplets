import request from './network'

export function getArticle(tabId,page) {
  return request({
     url: '/api/v1/article/getArticle',
     data: {
       cid:tabId,
       page:page
     },
     header: {
     
     }
   })
 }
 export function getRowData(id) {
  return request({
     url: '/api/v1/article/getRowData',
     data: {
       id:id,
     },
     header: {
     
     }
   })
 }
 
