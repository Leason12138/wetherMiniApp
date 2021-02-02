// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        NowWeatherData: [],
        SevenDayDate: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.testgetStorage()

    },
    getSevenDayDate() {
        let that = this
        return wx.request({
            url: 'https://tianqiapi.com/api?version=v1&appid=55366145&appsecret=oy2iZT1d',
            success: function(res) {
                let date = new Date().getTime()
                that.data.SevenDayDate = res
                wx.setStorage({
                    key: 'SDD',
                    data: [date, that.data.SevenDayDate]
                })
            }
        })
    },
    testsetStorage(keys) {
        // 缓存操作
        this.getNowWeatherData()


        // wx.setStorage({
        //     key: keys || this.data.key,
        //     data: [date, this.data.value]
        // })
    },

    getNowWeatherData() {
        let that = this
        return wx.request({
            url: 'https://tianqiapi.com/api?version=v6&appid=55366145&appsecret=oy2iZT1d',
            success: function(res) {
                let date = new Date().getTime()
                that.data.NowWeatherData = res
                wx.setStorage({
                    key: 'NWD',
                    data: [date, that.data.NowWeatherData]
                })
            }
        })
    },
    testgetStorage() {
        let that = this
        wx.getStorage({
            key: 'NWD',
            success(res) {
                console.log('nwds');
                let date = new Date().getTime()
                if (date - res.data[0] > 10800000) {
                    console.log('nwdth');
                    // ajax 并执行 缓存操作
                    that.getNowWeatherData()
                }
                that.setData({
                    NowWeatherData: res.data
                })

            },
            fail() {
                console.log('nwdf');
                that.getNowWeatherData()

            }
        })
        wx.getStorage({
            key: 'SDD',
            success(res) {
                console.log('sdds');
                let date = new Date().getTime()
                if (date - res.data[0] > 10800000) {
                    console.log('sddth');
                    // ajax 并执行 缓存操作
                    that.getSevenDayDate()
                }
                that.setData({
                    SevenDayDate: res.data
                })
            },
            fail() {
                console.log('sddf');
                that.getSevenDayDate()
            }
        })



    },

    // testremoveStorage(keys) {
    //     wx.removeStorage({
    //         key: keys,
    //         success(res) {
    //             console.log(res)
    //         }
    //     })
    // },
    // testgetStorageinfo() {
    //     wx.getStorageInfo({
    //         success(res) {
    //             console.log(res);
    //             console.log(res.keys)
    //             console.log(res.currentSize)
    //             console.log(res.limitSize)
    //         }
    //     })
    // },
    testclearStorage() { wx.clearStorage() },



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