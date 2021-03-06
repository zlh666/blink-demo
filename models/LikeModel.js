import {Http} from '../utils/Http.js'

class LikeModel extends Http{
  like(behavior,artId,category){
    let url = behavior == 'like' ? '/like' : '/like/cancel'
    this.request({
      url: url,
      method:"POST",
      data:{
        art_id:artId,
        type:category
      }
    })
  }
}

export {LikeModel}