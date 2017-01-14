#lz-banner

**lz-banner**是一款基于jQuery库开发的轮播图插件，方便开发者快速完成针对页面轮播效果的开发，并获得不同的轮播效果。
- **多场景**：适用于常规banner,照片大图预览幻灯片切换,滚屏等场景
- **高灵活**：拥有丰富的API供后续操作,并可以添加自定义的效果函数(`轻量版`将不提供该项功能)
- **强校验**：插件内部自动进行参数校验，不符合参数格式的将自动转换成默认值(`轻量版`将不提供该项功能) 
- **多事件**：拥有焦点，箭头，键盘，滚轮，触摸多项执行事件

**轮播机制为单张的操作，需要进行多张轮播可以使用[lz-slider](https://github.com/TCJ-ZJ/lz-slider)**

------

##调用说明
###引入文件
- 此插件基于[jQuery](www.jquery.com)开发，调用前须将jQuery库引入
```html
	<script src="../jquery-11.1.1.min.js">
	<script src="../lz-banner.min.js">
	<link href="../lz-banner.css" rel="stylesheet" type="text/css">
```
###HTML代码结构
- 页面上必须的html代码结构，保证外层框架结构相同，标签不限，内层结构不限，id名不限
```html
<div id='selector'>
	<ul>
		<li><a href="#"><img src="images/01.png"></a></li>
		<li><a href="#"><img src="images/02.png"></a></li>
		<li><a href="#"><img src="images/03.png"></a></li>
	</ul>
</div>
```
###调用插件
- 参数可为空，可多次调用, 可使用data进行传参；
```html
<!-- 使用html5 data属性进行传参，优先级大于js传参 -->
<div id='selector' data-banner-param = '{"effect":"fade","interval":3000}'>
```
- 使用js进行调用并传参
```javascript
/*使用字符串进行传参*/
$('#selector1').lzbanner('top',3000,500,'cut')//方向 间隔时间 动画时间 效果
$('#selector2').lzbanner('right',3000,600) //方向 间隔时间 动画时间
$('#selector3').lzbanner('fade','fast','medium') //效果 间隔时间 动画效果
$('#selector4').lzbanner(3000，600) //间隔时间 动画时间
$('#selector5').lzbanner(fn)//切换执行函数

/*使用对象进行传参*/
$('#selector6').lzbanner({
	dir:'left', 
	effect:'fade', //可以传数组，
	interval:3000,
	speed:600,
	auto:true,
	cycle:true,
	event:'btn',//可以传数组
	...
})
```
##参数列表
###效果参数
| 参数名称 | 参数变量 | 参数取值 | 参数说明 |
|:------------:|:---------:|:---------:|:---------:|
| 动画方向|`dir` |'left' / 'right' / 'up' / 'down'|控制图片切换的方向，当动画效果中不带方向性，本参数无效，参数为空时：默认值为 *left*
| 动画效果|`effect` |'fade' / 'cut'/ 'user-defined'/ ['effect1','effect2',...]|控制图片效果的参数，参数可为字符串，即所有图片切换均使用该效果，也可传递数组，数组内的参数将依次作为对应图片的切换效果,用户可自定义效果，参数为空时：默认值为 *defaults*
| 动画事件 |`event` |'btn' / 'arrow' / 'wheel' / 'keyborad'/'touch'/ ['event1','event2',...]|添加能控制图片切换的事件效果，参数可为字符串，即将当前事件添加，也可以传递数组，即将数组内所有事件添加，参数为空时： 默认值为 *['btn','arrow']*
| 间隔时间 |`intervel` |'slow' / 'medium' / 'fast' / number |控制动画的执行间隔，本参数为空时：默认值为 *medium* 即 *3000ms*  
| 动画速度 |`speed` |'slow' / 'medium' / 'fast' / number |控制动画的执行速度，本参数为空时：默认值为 *medium* 即 *600ms*，ps:当动画速度大于间隔时间时，会报错    
| 自动播放 |`auto` |true / false |控制动画是否自动播放，本参数为空时：默认值为 *true*	
| 循环播放 |`cycle` |true / false |控制动画是否循环播放，本参数为空时：默认值为 *true*	
| 焦点按钮样式 |`btnCls` |[焦点按钮盒子,焦点按钮焦点,按钮选中样式]	|控制焦点按钮的样式，本参数为空时：默认值为 *['lz-bannerPoint-box', 'lz-bannerPoint', 'lz-bannerPoint-point', 'lz-bannerPoint-hover']*	
| 左右控件样式 |`arrowCls` |[箭头盒子,左箭头,右箭头]	|控制左右控件的样式，本参数为空时：默认值为 *['lz-bannerBtn', 'lz-bannerBtn-left', 'lz-bannerBtn-right']*
| 默认箭头样式|`arrowStyle`|true / false |控制左右控件是否添加<>样式，本参数为空时： 默认值为：*true*
| 切换执行函数|`_onSwitch`| fn |每当执行切换的时候所调用的函数： 默认值为：*null*
| 最后执行函数|`_onLast`|fn |当切换到最后一张时所调用的函数： 默认值为：*null*

##自定义插件相关内容
### css选择器
- 自定义样式时请带上父级id，避免同一页面多个组件样式冲突,可通过传参进行更改
```css
.lz-bannerBtn  /* banner左右控件的盒子 */
.lz-bannerBtn-left  /* banner的向左控件 */
.lz-bannerBtn-right  /* banner的向右控件 */
.lz-bannerPoint  /* banner的焦点按钮盒子 */
.lz-bannerPoint-point  /* banner的焦点按钮 */
.lz-bannerPoint-hover  /* 控制banner的焦点按钮选中时的样式 */
```
###效果函数
>该插件提供接口为开发者自行添加动画效果

- 效果参数
| 参数名称 | 参数变量 | 参数说明 |
|-----------|------------|------------|
| param | `speed` `interval` `auto` `cycle` | 使用时为param.variable(比如：param.speed)|
| img |  | 轮播图的图片对象，使用时为this.img |
| obj |  | 轮播图对象，使用时为this.obj |

- 状态参数
| 参数名称 | 参数变量 | 参数说明 |
|-----------|------------|------------|
| status | `cPoint` | 此参数表明下一张进入的图片的编号，调用status.cPoint |
| status | `sPoint` | 此参数表明当前图片的编号，调用status.sPoint |
| status | `flag` | 此参数表明能否进行下一个动画效果（即当前动画是否已经执行完），是为`true`，不是为`false`，调用status.flag |
| status | `moushH` | 此参数表明鼠标是否进入轮播图对象内部，是为`true`，不是为`false`，调用status.mouseH |
- 调用接口
```javascript
/*
*调用添加动画的函数
*name为动画效果名称，此处填写的名称将用于调用时的effect参数
*fn，即具体动画效果函数
*/
$.addBannerEffect(name,fn)

/*该示例为添加淡入淡出的效果*/
$.addBannerEffect('fade',function(img,param,status){
	img.eq(status.cPoint).css({
		top:0,
		left:0,
		zIndex:35,
		display:'none'
	}).fadeIn(param.speed);
})
```
##回调方法
###调用方式
```javascript
var tool = $('#selector').lzbanner(); //调用插件并获得回调方法集
var tool = $('#selector').bannerTool(); //获得该元素的回调方法集
```
###方法介绍
```javascript
tool.initIndex() //初始化显示的张数下标，第一张下标为1
tool.index() //获得当前张的下标,第一张下标为1
tool.index(num) //传入一个数字，跳到指定张
tool.next() //到下一张
tool.prev() //到上一张
tool.setInterval(num) //设置轮播间隔	
tool.setSpeed(num) //设置轮播速度	
tool.setEffect(str|arr) //设置轮播效果	
tool.setDirection(str) //设置轮播方向	
tool.start() //开启自动播放	
tool.stop() //关闭自动播放	
tool.onCycle()//开启循环播放	
tool.offCycle()//关闭循环播放
tool.refresh() //更新轮播图的宽高(当宽高改变时调用即可)	
tool.init({}) //初始化轮播图
tool.destroy() //摧毁该元素上的banner插件	
tool.on('switch',fn) //添加切换的时候执行的函数
tool.on('last',fn) //添加到达最后一张时执行的函数
```
##下载地址
**GitHub**： https://github.com/TCJ-ZJ/lz-banner

© 本手册由 磨盘兄弟 @lzmoop 官方提供 [www.lzmoop.com](www.lzmoop.com)
