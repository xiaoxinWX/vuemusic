<template>
  <transition name="slide">
    <div class="add-song" v-show="showFlag" @click.stop>
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click="hide">
          <i class="icon-close"></i>
        </div>
      </div>
      <div class="search-box-wrapper">
          <search-box ref="search" @query="onQueryChange" placeholder="搜索歌曲"></search-box>
      </div>
      <div class="shortcut" v-show="!query">
          <switches :switches="switches" :currentIndex="currentIndex" @switchItem="switchItem"></switches>
          <div class="list-wrapper">
              <scroll :refreshDelay="200" ref="songList" class="list-scroll" :data="playHistory" v-if="currentIndex === 0">
                  <div class="list-inner">
                      <song-list :songs="playHistory" @select="selectSong"></song-list>
                  </div>
              </scroll>
              <scroll ref="searchList" :data="searchHistory" v-if="currentIndex === 1" class="list-scroll">
                  <div class="list-inner">
                    <search-list  @delete="deleteSearchHistory"
                    @select="addQuery" :searches="searchHistory"></search-list>
                  </div>
              </scroll>
          </div>
      </div>
      <div class="search-result" v-show="query">
          <suggest :query="query" :showSinger="showSinger" @select="selectSuggest"
          @listScroll="blurInput"></suggest>
      </div>
      <top-tip ref="topT" :delay="2000">
          <div class="tip-title">
              <i class="icon-ok"></i>
              <span class="text">一首歌曲已经添加到播放队列</span>
          </div>
      </top-tip>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import searchBox from 'base/search-box/search-box'
import suggest from 'components/suggest/suggest'
import {searchMixin} from 'common/js/mixin'
import switches from 'base/switches/switches'
import scroll from 'base/scroll/scroll'
import {mapGetters,mapActions} from 'vuex'
import songList from 'base/song-list/song-list'
import Song from 'common/js/song'
import searchList from 'base/search-list/search-list'
import topTip from 'base/top-tip/top-tip'

export default {
    mixins:[searchMixin],
    data(){
        return {
            showFlag:false,
            showSinger:false,
            currentIndex:0,
            switches:[
                {name:'最经播放'},
                {name:'搜索历史'}
            ]
        }
    },
    computed:{
      
      ...mapGetters([
          'playHistory'
      ])
    },
    methods:{
        show(){
            this.showFlag = true
            setTimeout(() =>{
               if(this.currentIndex === 0){
                 this.$refs.songList.refresh()
               }else{
                 this.$refs.searchList.refresh()
               }
            },20)
        },
        hide(){
            this.showFlag = false
        },
        selectSuggest(){
            this.saveSearch()
            this.$refs.topT.show()
        },
        switchItem(index){
           this.currentIndex = index
        },
        selectSong(song,index){
            console.log(song)
           if (index!=0) {
               this.inserSong(new Song(song))
               console.log(new Song(song))
               this.$refs.topT.show()
           }
        },
        ...mapActions([
            'inserSong'
        ])
    },
    components:{
        searchBox,
        suggest,
        switches,
        scroll,
        songList,
        searchList,
        topTip
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .add-song
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index: 200
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .header
      position: relative
      height: 44px
      text-align: center
      .title
        line-height: 44px
        font-size: $font-size-large
        color: $color-text
      .close
        position: absolute
        top: 0
        right: 8px
        .icon-close
          display: block
          padding: 12px
          font-size: 20px
          color: $color-theme

    .search-box-wrapper
      margin: 20px
    .shortcut
      .list-wrapper
        position: absolute
        top: 165px
        bottom: 0
        width: 100%
        .list-scroll
          height: 100%
          overflow: hidden
          .list-inner
            padding: 20px 30px
    .search-result
      position: fixed
      top: 124px
      bottom: 0
      width: 100%
    .tip-title
      text-align: center
      padding: 18px 0
      font-size: 0
      .icon-ok
        font-size: $font-size-medium
        color: $color-theme
        margin-right: 4px
      .text
        font-size: $font-size-medium
        color: $color-text
</style>