/*! jQuery-banner V2.3.0 | (c) 2016-2025  jQuery plug-in | lzmoop 2016-9 */

; (function($) {

/*！
* 为jquery添加类方法
*
* 总共添加了三种方法以便后续函数调用
*/

	$.extend({

		// 判断参数是否为array对象，是返回true，否则返回false

		isArray: function(v) {

			return Object.prototype.toString.call(v) === '[object Array]';

		},

		// 判断参数是否为object对象，是返回true，否则返回false

		isObject: function(v) {

			return Object.prototype.toString.call(v) === '[object Object]';

		},

		// 定义初始默认的效果函数参数

		effectParam: function(val) {

			// 获取当前对象

			var me = $(val),

			// 获取轮播盒子的宽度

			imgW = me.data('banner-imgW'),

			// 获取轮播盒子的高度

			imgH = me.data('banner-imgH'),

			// 初始化移动参数对象数组，用于执行效果函数时的参数（css及animate设置）

			eParam = [],

			// 获取对象元素的各项参数

			param = me.data('banner-param');

			// 如果方向为向左或向右，将左右参数放进数组中

			if (param.dir == 'left' || param.dir == 'right') {

				// 第一个参数为即将进入的图片的滑动初始位置

				eParam.push({left: imgW});

				// 第二个参数为即将退出图片的滑动结束位置

				eParam.push({left: -imgW});

				// 第三个参数为即将进入图片的滑动结束位置

				eParam.push({left: 0});

			// 如果方向为向上或向下，将上下参数放进数组中	
					
			} else if (param.dir == 'up' || param.dir == 'down') {

				// 第一个参数为即将进入的图片的滑动初始位置

				eParam.push({top: imgH});

				// 第二个参数为即将退出图片的滑动结束位置

				eParam.push({top: -imgH});

				// 第三个参数为即将进入图片的滑动结束位置

				eParam.push({top: 0});
			}

			// 返回数组，交给执行效果的函数

			return eParam;
		}
	})



/*！
* 定义构造函数--事件函数
*
* 初始化该对象上的各类参数
*
* 设置各类prototype的方法：包括设置事件函数，以及效果事件函数 
*/

	// 创建一个构造函数 

	var bannerEvent = function(val) {

		//初始化各类参数

		this.$ele = $(val);

		this.param = this.$ele.data('banner-param');

		this.status = this.$ele.data('banner-status');

		this.imgBox = this.$ele.data('banner-imgBox');

		this.img = this.$ele.data('banner-img');

		this.imgLen = this.$ele.data('banner-imgLen');
	}

	// 设置事件函数，用于调用所有效果事件函数

	bannerEvent.prototype.setEvent = function() {

		// 初始化对象和参数

		var event = this,

		param = this.param;

		// 如果事件（event）参数为数组，则调用所有事件函数

		if ($.isArray(param.event)) {

			// 调用所有事件函数以绑定元素

			$.each(param.event,function(index, val) {

				event[val] && event[val]();

			});

		// 如果事件（event）参数不为数组，则调用当前事件

		} else {

			event[param.event] && event[param.event]();

		}
	}

	// 定义默认的焦点按钮控制事件并放入事件函数的原型中

	bannerEvent.prototype.btn = function() {

		// 初始化各类参数

		var me = this.$ele,

		param = this.param,

		status = this.status,

		imgBox = this.imgBox,

		img = this.img,

		imgLen = this.imgLen,

		btnW = 0;

		// 创建焦点按钮盒子，可添加类名

		// param.btnCls[0]接收用户传入的类名

		// 用户传参时取代默认参数

		var pointBox = $("<ul class='" + param.btnCls[0] + "'></ul>");

		// 将焦点按钮盒子追加到对象元素中

		// get(0)将jQuery对象转为DOM对象 

		me.append(pointBox.get(0));

		pointInBox = $("<li class='" + param.btnCls[1] + "'></li>");

		pointBox.append(pointInBox.get(0));

		// 创建焦点按钮，可添加类名

		// param.btnCls[1]接收用户传入的类名

		// 用户传参时取代默认参数


		point = "<div class='" + param.btnCls[2] + "'></div>";

		// for循环添加焦点按钮

		for (i = 0; i < imgLen; pointInBox.append(point), i++);

		// 动态计算盒子宽度
			
		btnW = pointBox.find('div').eq(0).outerWidth(true) * imgLen;

		// 宽度动态赋值

		// 初始化第一个焦点选中样式

		pointInBox.css('width', btnW).find('div').eq(0).addClass(param.btnCls[3]);

		// 焦点按钮监听点击事件

		pointBox.find('div').on('click',function(event) {

			// 如果flag为true

			if (status.flag) {

				// 将当前li的index赋值给status.cPoint存储变量

				if (status.cPoint != $(this).index()) {

					status.cPoint = $(this).index();

					// 执行bannerExcute函数

					me.bannerExcute();
				}
			}
		});
	}

	// 定义默认的左右空间按钮事件并放入事件函数的原型中

	bannerEvent.prototype.arrow = function() {

		//初始化各类参数

		var me = this.$ele,

		param = this.param,

		status = this.status,

		imgLen = this.imgLen;

		// 创建左右箭头控件

		// param.arrowCls[0]接收用户传入的类名

		// 无传入值时使用默认类名

		var arrowBox = $("<ul class='" + param.arrowCls[0] + "'></ul>");

		// 将左右箭头盒子追加到对象元素中

		// get(0)将jQuery对象转为DOM对象

		me.append(arrowBox.get(0));

		// 如果默认箭头开启添加带尖的控件

		if (param.arrowStyle) {

			// 添加带默认尖箭头的左右控件

			arrowP = "<li class='" + param.arrowCls[1] + "'>&lt;</li><li class='" + param.arrowCls[2] + "'>&gt;</li>";

		} else {

			// 否则添加不带尖箭头的左右控件

			arrowP = "<li class='" + param.arrowCls[1] + "'></li><li class='" + param.arrowCls[2] + "'></li>";

		}

		//将左右箭头加到箭头盒子里 

		arrowBox.append(arrowP);

		// 给左箭头添加箭头事件

		arrowBox.find('li').eq(0).on('click',function(e) {

			if (status.flag) {
				
				status.cPoint--;

				me.bannerExcute();
			}
		});

		// 给右箭头添加箭头事件

		arrowBox.find('li').eq(1).on('click',function(e) {
			
			if (status.flag) {
				
				status.cPoint++;
				
				me.bannerExcute();
			}
		});
	} 

/*！
* 定义构造函数--效果函数
*
* 初始化该对象上的各类参数
*
* 设置各类prototype的方法：包括设置效果函数，以及各类效果函数 
*/

	// 创建效果函数对象

	var bannerEffect = function(val) {

		// 初始化各类参数

		this.$ele = $(val);

		this.param = this.$ele.data('banner-param');

		this.status = this.$ele.data('banner-status');

		this.img = this.$ele.data('banner-img');
	}

	// 设置效果函数，用于调用所有效果函数

	bannerEffect.prototype.setEffect = function() {

		// 初始化各类参数

		var effect = this,

		param = this.param,

		status = this.status;

		// 如果效果参数为数组，即为每张图片设置了效果函数，则将每张图片对应的添加效果函数

		if ($.isArray(param.effect)) {

			// 调用新创建的效果函数对象中的方法

			effect[param.effect[status.sPoint]] ? effect[param.effect[status.sPoint]]() : effect['defaults']()

		// 如果效果参数不为数组，即所有图片为相同效果函数	
			
		} else {

			// 调用新创建的效果函数对象中的方法

			effect[param.effect] ? effect[param.effect]() : effect['defaults']();

		}
	}


	// 定义初始默认的效果函数，包括向左滑动，向右滑动，向上滑动，向下滑动

	bannerEffect.prototype.defaults = function() {

		// 初始化各类参数

		var temp = $.effectParam(this.$ele),

		param = this.param,

		status = this.status,

		img = this.img;

		// 将即将进入的图片的zIndex设置为30，使其居于所有图片之上

		img.css(temp[2]).eq(status.cPoint).css('zIndex', 30);

		// 如果即将进入的图片的序号比当前图片的序号大，则执行向左或向上滑动

		if (status.nPoint > status.sPoint) {

			// 即将进入图片执行animate函数的滑动效果

			img.eq(status.cPoint).css(temp[0]).animate(temp[2], param.speed);

			// 即将推出的图片执行animate函数的滑动效果

			img.eq(status.sPoint).animate(temp[1], param.speed);

		// 如果即将进入的图片的序号比当前图片的序号小，则执行向右或向下滑动

		} else if (status.nPoint < status.sPoint) {

			// 即将进入图片执行animate函数的滑动效果

			img.eq(status.cPoint).css(temp[1]).animate(temp[2], param.speed);

			// 即将推出的图片执行animate函数的滑动效果

			img.eq(status.sPoint).animate(temp[0], param.speed);
		}
	}

/*！
* 定义构造函数--执行函数
*
* 初始化该对象上的各类参数
*
* 设置各类prototype的方法：包括下标检测，效果执行，执行参数改变等
*/

	// 创建构造函数

	var bannerMethods = function(val) {

		// 初始化各类参数
		this.$ele = $(val);

		this.status = this.$ele.data('banner-status');

		this.img = this.$ele.data('banner-img');

		this.imgLen = this.$ele.data('banner-imgLen');

		this.param = this.$ele.data('banner-param');

		var status = this.$ele.data('banner-status');

		// 设置flag值为true的函数（其中flag用于判断当前是否已经在执行动画效果，ture为执行完毕，false为还在执行）

		this.changeFlag = function() {

			// 设置当前对象的falg为ture，能够进行下次动画效果

			status.flag = true;
		}
	}

	// 判断当前下表是否已经越界

	bannerMethods.prototype.indexChange = function() {

		var status = this.status,

		imgLen = this.imgLen,

		param = this.param;

		if (!param.cycle && status.cPoint > imgLen - 1) {

			status.cPoint = imgLen - 1;

			return false;

		}else if(!param.cycle && status.cPoint < 0){

			status.cPoint = 0;

			return false;

		}else if(param.cycle && status.cPoint > imgLen - 1){

			status.cPoint = 0;

			return true;

		}else if(param.cycle && status.cPoint < 0){

			status.cPoint = imgLen - 1;

			return true;

		}else{

			return true;
		}

	}

	// 执行效果函数，用于下标逻辑的处理，以及效果函数的调用

	bannerMethods.prototype.excuteEffect = function() {

		// 初始化各类参数

		var methods = this,

		status = this.status,

		param = this.param,

		img = this.img,

		effect =this.$ele.get(0).bannereffect;

		// 获取焦点按钮

		var pointBox = this.$ele.find('.' + param.btnCls[0]).find('div');

		// 如果存在焦点按钮，即参数设置中event添加了btn事件

		if (pointBox) {

			// 所有焦点按钮去除选中样式,并为当前焦点按钮添加选中样式

			pointBox.removeClass(param.btnCls[3]).eq(status.cPoint).addClass(param.btnCls[3]);
		}

		// 设置所有的图片为隐藏，并且zIndex为0，从而防止图片的重叠

		img.css({zIndex: 0,display: 'none'});

		// 设置当前图片为显示，并且zIndex为30，从而显示当前图片

		img.eq(status.sPoint).css({zIndex: 30,display: 'block'});

		// 设置即将进入图片为显示，具体zIndex在效果函数中设置

		img.eq(status.cPoint).css('display', 'block');

		effect.setEffect();

		// 动画结束后更新当前图片下标

		status.sPoint = status.cPoint;
	}

	// 执行函数

	bannerMethods.prototype.onProgress = function() {

		// 初始化各类参数

		var progress = this,

		status = this.status,

		param = this.param;

		status.nPoint = status.cPoint;

		endPoint=progress.indexChange();

		// 调用执行效果的函数

		if (endPoint) {

			progress.excuteEffect();

			// 将flag设置为false，即动画正在执行

			status.flag = false;

			// 设置计时器，在动画执行完成后将flag设置为true，即动画执行完毕

			setTimeout(progress.changeFlag, param.speed);
		}
		
	}

/*！
* 定义构造函数--初始化函数
*
* 初始化该对象上的各类参数
*
* 设置各类prototype的方法：包括初始化参数，初始化事件，初始化布局
*/

	// 创建构造函数
	var bannerInit = function(val, a, b, c, d) {

		// 初始化对象上的参数

		this.$ele = $(val);

		// 效果参数

		this.$ele.data('banner-param', this.initParam(a, b, c, d));

		// 执行状态

		this.$ele.data('banner-status', {
			flag: true,
			mouseH: false,
			cPoint: 0,
			sPoint: 0,
			nPoint: 0
		});

		// 图片盒子

		this.$ele.data('banner-imgBox', this.$ele.children().first());

		// 图片

		this.$ele.data('banner-img', this.$ele.data('banner-imgBox').children());

		// 图片数量

		this.$ele.data('banner-imgLen', this.$ele.data('banner-img').length);

		// banner盒子的宽度

		this.$ele.data('banner-imgW', this.$ele.width());

		// banner盒子的高度

		this.$ele.data('banner-imgH', this.$ele.height());

		// 计时器

		this.timer = null;

		var me = this.$ele,

		param = me.data('banner-param'),

		status = me.data('banner-status');

		// 设置自动播放的函数

		this.autoPlay = function() { 

			// 如果设置的方向参数为left或者up则累加进入图片下标，否则递减

			(param.dir == 'left' || param.dir == 'up') ? status.cPoint++:status.cPoint--;
			
			// 调用执行轮播切换的函数

			me.bannerExcute();

		}
	}

	// 初始化事件函数

	bannerInit.prototype.initEvent = function() {

		// 初始化各类参数

		var me = this.$ele,

		method = this,

		timer = this.timer,

		status = me.data('banner-status'),

		param = me.data('banner-param'),

		event = new bannerEvent(me);

		// 当窗口发生变化时，自动改变banner盒子的宽度和高度

		// 用于保证窗口改变时效果的正确执行

		$(window).resize(function(e) {

			// 重新设置当前盒子宽度

			me.data('banner-imgW', me.width());

			// 重新设置当前盒子高度

			me.data('banner-imgH', me.height());

		}); 

		// 设置当鼠标移入盒子时暂停动画并且将mouseH参数设置为true

		me.on('mouseover',function(e) {

			clearInterval(timer);

			timer = null;

			status.mouseH = true;

		});

		// 设置当鼠标移入盒子时继续动画并且将mouseH参数设置为false

		me.on('mouseout',function(e) {

			param.auto && (timer = setInterval(method.autoPlay, param.interval));

			status.mouseH = false;

		});

		event.setEvent();

		// 初始化自动播放函数

		param.auto && (timer = setInterval(method.autoPlay, param.interval));
	}

	// 初始化页面布局

	bannerInit.prototype.layout = function() {

		// 初始化各类参数

		var me = this.$ele,

		imgBox = me.data('banner-imgBox');

		img = me.data('banner-img');

		// 将banner元素隐藏并设置相对定位

		// 隐藏目的用于防止初始化布局过程中的显示错乱

		me.hide().css('position', 'relative');

		// 为图片盒子元素设置绝对定位以及class名称

		// 为图片设置绝对定位以及class名称

		imgBox.css('position', 'absolute').addClass('jquery-bannerImg').children().css('position', 'absolute').addClass('jquery-bannerImg-images');

		// 将所有图片初始化设置为隐藏，zIndex为0

		// 初始化第一张图片为显示，zIndex为30

		img.css({display: 'none',zIndex: 0}).eq(0).css({display: 'block',zIndex: 30});

		// 设置图片盒子后的其他所有元素的zIndex为50

		// 使焦点，左右控件等元素能够显示在图片之上

		imgBox.nextAll().css('zIndex', 50);

		// 布局完成， 显示banner元素

		me.show();
	}

	// 初始化各项参数

	bannerInit.prototype.initParam = function(a, b, c, d) {

		var param = {

			// 方向参数，默认值为left

			// 取值包括left（可省略）right up down

			// 向左事件可缺省

			dir: 'left',

			// 效果参数，默认defaults

			// 取值包括fade，cut，默认执行向左

			effect: 'defaults',

			// 动画速度参数

			// 默认取值600ms

			// 参数可缺省

			speed: 600,

			// 动画间隔参数

			// 默认取值3000ms

			// 参数可缺省

			interval: 3000,

			// 事件参数

			// 默认取值开启左右控件和焦点按钮

			// 取值['wheel','keyboard','btn','arrow']

			// 必须以数组的形式传参，当用户设置此参数时，只执行用户设置的参数

			// 参数无顺序限制

			// 参数可缺省

			event: ['btn', 'arrow'],

			// 自动轮播参数

			// 默认值为true

			// 取值 true false

			auto: true,

			// 循环滚动参数

			// 默认取值true

			// 取值 true false

			cycle: true,

			// 焦点按钮的类名

			// 默认类名为以下设置

			// 用户可完全自定义

			// 设置时必须以数组形式传参

			// 参数可缺省

			// 参数依次为 焦点按钮盒子 焦点按钮 焦点按钮选中时 

			btnCls: ['jquery-bannerPoint-box', 'jquery-bannerPoint', 'jquery-bannerPoint-point', 'jquery-bannerPoint-hover'],

			// 左右控件类名

			// 以下默认类名

			// 用户可完全自定义

			// 设置时必须以数组形式传参

			// 参数可缺省

			// 参数依次为 箭头盒子 左箭头 右箭头 

			arrowCls: ['jquery-bannerBtn', 'jquery-bannerBtn-left', 'jquery-bannerBtn-right'],

			// 开启或取消默认的左右尖箭头

			// 默认值：true

			// 取值 true false

			arrowStyle: true
		}

		// 如果传递的参数第一个值为object对象，则与默认参数进行合并

		if ($.isObject(a)) {

			param = $.extend({},param, a);

		// 如果传递的参数第一个值不为object对象

		} else {

			// 第一个参数设置为方向

			param.dir = a;

			// 第二个参数设置为间隔

			param.interval = b;

			// 第三个参数设置为动画速度

			param.speed = c;

			// 第四个参数设置为效果

			param.effect = d; 

			// 如果第一个参数为数字，则将第一个参数设置为间隔，第二个参数设置为动画速度

			!isNaN(a) && (param.interval = a, param.speed = b); 

			// 如果第一个参数不为方向，则设置为效果

			(a == 'left' || a == 'right' || a == 'up' || a == 'down') ? (param.dir = a) : (effect = a);

		}

		// 如果方向参数不为方向，设置为默认left

		param.dir = (param.dir == 'left' || param.dir == 'right' || param.dir == 'up' || param.dir == 'down') ? param.dir: 'left';
		
		// 如果动画速度为null，设置默认600ms

		param.speed = (param.speed == null) ? 600 : param.speed;
		
		// 如果动画间隔为null，设置默认3000ms

		param.interval = (param.interval == null) ? 3000 : param.interval;
		
		// 如果动画间隔参数为fast，设置动画间隔为1500ms，动画速度为300ms

		param.interval == 'fast' && (param.interval = 1500, param.speed = 300);
		
		// 如果动画间隔参数为medium，设置动画间隔为3000ms，动画速度为600ms

		param.interval == 'medium' && (param.interval = 3000, param.speed = 600);
		
		// 如果动画间隔参数为slow，设置动画间隔为6000ms，动画速度为1200ms

		param.interval == 'slow' && (param.interval = 6000, param.speed = 1200); 

		// 执行完上述设置后，动画间隔或动画速度依旧为非数字，则设置默认动画间隔为3000ms，动画速度为600ms

		(isNaN(param.interval) || isNaN(param.speed)) && (param.interval = 3000, param.speed = 600); 

		// 如果动画速度大于动画间隔，抛出错误

		(param.interval < param.speed) && jQuery.error('参数设置错误 动画间隔小于动画速度');
		
		// 设置是否自动播放，默认为true

		param.auto = (param.auto === false) ? false: true;
		
		// 设置是否循环播放，默认为true

		param.cycle = (param.cycle === false) ? false: true;
		
		// 设置是否添加默认左右控件箭头，默认为ture

		param.arrowStyle = (param.arrowStyle === false) ? false: true; 

		// 如果图片张数小于等于1，设置自动播放为false，且删除所有事件

		(this.imgLen <= 1) && (param.auto = false, param.event = '');

		// 如果对象中有data属性参数，则将data属性值与参数合并，优先data属性值

		if (this.$ele.data('banner-param')) {
			console.log(this.$ele.data('banner-param'))

			return $.extend({},param, this.$ele.data('banner-param'));

		// 如果对象中没有data属性参数，则直接返回
		} else {

			return param;
		}

	}

/*！
* 在jQuery原型中创建一个对象级方法，用于对外接口，是开发者能够向插件中自定义效果函数和事件函数
*
* var a = obj.bannerTool();  创建一个实例，obj 可以为任意元素（当需要获取参数设置时，obj必须为执行了banner函数的对象）
*
* 新的实例对象a可以调用内部的方法
*/

	$.fn.bannerTool = function() {

		// 获得当前元素的jquery对象

		var me = $(this);

		// 定义tool类，包含各种接口函数	

		var tool = {

			// 添加效果函数

			addEffect: function(name, fn) {

				// 将新添加的效果函数放到原型中

				bannerEffect.prototype[name] = function() {

					//提供开发者各项可能需要的值(obj为当前banner对象,img为当前图片对象,param为各项参数,status为当前轮播相关信息)

					fn.call({'obj': this.$ele,'img': this.img,'param': this.param,'status': this.status});
				}
				return this;
			},

			// 添加事件函数

			addEvent: function(name, fn) {

				// 将新添加的事件函数放到原型中

				bannerEvent.prototype[name] = function() {

					// 提供开发者各项可能需要的值(obj为当前banner对象,param为各项参数,status为当前轮播相关信息)

					fn.call({'obj': this.$ele,'param': this.param,'status': this.status});

				}
				return this;
			},
			getParam: function() {

				// 以对象的格式返回各项参数

				return param ? param: 'No param found in this element';
			}
		}

		// 返回tool对象

		return tool;
	}

/*！
* 在jQuery原型中创建一个对象级方法，用于调用执行方法
*/

	$.fn.bannerExcute = function() {

		// 获取当前对象
		var me = $(this).get(0);

		//调用执行方法

		me.bannerexcute.onProgress();
	}


/*！
* 在jQuery原型中创建一个对象级方法，用于调用banner方法
*/

	$.fn.banner = function(a, b, c, d) {

		// 将调用对象保保存在变量me中

		// 此处非功能对象而是页面上的元素DOM对象

		var me = $(this);

		// 循环遍历添加banner方法
		$.each(me,function(index, val) {

			var newBanner = new bannerInit(val, a, b, c, d);

			newBanner.initEvent();

			newBanner.layout();

			val.bannerexcute = new bannerMethods(val);

			val.bannereffect = new bannerEffect(val);

		});

		return me;
	}
})(jQuery)