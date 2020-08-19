import request from './network'


export function getSiteData() {
 return request({
    url: '/api/v1/site/getSite',
    header: {
      Accept: 'application/prs.qishu.v1+json'
    }
  })
}
export function getRh(type,page) {
  return request({
     url: '/api/v1/article/grh',
     data:{
       page:page,
       type:type
     },
     header: {
     
     }
   })
 }