import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'

export default class Song {
    constructor({id,mid,singer,name,album,duration,image,url}) {
        this.id = id
        this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.duration = duration
        this.image = image
        this.url = url
    }
    getLyric(){
        if(this.lyric){
            return Promise.resolve(this.lyric)
        }
        return new Promise((resolve,reject) =>{
            getLyric(this.mid).then((res) =>{
                if(res.retcode === ERR_OK){
                    this.lyric = Base64.decode(res.lyric)
                    resolve(this.lyric)
                }else{
                    reject('no lyric')
                }
            })
        })
    }
}

export function createSong(ob) {
    return new Song({
        id:ob.songid,
        mid:ob.songmid,
        singer:filterSinger(ob.singer),
        name:ob.songname,
        album:ob.albumname,
        duration:ob.interval,
        image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${ob.albummid}.jpg?max_age=2592000`,
        url:`http://ws.stream.qqmusic.qq.com/${ob.songid}.m4a?fromtag=46`
    })
}

export function filterSinger(singer){
  let ret = []
  if(!singer){
      return''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}