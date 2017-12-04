function randomX (min,max){
    return Math.floor(Math.random()*(max - min + 1)+ min)
}
export function shuffle(arr){
    let _arr = arr.slice()
    for(let i = 0; i < _arr.length; i++){
       let j = randomX(0,i)
       let t = _arr[i]
       _arr[i] = _arr[j]
       _arr[j] = t
    }
    return _arr
}

export function debounce (fun,deay){
    let time
  return function (...args){
    if (time) {
        clearTimeout(time)
    }
    time = setTimeout(() =>{
       fun.apply(this,args)
    },deay)
  }
    
}