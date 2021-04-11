const app = getApp()
import Toast from '@vant/weapp/toast/toast'

wx.cloud.init()
const db = wx.cloud.database()
const data = db.collection('weather_data')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        textstr: '',
        showdata: [],
        showdatalength: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */

    // 

    // 


    onLoad: function(options) {
        this.get()
        Toast.success('  左滑已做\n 右滑删除\n上限20条噢');
        Date.prototype.Format = function(fmt) {
            var o = {
                'M+': this.getMonth() + 1,
                'd+': this.getDate(),
                'H+': this.getHours(),
                'm+': this.getMinutes(),
                's+': this.getSeconds(),
                'S+': this.getMilliseconds()
            };
            //因为date.getFullYear()出来的结果是number类型的,所以为了让结果变成字符串型，下面有两种方法：
            if (/(y+)/.test(fmt)) {
                //第一种：利用字符串连接符“+”给date.getFullYear()+''，加一个空字符串便可以将number类型转换成字符串。
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp('(' + k + ')').test(fmt)) {
                    //第二种：使用String()类型进行强制数据类型转换String(date.getFullYear())，这种更容易理解。
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(String(o[k]).length)));
                }
            }
            return fmt;
        };

    },
    tickToggleFn(e) {
        // console.log(e.currentTarget.dataset.id);
        let target = this.data.showdata.filter(ele => {
            return ele._id == e.currentTarget.dataset.id
        })
        if (target[0].done) {
            data.doc(e.currentTarget.dataset.id).update({
                // data 传入需要局部更新的数据
                data: {
                    // 表示将 done 字段置为 true
                    done: false
                },
                success: () => {
                    this.get()
                }
            })
        } else {
            data.doc(e.currentTarget.dataset.id).update({
                // data 传入需要局部更新的数据
                data: {
                    // 表示将 done 字段置为 true
                    done: true
                },
                success: () => {
                    this.get()
                }
            })
        }
    },
    tickDelFn(e) {
        // remove
        // console.log(e.currentTarget.dataset.id);
        data.doc(e.currentTarget.dataset.id).remove({
            success: () => {
                this.get()
            }
        })
    },
    get() {
        let that = this
        data.get({
            success: function(res) {
                // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
                that.setData({
                    showdata: res.data.reverse(),
                    showdatalength: res.data.length
                })
            }
        })
    },
    add() {
        let that = this;
        // let timer=new Date().toLocaleDateString()+' '+new Date().toTimeString().slice(0,9);
        let timer = new Date().Format('yyyy-MM-dd HH:mm:ss');
        console.log(timer);
        //trim() 去掉空格
        if (that.data.showdatalength >= 20) {
            Toast.fail('已达备忘上限');

        } else if (that.data.textstr.trim() == '') {
            Toast.fail('输入不能为空');
            that.setData({
                textstr: ''
            })
        } else {
            data.add({
                // data 字段表示需新增的 JSON 数据
                data: {
                    // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
                    description: this.data.textstr,
                    timer: timer,
                    tags: [
                        "cloud",
                        "database"
                    ],
                    done: false
                },
                success: function(res) {
                    that.setData({
                        textstr: ''
                    })
                    Toast.success('已储存');
                    that.get()
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
            success: function(res) {}
        })
    },
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