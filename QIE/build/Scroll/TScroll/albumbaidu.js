slideNext.attachEvent("onmousedown",
    function(e) {
        e = e || window.event;
        browse("next");
        if (e.preventDefault) {
            e.preventDefault()
        }
        e.returnValue = false
    });

function browse(type) {
    if (albumState.browseQueue != 0) {
        return
    }
    if (albumState.isBrowse) {
        return
    }
    albumState.isBrowse = true;
    if (type == "pre") {
        albumState.browseQueue = Math.floor(currDispNum);
        browsePre()
    }
    if (type == "next") {
        albumState.browseQueue = -Math.floor(currDispNum);
        browseNext()
    }
}

function browseNext() {
    if (albumState.isBrowsing == true) {
        return
    }
    if (albumState.topImgPN + AlbumConfig.preCacheMaxNum + AlbumConfig.displayPosition >= listNum) {
        albumState.isBrowse = false;
        albumState.isCanBrowse = true;
        albumState.browseQueue = 0;
        return
    }
    if (albumState.browseQueue != 0) {
        albumState.browseQueue++
    }
    albumState.isBrowsing = true;
    var nextImgPn = albumState.topImgPN + AlbumConfig.preCacheMaxNum + displayNum + AlbumConfig.nextCacheMaxNum;
    if (nextImgPn >= listNum) {
        slide.next(null, nextImgPn);
        albumState.topImgPN++
    }
    if (nextImgPn < listNum) {
        slide.next(DataManager.getImgByPN(nextImgPn), nextImgPn);
        albumState.topImgPN++
    }
    return
}
function slideToDown(ImgObj, num) {
    var distance = slideConfig.distance;
    var currentTop = 0;
    var albumObjChildren = albumObj.children;
    var firstNode = albumObjChildren[0];
    var lastNode = albumObjChildren[albumObjChildren.length - 1];
    var currentPN = getCurrentPN();
    if (lastNode.children.length > 0) {
        lastNode.children[0].style.display = "none"
    }
    lastNode.style.height = "0px";
    if (ImgObj && ImgObj.pageNum == currentPN) {
        lastNode.className = "select"
    } else {
        lastNode.className = "noselect"
    }
    albumObj.insertBefore(lastNode, firstNode);
    var slid = setInterval(function() {
            if (distance - currentTop > dic) {
                lastNode.style.height = currentTop + "px";
                currentTop = currentTop + dic
            } else {
                clearInterval(slid);
                lastNode.style.height = distance + "px";
                lastNode.id = slideConfig.imgIdStr + num;
                lastNode.innerHTML = getImgeHtml(ImgObj);
                preCallBack()
            }
        },
        8)
}