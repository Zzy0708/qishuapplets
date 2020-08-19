import { baseUrl } from './config.js'

export default function(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl+ options.url,
      method:options.method || 'GET',
      data: options.data || {},
      header: options.data || {},
      success: resolve,
      fail: reject
    })
  })
}