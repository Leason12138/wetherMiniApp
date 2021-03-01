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
        updateTimeShow: true
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