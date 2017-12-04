<template>
<scroll class="listview" 
        :data="data" 
        ref="listview"
        :listenScroll="listenScroll"
        :probeType = "probeType"
        @scroll="scroll">
    <ul>
        <li v-for="group in data" class="list-group" ref="gropList">
          <h2 class="list-group-title">{{group.title}}</h2>
          <ul>
              <li @click="songDeta(item)" v-for="item in group.items" class="list-group-item">
                 <img class="avatar" v-lazy="item.avatar">
                 <span class="name">{{item.name}}</span>
              </li>
          </ul>
        </li>
    </ul>
    <div class="list-shortcut" @touchstart="startclick" @touchmove.stop.prevent="startmove">
        <ul>
           <li v-for="(item,index) in rightList" class="item" 
           :data-index="index"
           :class="{'current':presentIndex===index}">{{item}}</li> 
        </ul>
    </div>
    <div class="list-fixed" v-show='dataIndex' ref="load">
          <h1 class="fixed-title">{{dataIndex}}</h1>
    </div>
    <div class="loading-container" v-show="!data.length">
      <loading></loading>
    </div>
</scroll>
</template>

<script type="text/ecmascript-6">
import loading from 'base/loading/loading' 
import Scroll from 'base/scroll/scroll'
import { getData} from 'common/js/dom'
 export default {
     created(){
       this.touch = {}
       this.listenScroll = true
       this.listHeight = []
       this.probeType = 3
     },
     data (){
       return {
        scrollY:-1,
        presentIndex:0,
        diff:-1
       }
     },
     props:{
         data:{
             type:Array,
             default:[]
         }
     },
     computed:{
       rightList(){
           return this.data.map((group) =>{
               return group.title.substr(0,1)
           })
       },
       dataIndex (){
         if(this.scrollY>0){
            return ''
         }
         return this.data[this.presentIndex]?this.data[this.presentIndex].title:''
       }
     },
     methods:{
        refresh(){
          this.$refs.listview.refresh()
        },
         songDeta(item){
          this.$emit('select',item)
         },
         startclick(e){
           let getindex = getData(e.target,"index")
           let firstT = e.touches[0]
           this.touch.one = firstT.pageY
           this.touch.getindex = getindex
           this.scrollV(getindex)

         },
         startmove(e){
           let first = e.touches[0]
           this.touch.two = first.pageY
           let dValue = (this.touch.two - this.touch.one) / 18 | 0
           let getindex =parseInt(this.touch.getindex) + dValue 
           console.log(getindex) 
            this.scrollV(getindex)

         },
          scroll(pos){
            this.scrollY = pos.y
         },
         scrollV(index){
           if(!index && index !== 0){
              return
           }
           if(index < 0){
             index = 0
           }else if (index > this.listHeight.length - 2){
             index = this.listHeight.length - 2
           }
           this.scrollY = -this.listHeight[index]
           this.$refs.listview.scrollToElement(this.$refs.gropList[index],0)  
         },
         getHeight (){
           this.listHeight = []
           const groupH = this.$refs.gropList
            let height = 0
            this.listHeight.push(height)
            for (let i = 0;i < groupH.length;i++){
              let item = groupH[i]
              height+=item.clientHeight
              this.listHeight.push(height)
            }
         }
     },
    watch :{
        data (){
          setTimeout(() => {
            this.getHeight()
          },20)
        },
        scrollY(newY){
          if(newY > 0){
            this.presentIndex = 0
            return
          }
          const groupH = this.listHeight
          console.log(groupH)
          for(let i=0;i<groupH.length - 1;i++){
            let heightO = groupH[i]
            let heightT = groupH[i+1]
            if(-newY >= heightO && -newY < heightT){
              this.presentIndex = i
              this.diff = heightT + newY
              return
            }
          }
          this.presentIndex = groupH.length - 2
        },
        diff(newVal){
          let diffVal = (newVal > 0 && newVal<30)?newVal - 30 : 0
          if(this.diffVal === diffVal){
            return
          }
          this.diffVal = diffVal
          this.$refs.load.style.transform = `translate3d(0,${diffVal}px,0)`
        }
      },
     components:{
         Scroll,
         loading
     }
 }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
