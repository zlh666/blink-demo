// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    latest:Boolean,
    previous:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    leftSrc: "images/triangle@left.png",
    rightSrc: "images/triangle@right.png",
    disLeftSrc: "images/triangle.dis@left.png",
    disRightSrc: "images/triangle.dis@right.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPrevious: function (event) {
      if(!this.properties.previous) {
        this.triggerEvent('previous', {}, {})
      }
    },

    onNext:function(event){
      if(!this.properties.latest){
        this.triggerEvent('next',{},{})
      }
    }

  }
})