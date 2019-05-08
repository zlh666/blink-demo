// pages/book-detail/index.js
import { BookModel } from '../../models/BookModel.js'
import { LikeModel } from '../../models/LikeModel.js'

const bookModel = new BookModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: null,
    likeStatus: false,
    likeCount: 0,
    comments: null,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()
    const bid = options.bid
    const book = bookModel.getDetail(bid)
    const like = bookModel.getLikeStatus(bid)
    const comments = bookModel.getComments(bid)

    //所有请求都完成才执行回调
    Promise.all([book,like,comments]).then((res)=>{
      this.setData({
        book: res[0],
        likeStatus:res[1].like_status,
        likeCount:res[1].fav_nums,
        comments:res[2].comments,

      })
      wx.hideLoading()
    })

    //race 竞争：只返回最快的请求结果
  
  },

  onLike: function (event) {
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.book.id, 400)
  },

  onFakePost: function (event) {
    this.setData({
      posting: true
    })
  },

  onCancel: function (event) {
    this.setData({
      posting: false
    })
  },

  onPost: function (event) {
    const content = event.detail.content || event.detail.value

    if (!content) return

    if (content.length > 12) {
      wx.showToast({
        title: '短评最多12字',
        icon: 'none'
      })
      return
    }

    bookModel.postComment(this.data.book.id, content).then((res) => {
      wx.showToast({
        title: '+1',
        icon: 'none'
      })
      
      this.data.comments.unshift({
        content: content,
        nums: 1
      })

      this.setData({
        comments: this.data.comments,
        posting: false
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