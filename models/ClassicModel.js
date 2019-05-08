import {
  Http
} from '../utils/Http.js'

class ClassicModel extends Http {
  getLatestClassic(callBackFuc) {
    this.request({
      "url": "/classic/latest",
      "success": (res) => {
        callBackFuc(res)
        wx.setStorageSync(this._getKey(res.index),res)
      }
    })
  }

  getClassic(previousOrNext, index, callBackFuc){
    let _index = previousOrNext=='next'?index+1:index-1
    let classic = wx.getStorageSync(this._getKey(_index))
    if(!classic){
      this.request({
        "url": `/classic/${index}/${previousOrNext}`,//模板字符串
        "success": (res) => {
          wx.setStorageSync(this._getKey(res.index),res)
          callBackFuc(res)
        }
      })
    }else{
      callBackFuc(classic)
    }
   
  }

  getClassicLikeStatus(type,id,callBackFuc){
    this.request({
      url: `/classic/${type}/${id}/favor`,
      success:(res)=>{
        callBackFuc(res)
      }
    })
  }

  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }

  _getLatestIndex() {
    return wx.getStorageSync('latest')
  }

  isPrevious(index) {
    return index == 1 ? true : false;
  }

  isLatest(index) {
    let latestIndex = this._getLatestIndex()
    return latestIndex == index ? true : false;
  }

  _getKey(index) {
    return "classic-"+index
  }


}

export {
  ClassicModel
}