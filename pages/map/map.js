// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk');

// 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: 'NXIBZ-MHDCJ-PEVFG-KHOEC-W2UGT-PFBYA' // 必填
});
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value: '',
        Neardata: {
            NearFundata: [],
            NearFooddata: [],
            NearHoteldata: [],
            NearSightsdata: []
        },
        latitude: 23.099994,
        longitude: 113.324520,
        markers: [{
            id: 1,
            latitude: 23.099994,
            longitude: 113.324520,
            name: 'T.I.T 创意园'
        }],
        covers: [{
            latitude: 23.099994,
            longitude: 113.344520,
            iconPath: '/image/location.png'
        }, {
            latitude: 23.099994,
            longitude: 113.304520,
            iconPath: '/image/location.png'
        }]
    },

    // 事件触发，调用接口
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function() {
        // 实例化API核心类
        qqmapsdk = new QQMapWX({
            key: 'NXIBZ-MHDCJ-PEVFG-KHOEC-W2UGT-PFBYA'
        });
    },
    openmap() {
        // 地图选点

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        this.mapCtx = wx.createMapContext('myMap')
        this.backUserNowPos()
        this.getNearFun()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
    getNearFun() {
        qqmapsdk.search({
            keyword: '酒店',
            success: (res) => {
                console.log(res);
                this.setData({
                    NearHoteldata: res.data
                })

            }

        });
        qqmapsdk.search({
            keyword: '娱乐',
            success: (res) => {
                console.log(res);

                this.setData({
                    NearFundata: res.data
                })

            }

        });
        qqmapsdk.search({
            keyword: '景点',
            success: (res) => {
                console.log(res);

                this.setData({
                    NearSightsdata: res.data
                })

            }

        });
        qqmapsdk.search({
            keyword: '餐饮',
            success: (res) => {
                console.log(res);

                this.setData({
                    NearFooddata: res.data
                })

            }
        });
    },
    //获取用户当前的坐标
    getNowLocation() {
        wx.getLocation({
            type: 'gcj02',
            altitude: true,
            success: res => {
                this.setData({
                    latitude: res.latitude,
                    longitude: res.longitude
                })
            }
        })
    },
    backUserNowPos() {
        wx.getLocation({
            type: 'gcj02',
            altitude: true,
            success: res => {
                let latitude = res.latitude
                let longitude = res.longitude
                this.moveToLocation(latitude, longitude)
            }
        })
    },
    //获取地图中间的左边
    getCenterLocation: function() {
        this.mapCtx.getCenterLocation({
            success: (res) => {

                this.setData({
                    latitude: res.latitude,
                    longitude: res.longitude
                })
                console.log(res.longitude)
                console.log(res.latitude)
            }
        })
    },
    moveToLocation(lati, long) {
        this.mapCtx.moveToLocation({
            latitude: lati,
            longitude: long
        })
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