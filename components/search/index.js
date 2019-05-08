import { KeywordModel } from '../../models/KeywordModel.js'
import { BookModel } from '../../models/BookModel.js'
import { paginationBev } from '../behaviors/pagination.js';
const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    searching: false,
    historyWords: [],
    hotWords: [],
    q: '',
    loadingCenter: false
  },
  behaviors: [paginationBev],
  attached() {
    this.setData({
      historyWords: keywordModel.getHistory()
    })

    keywordModel.getHot().then((res) => {
      this.setData({
        hotWords: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onConfirm(event) {
      //初始化
      this._showResult()
      this._showLoadingCenter()
      const q = event.detail.value || event.detail.content
      this.setData({
        q
      })
      bookModel.search(0, q).then((res) => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        keywordModel.setHistory(q)
        this._hideLoadingCenter()
      })

    },

    onDelete() {
      this.initialize()
      this._closeResult()
    },

    onCancel() {
      this.initialize()
      this.triggerEvent('cancel', {}, {})
    },

    loadMore() {
      if (!this.data.q) return
      if (this.isLocked()) return
      if (this.hasMore()) {
        this.locked()
        bookModel.search(this.getCurrentStart(), this.data.q).then((res) => {
          this.setMoreData(res.books)
          this.unLocked()
        }, (error) => {
          this.unLocked()
        })
      }
    },

    _closeResult(){
      this.setData({
        searching:false,
        q:''
      })
    },

    _showResult(){
      this.setData({
        searching:true
      })
    },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

  }
})
