// pages/home/home.js
// 引入SDK核心类
import Toast from '@vant/weapp/toast/toast'
var QQMapWX = require('../../libs/qqmap-wx-jssdk');

// 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: 'NXIBZ-MHDCJ-PEVFG-KHOEC-W2UGT-PFBYA' // 必填
});
let plugin = requirePlugin('routePlan');
let key = 'NXIBZ-MHDCJ-PEVFG-KHOEC-W2UGT-PFBYA'; //使用在腾讯位置服务申请的key
let referer = '查悦天气 '; //调用插件的app的名称

Page({

    /**
     * 页面的初始数据
     */
    data: {
        NowWeatherData: [],
        SevenDayDate: [],
        titledata: {},
        scrollTop: 0
    },
    onPageScroll(e) {
        // 监听屏幕滚动
        this.setData({
            scrollTop: e.scrollTop
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.mapCtx = wx.createMapContext('myMap')
        this.backUserNowPos()
    },
    backUserNowPos() {
        wx.getLocation({
            type: 'gcj02',
            altitude: true,
            success: res => {
                let latitude = res.latitude
                let longitude = res.longitude
                console.log(latitude, longitude)
                qqmapsdk.reverseGeocoder({
                    location: {
                        // 你的经纬度
                        latitude: latitude,
                        longitude: longitude
                    },
                    success: (res) => {
                        this.setData({
                            titledata: res.result.address_component.district
                        })
                        this.testgetStorage(res.result.address_component.district)

                    },
                    fail: function(res) {
                        console.log(res);
                    }
                });
            }
        })
    },
    getSevenDayDate(k) {
        let that = this
        console.log(k);
        return wx.request({
            url: `https://tianqiapi.com/api?version=v1&appid=55366145&appsecret=oy2iZT1d&city=${k}`,
            success: function(res) {
                let date = new Date().getTime()
                if (res.data.errcode) {
                    console.log('sdd获取数据不正常');
                } else {
                    console.log('sdd获取数据正常');
                    that.setData({
                        SevenDayDate: [date, res]
                    })
                    wx.setStorage({
                        key: 'SDD',
                        data: [that.data.SevenDayDate]
                    })
                }
            }
        })
    },
    // testsetStorage(keys) {
    //     // 缓存操作
    //     this.getNowWeatherData()


    //     // wx.setStorage({
    //     //     key: keys || this.data.key,
    //     //     data: [date, this.data.value]
    //     // })
    // },

    getNowWeatherData(k) {
        console.log('ss=>', k);
        let that = this
        return wx.request({
            url: `https://tianqiapi.com/api?version=v6&appid=55366145&appsecret=oy2iZT1d&city=${k}`,
            success: function(res) {
                let date = new Date().getTime()
                if (res.data.errcode) {
                    console.log('nwd获取数据不正常');

                } else {
                    console.log('nwd获取数据正常');

                    that.setData({
                        NowWeatherData: [date, res]
                    })
                    console.log('gnwdsuss');
                    wx.setStorage({
                        key: 'NWD',
                        data: [that.data.NowWeatherData]
                    })
                }
            }
        })
    },
    testgetStorage(keys) {
        let k = keys.slice(0, 2) || ''
        let that = this
        wx.getStorage({
            key: 'NWD',
            success(res) {
                console.log('nwds');
                let date = new Date().getTime()
                if (k != res.data[0][1].data.city) {
                    console.log('nwd地区出错');
                    // ajax 并执行 缓存操作
                    that.getNowWeatherData(k)
                } else if (date - res.data[0][0] > 3600000) {
                    console.log('nwd储存时间过期');
                    // ajax 并执行 缓存操作
                    that.getNowWeatherData(k)
                } else if (res.data[0][1].data.errcode) {
                    console.log('nwd提取的数据有问题');
                    that.getNowWeatherData(k)

                } else {
                    console.log('nwd储存时间未过期');
                    console.log('nwd地区未出错');
                    that.setData({
                        NowWeatherData: res.data[0]
                    })
                }
            },
            fail() {
                console.log('nwdf');
                that.getNowWeatherData(k)

            }
        })
        wx.getStorage({
            key: 'SDD',
            success(res) {
                console.log('sdds');
                let date = new Date().getTime()
                if (k != res.data[0][1].data.city) {
                    console.log('sdd地区出错');
                    // ajax 并执行 缓存操作
                    that.getSevenDayDate(k)
                } else if (date - res.data[0][0] > 3600000) {
                    console.log('sdd储存时间过期');

                    // ajax 并执行 缓存操作
                    that.getSevenDayDate(k)
                } else if (res.data[0][1].data.errcode) {
                    console.log('sdd提取的数据有问题');
                    that.getSevenDayDate(k)
                } else {
                    console.log('sdd储存时间未过期');
                    console.log('sdd地区未出错');

                    that.setData({
                        SevenDayDate: res.data[0]
                    })
                }

            },
            fail() {
                console.log('sddf');
                that.getSevenDayDate(k)
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

    },
})