// components/like/index.js
Component({
  /**
   * 组件的属性列表
   * 对外
   */
  properties: {
    like:{
      type:Boolean
    },
    count:{
      type:Number
    }
  },

  /**
   * 组件的初始数据
   * 私有
   */
  data: {
    yesSrc:'images/like.png',
    noSrc:'images/like@dis.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
      onLike:function(event){
        let count = this.properties.count
        let like = this.properties.like

        count = like?count-1:count+1
        this.setData({
          count:count,
          like:!like
        })

        // //自定义监听事件like(类tap触摸) 激活
        let behavior = this.properties.like?'like':'cancel'
        this.triggerEvent('like',{
          behavior:behavior
        },{})
      }

  }
})
