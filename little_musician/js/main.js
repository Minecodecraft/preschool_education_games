// Config event listener
window.addEventListener('load', initGame);

var sourceItems = document.querySelectorAll(".source_item");
sourceItems.forEach(function (sourceItem, idx) {
    sourceItem.style.background = "url('/images/" + sounds[idx].imagename + "')";
    sourceItem.style.backgroundSize = "cover";
    sourceItem.addEventListener("dragstart", onSourceDragStart);
    sourceItem.addEventListener("dragend", onSourceDragEnd);
});

var targetItems = document.querySelectorAll(".target_item, box");
targetItems.forEach(function (targetItem, idx) {
    targetItem.addEventListener("dragover", onTargetDragOver);
    targetItem.addEventListener("drop", onTargetDrop);
    targetItem.addEventListener("click", onTargetClick);
});

function onTargetDragOver(e) {
    e.preventDefault();
}

function onSourceDragStart(e) {
    soundIndex = [].indexOf.call(sourceItems, e.target); 
    console.log("index to" + soundIndex);
}

function onSourceDragEnd() {
    soundIndex = -1;
    console.log("clear index");
}

function onTargetDrop(e) {
    if (soundIndex == -1) {
        return;
    }
    var index = [].indexOf.call(targetItems, e.target);
    targetStatus[index].filename = sounds[soundIndex].filename;
    targetStatus[index].imagename = sounds[soundIndex].imagename;
    refreshTargetItem(targetItems[index], targetStatus[index]);
}

function onTargetClick(e) {
    var index = [].indexOf.call(targetItems, e.target);
    targetStatus[index].filename = null;
    targetStatus[index].imagename = null;
    refreshTargetItem(targetItems[index], targetStatus[index]);
}

function refreshTargetItem(item, status) {
    if (status.imagename != null) {
        item.style.background = "url('/images/" + status.imagename + "')";
        item.style.backgroundSize = "cover";
    } else {
        item.style.background = null;
        item.style.backgroundSize = null;        
    }
}

// Game Control
var audio, soundIndex;
var gameStart;
var beatTimer, beatCounter;
var targetStatus;

function initScene() {

}

function initGame() {
    initScene();
    audio = new Audio('audio/buguniao.mp3')
    audio.loop = true;
    audio.pause();

    gameStart = false;
    beatCounter = 0;
    targetStatus = new Array(targetAmount);
    for (var i = 0; i < targetAmount; i++) {
        targetStatus[i] = new Target(null, null);
    }
    // Test Only
    // for (var i = 0; i < targetAmount; i++) {
    //     targetStatus[i] = new Target(sounds[i].imagename, sounds[i].filename);
    // }

    play_pause_btn = document.getElementById('play_pause_button');
    mute_btn = document.getElementById('mute_button');

    play_pause_btn.addEventListener('click', playPause);
    mute_btn.addEventListener('click', muteUnmute);
    function playPause() {
        gameStart ? stop() : start();
    }
    function muteUnmute() {
        if (audio.muted) {
            audio.muted = false;
            mute_btn.style.background = "url(/images/icon_unmuted.png)";
        } else {
            audio.muted = true;
            mute_btn.style.background = "url(/images/icon_muted.png)";
        }
        mute_btn.style.backgroundSize = "cover";
    }
}

function start() {
    if (gameStart) {
        return;
    }
    
    beatTimer = window.setInterval(beat, beatIntervalInMillionseconds);
    audio.play();
    play_pause_btn.style.background = "url('/images/icon_pause.png') no-repeat";
    play_pause_btn.style.backgroundSize = "cover";
    gameStart = true;
}

function pause() {
    // TODO: 以后再实现
}

function stop() {
    if (!gameStart) {
        return;
    }
    window.clearInterval(beatTimer);
    audio.pause();
    audio.currentTime = 0;
    beatCounter = 0;
    play_pause_btn.style.background = "url('/images/icon_play.png') no-repeat";
    play_pause_btn.style.backgroundSize = "cover";
    targetItems.forEach(function (item, idx) {
        item.style.border = "10px solid orangered";
    });
    targetStatus.forEach(function (status, idx) {
        status.filename = null;
        status.imagename = null;
        refreshTargetItem(targetItems[idx], status);
    });
    gameStart = false;
}

function beat() {
    var filename = targetStatus[beatCounter].filename;
    if (filename) {
        var beatAudio = new Audio('/audio/' + filename);
        beatAudio.play();
        console.log("Tik Tok" + filename);
    }
    // Render Color
    targetItems.forEach(function (item, idx) {
        if (beatCounter == idx) {
            item.style.border = "10px solid yellow";
        } else {
            item.style.border = "10px solid orangered";
        }
    });
    beatCounter = (beatCounter + 1) % targetStatus.length;
}