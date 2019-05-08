// pages/class/index.js
import { ClassicModel } from '../../models/ClassicModel.js'
import { LikeModel } from '../../models/LikeModel.js'
let classicModel = new ClassicModel()
let likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    latest: true,
    previous: false,
    likeStatus: true,//喜欢的状态不能被缓存
    likeCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    //回调函数剥夺了return的能力
    classicModel.getLatestClassic((res) => {
      this.setData({
        classic: res,
        likeStatus: res.like_status,
        likeCount: res.fav_nums
        // ...res 扩展运算符，炸开
      })
      classicModel._setLatestIndex(res.index)
    })
  },

  onLike: function (event) {
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)

  },

  
  onPrevious: function (event) {
    this._updateClassic('previous')
  },

  onNext: function (event) {
    this._updateClassic('next')
  },

  _updateClassic: function (previousOrNext) {
    classicModel.getClassic(previousOrNext, this.data.classic.index, (res) => {
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        previous: classicModel.isPrevious(res.index)
      })
      // 更新喜欢的状态
      classicModel.getClassicLikeStatus(res.type,res.id,(res)=>{
        this.setData({
          likeStatus:res.like_status,
          likeCount:res.fav_nums
        })
      })
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