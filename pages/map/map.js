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
        bool: false,
        endPoint: { //终点
            'name': '',
            'latitude': 0,
            'longitude': 0
        },
        targetlocation: {},
        sugbool: true,
        value: '',
        sugsearch: [],
        Neardata: [
            [],
            [],
            [],
            [],
        ],
        latitude: 23.099994,
        longitude: 113.324520,
        markers: [{
            id: 1,
            latitude: 23.099994,
            longitude: 113.324520,
            name: 'T.I.T 创意园'
        }]
    },
    totarget() {
        if (this.data.endPoint.name == '') {
            Toast.fail('还没有定想要去的地方噢~');
        } else {
            wx.navigateTo({
                url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + JSON.stringify(this.data.endPoint)
            });
        }

    },
    bindsug(a) {
        this.setData({
            sugsearch: this.data.Neardata[Number(a.target.dataset.idx)],
            sugbool: true
        })
        console.log(this.data.sugbool);

    },
    onChange() {
        this.setData({
            sugbool: true
        })
        this.getSuggestion()
    },
    litap(e) {
        this.setData({
            value: e.target.dataset.it.title,
            ['markers[0].id']: 1,
            ['markers[0].latitude']: e.target.dataset.it.location.lat,
            ['markers[0].longitude']: e.target.dataset.it.location.lng,
            ['markers[0].name']: e.target.dataset.it.title,
            ['endPoint.name']: e.target.dataset.it.title,
            ['endPoint.latitude']: e.target.dataset.it.location.lat,
            ['endPoint.longitude']: e.target.dataset.it.location.lng,
            sugbool:false

        })
        this.moveToLocation(
            e.target.dataset.it.location.lat,
            e.target.dataset.it.location.lng
        )
        // this.setData({
        //     markers: {
        //         id: 1,
        //         latitude: e.target.dataset.it.location.lat,
        //         longitude: e.target.dataset.it.location.lng,
        //         name: e.target.dataset.it.title
        //     }
        // })


    },
    litouchstart(){
        this.setData({
          sugbool:true
        })
     },
   

    inputFocus() {
        this.setData({
            sugbool: true
        })
    },
    inputBlur() {
        this.setData({
            sugbool: false
        })
    },
    getSuggestion() {
        if (this.data.value == '') {
            console.log('null');
            this.setData({
                sugbool: false
            })
            this.setData({
                sugsearch: []
            })

        } else {
            qqmapsdk.getSuggestion({
                keyword: this.data.value,
                success: (res) => {
                    if (res.data[0] == null) {
                        this.setData({
                            sugsearch: [{ title: '无相关推荐' }]
                        })
                    } else {
                        this.setData({
                            sugsearch: res.data
                        })
                    }
                }
            })
        }
    },
    // 事件触发，调用接口
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
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
    onReady: function () {
        this.mapCtx = wx.createMapContext('myMap')
        this.backUserNowPos()
        this.getNearFun()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },
    getNearFun() {
        qqmapsdk.search({
            keyword: '酒店',
            success: (res) => {
                console.log(res);
                this.setData({
                    'Neardata[1]': res.data
                })

            }

        });
        qqmapsdk.search({
            keyword: '娱乐',
            success: (res) => {
                console.log(res);
                this.setData({
                    'Neardata[0]': res.data
                })

            }

        });
        qqmapsdk.search({
            keyword: '景点',
            success: (res) => {
                console.log(res);
                this.setData({
                    'Neardata[3]': res.data
                })

            }

        });
        qqmapsdk.search({
            keyword: '餐饮',
            success: (res) => {
                console.log(res);
                this.setData({
                    'Neardata[2]': res.data
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
    getCenterLocation: function () {
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