// Components/NowWether.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        nowdata: Object,
        sevendata: Object,
        title: String,
        scrollTop: Number
    },

    /**
     * 组件的初始数据
     */
    data: {
        show: false,
        updateTimeShow: true,
        posOrLanBug: 0
    },
    lifetimes: {
        ready: function () {
            var that = this
            // 在组件在视图层布局完成后执行
            setTimeout(function () {
                that.setData({
                    posOrLanBug: 1
                })
            }, 5000)()
        },
    },
    methods: {
        closeUpdateTime() {
            this.setData({ updateTimeShow: false });
        },
        showPopup() {
            console.log(1);
            this.setData({ show: true });
        },
        onClose() {
            this.setData({ show: false });
        },
        intoseachpage() {
            wx.navigateTo({
                url: '../../pages/search/search'
            })
        }

    },

})