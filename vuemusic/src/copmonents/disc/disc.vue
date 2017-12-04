<template>
  <transition name="slide">
    <music-list :title="title":bgImage="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getSongList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'  


  export default {
    data(){
       return {
           songs:[]
       }
    },
    computed:{
        title(){
          return this.disc.dissname
        },
        bgImage(){
           return this.disc.imgurl
        },
      ...mapGetters([
          'disc'
      ])
    },
    created(){
      this._getSongList()
    },
    methods:{
        _getSongList(){
            if(!this.disc.dissid){
                this.$router.push('/recommend')
            }
            getSongList(this.disc.dissid).then((res) =>{
                if(res.code === ERR_OK){
                 this.songs = this._normalSongs(res.cdlist[0].songlist) 
                 console.log(this.songs)
                }
            })
        },
        _normalSongs(list){
           let ret = []
           list.forEach((Data) =>{
               if(Data.songid && Data.albumid){
                   ret.push(createSong(Data))
               }
           })
           return ret
        }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>