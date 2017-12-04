<template>
 <div class="progress-bar" ref="progressBar" @click="progressBarClick">
     <div class="bar-inner">
         <div class="progress" ref="progress"></div>
         <div class="progress-btn-wrapper" ref="btn"  @touchstart.prevent="progressTouchStart"
           @touchmove.prevent="progressTouchMove"
           @touchend="progressTouchEnd">
             <div class="progress-btn"></div>
         </div>
     </div>
 </div>
</template>

<script type="text/ecmascript-6">
import {prefix} from 'common/js/dom'
const transform = prefix('transform')
const btnWidth = 16
export default{
    props:{
       percent:{
           type:Number,
           default:0
       } 
    },
    created(){
      this.touch={

      }
    },
    methods:{
       progressTouchStart(e){
          this.touch.inirte = true
          this.touch.startX = e.touches[0].pageX
          this.touch.left = this.$refs.progress.clientWidth

       },
       progressBarClick(e){
         const rect = this.$refs.progressBar.getBoundingClientRect()
         const offset = e.pageX - rect.left
         this.touchM(offset)
         this.triggerPercent()
       },
       progressTouchMove(e){
           if(!this.touch.inirte){
               return
           }
           const delta = e.touches[0].pageX - this.touch.startX
           const offSetWidth = Math.min(this.$refs.progressBar.clientWidth - btnWidth, Math.max(0, this.touch.left + delta))
           this.touchM(offSetWidth)
       },
       progressTouchEnd(){
          this.touch.inirte = false
          this.triggerPercent()
       },
       triggerPercent(){
         const barWidth = this.$refs.progressBar.clientWidth - btnWidth 
         const percent = this.$refs.progress.clientWidth / barWidth
         this.$emit('percentChange',percent)
       },
        touchM(offSetWidth){
        this.$refs.progress.style.width = `${offSetWidth}px`
            this.$refs.btn.style[transform] = `translate3d(${offSetWidth}px,0,0)`
        }
    },
    watch:{
        percent(newPercent){
           if(newPercent >=0 && !this.touch.inirte){
               const barWidth = this.$refs.progressBar.clientWidth - btnWidth
               const offSetWidth = newPercent * barWidth
              this.touchM(offSetWidth)
           }
        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>