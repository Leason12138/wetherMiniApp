// Components/NowWether.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        nowdata: Object,
        sevendata: Object,

    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        intoseachpage() {
            wx.navigateTo({
                url: '../../pages/search/search'
            })
        }
    }
})