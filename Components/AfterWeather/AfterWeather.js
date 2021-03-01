// Components/AfterWeather/AfterWeather.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    sevendata:Object
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
    toSevenDay(){
      wx.navigateTo({
        url: '../../pages/sevenday/sevenday',
        success: (res)=> {
          // 通过eventChannel向被打开页面传送数据
          console.log(this.data.sevendata );
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: this.data.sevendata })
        }
    })
    }
  }
})
