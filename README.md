## lz-banner使用手册
**当前版本： V2.4.1 developer**

### lz-banner是什么
>lz-banner是一款基于jQuery库开发的轻量级轮播插件，方便开发者快速完成针对页面轮播效果的开发，并获得不同的轮播效果。例如，水平滑动或垂直滑动，以及淡出淡入或切换等！（适用于常规banner、照片大图预览幻灯片切换效果、滚屏效果等）此插件的当前版本为 V2.4.1 开发者版。

### 具体参数列表

| 参数名称 | 参数变量 | 参数取值 | 参数说明 |
|-----------|------------|------------|------------|
| 动画方向          |`dir`        |'[left]' / '[right]' / '[up]' / '[down]'      |控制图片切换的方向，当动画效果中不带方向性，本参数无效，参数为空时：默认值为 *left*
| 动画效果          |`effect`     |'[fade]' / '[cut]'    				 		|控制图片效果的参数，参数可为字符串，即所有图片切换均使用该效果，也可传递数组，数组内的参数将依次作为对应图片的切换效果，参数为空时：默认值为 *defaults*
| 动画事件          |`event`      |'[btn]' / '[arrow]' / '[wheel]' / '[keyborad]'|添加能控制图片切换的事件效果，参数可为字符串，即将当前事件添加，也可以传递数组，即将数组内所有事件添加，参数为空时： 默认值为 *['btn','arrow']*
| 间隔时间          |`intervel`   |'[slow]' / '[medium]' / '[fast]' / '[number]' |控制动画的执行间隔，本参数为空时：默认值为 *medium* 即 *3000ms*  
| 动画速度          |`speed`      |'[slow]' / '[medium]' / '[fast]' / '[number]' |控制动画的执行速度，本参数为空时：默认值为 *medium* 即 *600ms*，**ps:当动画速度大于间隔时间时，会报错**    
| 是否自动播放       |`auto`      |[true] / [false]  								|控制动画是否自动播放，本参数为空时：默认值为 *true*	
| 是否循环          |`cycle`      |[true] / [false]  							|控制动画是否循环播放，本参数为空时：默认值为 *true*	
| 焦点按钮样式命名   |`btnCls`     |[焦点按钮盒子] / [焦点按钮] / [焦点按钮选中样式]	|控制焦点按钮的样式，本参数为空时：默认值为 *['lz-bannerPoint-box', 'lz-bannerPoint', 'lz-bannerPoint-point', 'lz-bannerPoint-hover']*	
| 左右控件样式命名   |`arrowCls`   |[箭头盒子] / [左箭头] / [右箭头]					|控制左右控件的样式，本参数为空时：默认值为 *['lz-bannerBtn', 'lz-bannerBtn-left', 'lz-bannerBtn-right']*
| 是否添加默认箭头样式|`arrowStyle`|[true] / [false]								|控制左右控件是否添加<>样式，本参数为空时： 默认值为：*true*


### 引入库文件
--此插件基于jQuery开发
```HTML
<script src="js/jquery-11.1.1.min.js"></script>
<script src="js/lz-banner.2.4.1.min.js"></script>
<link href="css/lz-banner.css" rel="stylesheet" type="text/css">
```	

### HTML代码片段
--页面上必须的html代码，保证外层框架结构相同，标签不限，内层结构不限，id名不限
```HTML
<div id='selector'>
	<ul>
		<li><a href="#"><img src="images/01.png"></a></li>
		<li><a href="#"><img src="images/02.png"></a></li>
		<li><a href="#"><img src="images/03.png"></a></li>
	</ul>
</div>
```

### 调用插件
--参数可为空，全部参数请参考列表；可多次调用
```html
	<!-- 使用html5 data属性进行传参,优先级大于js传参 -->
	
	<div id="banner" data-banner-param='{"effect":"fade","interval":3000}'></div>
```

