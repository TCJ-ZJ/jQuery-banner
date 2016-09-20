var k = $('.banner').bannerTool();
/*淡入淡出效果*/
k.addEffect('fade',
function() {
    this.img.eq(this.status.cPoint).css({
        zIndex: 35,
        display: 'none'
    }).fadeIn(this.param.speed);
})
/*切换效果*/
k.addEffect('cut',
function() {
    this.img.eq(this.status.cPoint).css({
        zIndex: 35
    })
})
/*鼠标滚轮切换事件*/
k.addEvent('wheel',
function() {
    var me = this.obj,
    status = this.status;
    me.on('mousewheel DOMMouseScroll',
    function(e) { //添加滚轮事件
        if (status.flag && status.mouseH) {
            e.preventDefault();
            var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) || // chrome & ie
            (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1)); // firefox   
            if (delta > 0) {
                status.cPoint--;
            } else if (delta < 0) {
                status.cPoint++;
            }
            me.bannerExcute();

        }
    });
})

/*键盘上下左右键切换事件*/
k.addEvent('keyboard',
function() {
    var me = this.obj,
    status = this.status;
    param = this.param;
    $(window).on('keydown',
    function(e) {
        if (status.flag && status.mouseH) {
            e.preventDefault();
            if (e.keyCode == 37 || e.keyCode == 38) {
                status.cPoint--;
            } else if (e.keyCode == 39 || e.keyCode == 40) {
                status.cPoint++;
            }
            me.bannerExcute();
        }
    });
})