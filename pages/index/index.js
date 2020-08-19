//index.js
import {
  getSiteData,
  getRh
} from '../../utils/index.js'
const types = ['r','h']
const TOP_DISTANCE  = 500
Page({
 data: {
  banners: [],
  tabs: [],
  tabulous: {
      r: {page:0,list:[],pageRequest:true},
      h: {page:0,list:[],pageRequest:true}
  },
  active: 0,
  currentType: 'r',
  showBackTop: false,
  isTabFixed: false,
  tabScrollTop: 0,
  isLoading: true
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1.请求首页接口
    this._getSiteData();
    //2.请求推荐和热门
    this._getRh('r');
    this._getRh('h');
    this.setData({
        isLoading: false
    })
  },
  //--------------请求首页轮播图接口--------------
  _getSiteData() {
    getSiteData().then(res => {
      const banners = res.data.data.banner_list;
      const tabs = res.data.data.tab_list;
      this.setData({
        banners: banners,
        tabs: tabs
      })
    });
  },
  //--------------请求推荐和热门--------------
  _getRh(type) {
    const page = this.data.tabulous[type].page+1
    getRh(type,page).then(res => {
      const list = res.data.data.list;
      const tabulous = this.data.tabulous;

      tabulous[type].list.push(...list);
      if(list.length!=0) {
        tabulous[type].page += 1;
        tabulous[type].pageRequest = true;
      } else {
        tabulous[type].pageRequest = false;
      }
      this.setData({
        tabulous: tabulous
      })
    })
  },

  onChange(event) {
    const index = event.detail.index
    this.setData({
      currentType:types[index]
    })
  },

  onReachBottom() {
    const currentType= this.data.currentType
    const tabulous = this.data.tabulous;
    let pageRequest = tabulous[currentType].pageRequest
    if(pageRequest) {
      this._getRh(this.data.currentType)
    }
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
