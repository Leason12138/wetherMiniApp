// pages/searchend/searchend.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SevenDayDate: '',
    NowWeatherData: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let add = app.globalData.add
    console.log(add);
    this.getSearchNowData(add);
    this.getSearchSevenData(add);
  },
  getSearchSevenData(adr) {
    let add = adr
    if (/市$/g.test(add)) {
      add = add.slice(0, 2)
    }
    let that = this
    return wx.request({
      url: `https://tianqiapi.com/api?version=v1&appid=55366145&appsecret=oy2iZT1d&city=${add}`,
      success: function (res) {
        console.log(res);
        that.setData({
          SevenDayDate: res
        })
      }
    })
  },
  getSearchNowData(adr) {
    let add = adr
    if (/市$/g.test(add)) {
      add = add.slice(0, 2)
    }
    let that = this
    return wx.request({
      url: `https://tianqiapi.com/api?version=v6&appid=55366145&appsecret=oy2iZT1d&city=${add}`,
      success: function (res) {
        console.log(res);
        that.setData({
          NowWeatherData: res
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})