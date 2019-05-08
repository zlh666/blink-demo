import {Http} from '../utils/Http-p.js'
class KeywordModel extends Http{
    key = 'q'
    maxLen = 10
    getHistory(){
        let words =  wx.getStorageSync(this.key)
        if(!words) words = []
        return words
    }
    
    setHistory(q){
        let words = this.getHistory()
        const has = words.includes(q)
        if(!has){
            if (words.length>=this.maxLen){
                words.pop()
            }
            words.unshift(q)
            wx.setStorageSync(this.key,words)
        }
      
    }

    getHot(){
        return this.request({
            url:'/book/hot_keyword'
        })
    }
}

export {KeywordModel}