```javascript
<script type="javascript">
    <!--
        $('#banner1').lzbanner('fade',3000,600) //效果 间隔时间 运行速度 
	$('#banner2').lzbanner('left','fast','medium') //方向 间隔时间 运行速度
	$('#banner3').lzbanner(fn) //切换时执行的函数
	
        /* 或使用对象传参 */

        $('#banner3').lzbanner({
            effect : 'fade' ,
            interval : 3000 ,
            speed : 600 ,
            auto : true ,//默认自动
            cycle : true//默认循环
        })
	
	$('#banner4').lzbanner({
            effect : ['fade','defaults','fade'],
	    event : ['btn','arrow','wheel'] ,
            interval : 3000 ,
            speed : 600 ,
            auto : true ,//默认自动
            cycle : true//默认循环
        })
    -->
</script>
```

### 提供的css选择器
--自定义样式时请带上外层父级id，避免同一页面多个组件样式冲突
```css
.lz-bannerImg  /* banner外层框架 */
.lz-bannerImg-images  /* banner的运动层 */
.lz-bannerBtn  /* banner左右控件的盒子 */
.lz-bannerBtn-left  /* banner的向左控件 */
.lz-bannerBtn-right  /* banner的向右控件 */
.lz-bannerPoint  /* banner的焦点按钮盒子 */
.lz-bannerPoint-point  /* banner的焦点按钮 */
.lz-bannerPoint-hover  /* 控制banner的焦点按钮选中时的样式 */
```

### 自定义效果函数
--此版本为开发者版，提供接口为开发者自行添加动画效果

**1.提供参数说明**

| 参数名称 | 参数变量 | 参数说明 |
|-----------|------------|------------|
| param | `speed` `interval` `auto` `cycle` | 使用时为this.param.variable(比如：param.speed) param可调用的参数即为参数列表内的参数 |
| img |  | 轮播图的图片对象，使用时为this.img |
| obj |  | 轮播图对象，使用时为this.obj |

| 参数名称 | 参数变量 | 参数说明 |
|-----------|------------|------------|
| status | `cPoint` | 此参数表明下一张进入的图片的编号，调用this.status.cPoint |
| status | `sPoint` | 此参数表明当前图片的编号，调用this.status.sPoint |
| status | `flag` | 此参数表明能否进行下一个动画效果（即当前动画是否已经执行完），是为`true`，不是为`false`，调用this.status.flag |
| status | `moushH` | 此参数表明鼠标是否进入轮播图对象内部，是为`true`，不是为`false`，调用this.status.mouseH |

**2.调用接口**
```javascript

$.addBannerEffect(name,fn)

/*
*调用添加动画的函数
*name为动画效果名称，此处填写的名称将用于调用时的effect参数
*fn，即具体动画效果函数
*/

/*该示例为添加淡入淡出的效果*/

$.addBannerEffect('fade',function(){
	this.img.eq(this.status.cPoint).css({top:0,left:0,zIndex:35,display:'none'}).fadeIn(this.param.speed);
})

```

###回调方法
```javascript
	//调用方式	
	var tool = $('#lzbanner').lzbanner(); //调用插件并获得回调方法集
	var tool =  $('#lzbanner').bannerTool(); //获得该元素的回调方法集
	
	//回调方法
	tool.index() //获得当前张的下标	
	tool.index(num) //到指定张	
	tool.next() //到下一张	
	tool.prev(num) // 到上一张	
	tool.setInterval(num) //设置轮播间隔	
	tool.setSpeed(num) //设置轮播速度	
	tool.setEffect(str|arr) //设置轮播效果	
	tool.setDirection(str) //设置轮播方向	
	tool.start() //开启自动播放	
	tool.stop() //关闭自动播放	
	tool.onCycle()//开启循环播放	
	tool.offCycle()//关闭循环播放	
	tool.init({}) //初始化轮播图	
	tool.on('switch',fn) //添加切换的时候执行的函数
	tool.on('last',fn) //添加到达最后一张时执行的函数
```


© 本手册由 磨盘兄弟 @lzmoop 官方提供 www.lzmoop.com
