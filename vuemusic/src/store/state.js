import {playMode} from 'common/js/config'
import {loadSearch,loadingPlays,loadingFavorite} from 'common/js/cache'

const state = {
    singer :{},
    playing:false,
    fullScreen:false,
    playlist:[],
    sequenceList:[],
    mode:playMode.sequence,
    currentIndex:-1,
    disc:{},
    topList:{},
    searchHistory:loadSearch(),
    playHistory:loadingPlays(),
    favoriteList:loadingFavorite()
}

export default state