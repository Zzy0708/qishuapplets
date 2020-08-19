// pages/article/article.js
import { getParent, } from '../../utils/category.js'
import { getArticle, } from '../../utils/article.js'
const TOP_DISTANCE  = 1
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    categorys: [],
    articles: [],
    tabulous: {},
    page:0,
    currentType:0,
    showBackTop: false,
    tabScrollTop: 0
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getData()
  },
  // 接口列表
  _getData() {
    this._getParent()
    this._getArticle(0,1)
  },
  // 获取父级分类
  _getParent() {
    getParent().then(res => {
      const categorys = res.data.data.list
      const tabulous  = this.data.tabulous;
      for(let i=0;i<categorys.length;i++) {
        tabulous[i] = {
          'page': 0,
          'id':categorys[i].id,
          'list': [],
          pageRequest:true,
        };
      }
      this.setData({
        categorys: categorys,
      })
    })
  },
  // 获取文章列表
  _getArticle(index,cid) {  
    const page = this.data.page+1
    getArticle(cid,page).then(res => {
      const list = res.data.data.list;
      const tabulous = this.data.tabulous;
      if(page!=1) {
        tabulous[index].list.push(...list);
      } else {
        tabulous[index].list = list;
      }
      if(list.length!=0) {
        tabulous[index].page += 1;
        tabulous[index].pageRequest = true;
      } else {
        tabulous[index].pageRequest = false;
      }
      this.setData({
        tabulous: tabulous
      })
    })
  },
  // 上拉加载
  onReachBottom() {
    const currentType= this.data.currentType
    const tabulous = this.data.tabulous;
    let pageRequest = tabulous[currentType].pageRequest
    let cid = tabulous[currentType].id
    if(pageRequest) {
      this._getArticle(this.data.currentType,cid)
    }
  },

  onChange(event) {
    let index = event.detail.index
    const tabulous = this.data.tabulous
    let cid = tabulous[index].id
    this._getArticle(index,cid)
    this.setData({
      currentType:index
    })
  },

  onShow() {
    wx.createSelectorQuery().select('.tab-control').boundingClientRect(rect => {
      this.data.tabScrollTop = rect.top
    }).exec()
  },

  onPageScroll(options) {
    const scrollTop = options.scrollTop
    const flag1 = scrollTop >= TOP_DISTANCE
    if(flag1 != this.data.showBackTop) {
      this.setData({
        showBackTop: scrollTop > TOP_DISTANCE,
      })
    }
  },
  goToPage(e) {
    wx.navigateTo({
      url: '/pages/content/content?id='+e.detail.id+'&title='+e.detail.title,
    })
  }

})