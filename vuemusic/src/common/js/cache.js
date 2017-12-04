import storage from 'good-storage'

const SEARCH_KEY = '_search_'
const SEARCH_MAX_LENGTH = 15

const PLAY_KEY = '_PLAY_'
const PLAY_MAX_LENGTH = 200 

const FAVORITE_KEY = '_favorite_'
const FAVORITE_MAX_LENGTH = 200

function inserArray(arr,val,compare,maxLen){
    const index = arr.findIndex(compare)
    if(index === 0){
        return
    }
    if(index > 0){
        arr.splice(index,1)
    }
    arr.unshift(val)
    if(maxLen && arr.length>maxLen){
        arr.pop()
    }
}
export function saveSearch(query){
  let searchs = storage.get(SEARCH_KEY,[])
  inserArray(searchs,query,(item)=>{
      return item === query
  },SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY,searchs)
  return searchs
}
function deleteArray(arr,compare){
    let index = arr.findIndex(compare)
    if(index > -1){
        arr.splice(index,1)
    }
    
}

export function loadSearch(){
    return storage.get(SEARCH_KEY,[])
}

export function deleteSearch(query){
   let searchs = storage.get(SEARCH_KEY,[])
   deleteArray(searchs,(item) =>{
       return item === query
   })
   storage.set(SEARCH_KEY,searchs)
   return searchs
} 

export  function clearSearch(){
    storage.remove(SEARCH_KEY)
    return []
}

export function savePlay(song){
    let plays = storage.get(PLAY_KEY,[])
    inserArray(plays,song,(item) =>{
        return song.id === item.id
    },PLAY_MAX_LENGTH)
    storage.set(PLAY_KEY,plays)
    return plays
}

export function loadingPlays(){
    return storage.get(PLAY_KEY,[])
}

export function saveFavorite(song){
    let songs = storage.get(FAVORITE_KEY,[])
    inserArray(songs,song,(item) =>{
        return song.id === item.id
    },FAVORITE_MAX_LENGTH)
    storage.set(FAVORITE_KEY,songs)
    return songs
}
export function deleteFavorite(song){
    let songs = storage.get(FAVORITE_KEY, [])
    deleteArray(songs, (item) => {
      return item.id === song.id
    })
    storage.set(FAVORITE_KEY, songs)
    return songs
}
export function loadingFavorite(){
    return storage.get(FAVORITE_KEY,[])
}