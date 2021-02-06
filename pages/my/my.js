const app = getApp()
import Toast from '@vant/weapp/toast/toast'

wx.cloud.init()
const db = wx.cloud.database()
const data = db.collection('weather_data')
wx.login().then(res => {
    console.log(res);
    console.log(res.code);
})
Page({

    /**
     * 页面的初始数据
     */
    data: {
        textstr: '',
        showdata: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.get()
    },
    get() {
        let that = this
        data.get({
            success: function (res) {
                // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
                that.setData({
                    showdata: res.data
                })
                console.log(that.data.showdata);
            }
        })
    },
    add() {
        let that = this;
        //trim() 去掉空格
        if (that.data.textstr.trim() == '') {
            Toast.fail('输入不能为空');
        } else {
            data.add({
                // data 字段表示需新增的 JSON 数据
                data: {
                    // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
                    description: this.data.textstr,
                    due: new Date(),
                    tags: [
                        "cloud",
                        "database"
                    ],
                    done: false
                },
                success: function (res) {
                    console.log(res);
                    that.setData({
                        textstr: ''
                    })
                    Toast.success('已储存');
                }
            })
        }

    },
    tickToggle(id) {
        db.collection('data').doc(id).update({
            // data 传入需要局部更新的数据
            data: {
                // 表示将 done 字段置为 true
                done: true
            },
            success: function (res) {
                console.log(res.data)
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