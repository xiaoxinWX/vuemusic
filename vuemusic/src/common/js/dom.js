export function hasClass(el,className){
    let reg = new RegExp('(^|\\s)' + className + '(\\s/$)')
    return reg.test(el.className)
}



export function addClass (el,className){
    if(hasClass(el,className)){
        return
    }
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
}

export function getData(el,name,val){
    name = 'data-' + name
    if(val){
        return el.setAttribute(name,val)
    }else{
        return el.getAttribute(name)
    }
}

let element = document.createElement('div').style

let vender = (() => {
    let transformName = {
        webkit:'webkitTransform',
        Moz:'MozTransform',
        O:'OTransform',
        ms:'msTransform',
        standard:'transform'
    }
    for (let key in transformName){
        if(element[transformName[key]] !== undefined){
            return key
        }
    }
    return false
})()

export function prefix(style){
    if(vender === false){
        return false
    }

    if(vender === 'standard'){
        return style
    }
    return vender + style.charAt(0).toUpperCase() + style.substr(1)
}
