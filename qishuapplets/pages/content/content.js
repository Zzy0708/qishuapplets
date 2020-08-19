// pages/content/content.js
import {
  getRowData,
} from '../../utils/article.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      info:[],
      isLoading: true,
      article: {}          
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title,
    })
    this._getRowData(options.id)
  },
  _getRowData(id) {
    getRowData(id).then(res => {
      const info = res.data.data.info;
      let result = app.towxml(info.markdown,'markdown',{
        base:'http://www.zzthot.cn',             // 相对资源的base路径
        theme:'light',                   // 主题，默认`light`
      });
      this.setData({
        info: info,
        article:result,
        isLoading: false
      })
    });
  }

})