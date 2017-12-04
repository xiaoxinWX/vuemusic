<template>
  <div class="singer" ref="sin">
    <listview @select="selectSinger" :data="singers" ref="singers"></listview>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import singer from 'common/js/singer'
import listview from 'base/listview/listview'
import {mapMutations} from 'vuex'
import {playlistMixin} from 'common/js/mixin'
const hosts = '热门' 
const masts = 10
export default {
  mixins:[playlistMixin],
  data(){
    return {
      singers:[]
    }  
  },
  created(){
    this._getSingerList()
  },
  methods:{ 
    handlePlaylist(newList){
      const bottom = newList.length>0?'60px':''
      this.$refs.sin.style.bottom = bottom
      this.$refs.singers.refresh()

    },
    selectSinger(singer){
       this.$router.push({
         path:`/singer/${singer.id}`
       })
       this.setSinger(singer)
    },
    _getSingerList(){
      getSingerList().then((res) => {
        if(res.code === ERR_OK){
          console.log(res.data.list)
          this.singers = this.indexSinger(res.data.list)
          console.log(this.singers)
        }   
      })
    },
    indexSinger(list){
      let map = {
        host:{
          title: hosts,
          items:[]

        }
      }
      list.forEach((item,index) => {
        if(index < masts){
         map.host.items.push(new singer({
           id:item.Fsinger_mid,
           name:item.Fsinger_name
         }))
        }
        const key = item.Findex
        if(!map[key]){
          map[key] = {
            title:key,
            items:[]
          }
        }
        map[key].items.push(new singer({
          name:item.Fsinger_name,
          id:item.Fsinger_mid

        }))
      })
      let hot = []
      let ret = []
      for (let key in map){
         let val = map[key]
         console.log(map[key])
         if(val.title.match(/[a-zA-Z]/)){
           ret.push(val)
         }else if(val.title === hosts){
           hot.push(val)
         }
      }
      ret.sort((a,b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      console.log(ret)
      console.log(hot)
      return hot.concat(ret)
    },
    ...mapMutations({
      setSinger:'SET_SINGER'
    })
  },
  components:{
    listview
  }
}
  
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
 .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>