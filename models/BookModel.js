import {
    Http
} from '../utils/Http-p.js'

class BookModel extends Http {
    getHotList() {
        return  this.request({
            "url": "/book/hot_list"
        })
    }

    getComments(bid){
        return this.request({
            "url":`/book/${bid}/short_comment`
        })
    }

    getDetail(bid){
        return this.request({
            "url":`/book/${bid}/detail`
        })
    }

    getLikeStatus(bid){
        return this.request({
            "url":`/book/${bid}/favor`
        })
    }

    postComment(bid,content){
        return this.request({
            'url':`/book/add/short_comment`,
            'data':{book_id:bid,content:content},
            'method':'POST'
        })
    }

    search(start, q){
        return this.request({
            url:'/book/search?summary=1',
            data:{
                q:q,
                start:start
            }
        })
    }

  getMyBookCount() {
    return this.request({
      url: '/book/favor/count'
    })
  }
}

export {BookModel}