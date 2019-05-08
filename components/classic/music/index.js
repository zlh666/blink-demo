// components/classic/music/index.js
import { classicBeh } from '../class-behav.js'
const mMgr = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],/*类似多继承 */
  properties: {
    src: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playSrc: "images/player@play.png",
    pauseSrc: "images/player@pause.png",
    tagSrc: "images/music@tag.png",
    playing: false
  },

  /**
   * 组件进入页面节点时触发
   * 注意 hidden 和 wx:if的区别 hidden不会再次初始化加载，不会触发此方法
   */
  attached: function (event) {
    this._recoverStatus()
    //监听背景音频对象
    this._monitoSwitch()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTouch: function (event) {
      if (!this.properties.playing) {
        this.setData({
          playing: true
        })
        mMgr.title = this.properties.src
        mMgr.src = this.properties.src
      } else {
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },
    //如果播放的音乐是当前组件的音乐，设置正在播放状态，否则是等待播放状态
    _recoverStatus: function () {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      if (this.properties.src == mMgr.src) {
        this.setData({
          playing: true
        })
      }
    },
    _monitoSwitch: function () {
      mMgr.onEnded((res) => {
        this._recoverStatus()
      })
      mMgr.onPlay((res) => {
        this._recoverStatus()
      })
      mMgr.onPause((res) => {
        this._recoverStatus()
      })
      mMgr.onStop((res) => {
        this._recoverStatus()
      })
    }
  }
})
