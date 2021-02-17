// pages/search/search.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value: '',
        hotsearch: ["北京市", "上海市", "广州市", "深圳市", "杭州市", "苏州市", "武汉市", "南京市", "重庆市", "成都市", "天津市", "无锡市", "长沙市", "郑州市", "宁波市", "西安市", "济南市", "青岛市", "福州市", "合肥市"],

    },
    onChange(e) {
        this.setData({
            value: e.detail,
        });
    },

    chooceSearch(e) {
        this.setData({
            value: e.target.dataset.val.trim()
        })
        this.onClick()
    },
    onClick() {
        app.globalData.add = this.data.value
        console.log(app.globalData.add);
        wx.navigateTo({
            url: '../searchend/searchend',
        })

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})