; (function($) {

	$.extend({

		isArray: function(v) {

			return Object.prototype.toString.call(v) === '[object Array]';

		},

		addBannerEffect:function(name,fn){

			bannerEvent.prototype[name] = function() {

				fn.call({'obj': this.$ele,'param': this.param,'status': this.status});

			}
		},

		isObject: function(v) {

			return Object.prototype.toString.call(v) === '[object Object]';

		},

		effectParam: function(val) {

			var me = $(val),

			status = me.data('lzbanner-status'),

			imgW = status.imgW,

			imgH = status.imgH,

			eParam = [],

			param = me.data('lzbanner-param');

			if (param.dir == 'left' || param.dir == 'right') {

				eParam.push({left: imgW});

				eParam.push({left: -imgW});

				eParam.push({left: 0});
					
			} else if (param.dir == 'up' || param.dir == 'down') {

				eParam.push({top: imgH});

				eParam.push({top: -imgH});

				eParam.push({top: 0});
			}

			return eParam;
		}
	})

	var bannerEvent = function(val) {

		this.$ele = $(val);

		this.param = this.$ele.data('lzbanner-param');

		this.status = this.$ele.data('lzbanner-status');

		this.imgBox = this.$ele.data('lzbanner-imgBox');

		this.img = this.$ele.data('lzbanner-img');

	}

	bannerEvent.prototype.setEvent = function() {

		var event = this,

		param = this.param;

		if ($.isArray(param.event)) {

			$.each(param.event,function(index, val) {

				event[val] && event[val]();

			});

		} else {

			event[param.event] && event[param.event]();

		}
	}

	bannerEvent.prototype.wheel = function(){

		var me = this.$ele,

		status = this.status;

		me.off('mousewheel.lzbanner DOMMouseScroll.lzbanner').on('mousewheel.lzbanner DOMMouseScroll.lzbanner',function(e){

			if(status.flag && status.mouseH){

				e.preventDefault();

				var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) || // chrome & ie
           			 (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1)); // firefox 

           		if(delta>0) status.cPoint--;
           		if(delta<0) status.cPoint++;

           		me.bannerExcute();

			}

		})
	}

	bannerEvent.prototype.keyboard = function(){

		var me = this.$ele,

		status = this.status;

		$(window).on('keydown',function(e){

			if(status.flag && status.mouseH){

				e.preventDefault();

				if(e.keyCode == 37 || e.keyCode ==38) status.cPoint--;

				if(e.keyCode ==39 || e.keyCode==40) status.cPoint++;

				me.bannerExcute();

			}

		})

	}

	bannerEvent.prototype.btn = function() {

		var me = this.$ele,

		param = this.param,

		status = this.status,

		imgBox = this.imgBox,

		img = this.img,

		imgLen = status.imgLen,

		btnW = 0;

		var pointBox = $("<ul class='" + param.btnCls[0] + "'></ul>");

		me.append(pointBox.get(0));

		pointInBox = $("<li class='" + param.btnCls[1] + "'></li>");

		pointBox.append(pointInBox.get(0));

		point = "<div class='" + param.btnCls[2] + "'></div>";

		for (i = 0; i < imgLen; pointInBox.append(point), i++);
			
		btnW = pointBox.find('div').eq(0).outerWidth(true) * imgLen;

		pointInBox.css('width', btnW).find('div').eq(0).addClass(param.btnCls[3]);

		pointBox.find('div').off('.lzbanner').on('click.lzbanner',function(event) {

			if (status.flag) {

				if (status.cPoint != $(this).index()) {

					status.cPoint = $(this).index();

					me.bannerExcute();
				}
			}
		});
	}

	bannerEvent.prototype.arrow = function() {

		var me = this.$ele,

		param = this.param,

		status = this.status,

		imgLen = status.imgLen;

		var arrowBox = $("<ul class='" + param.arrowCls[0] + "'></ul>");

		me.append(arrowBox.get(0));

		if (param.arrowStyle) {

			arrowP = "<li class='" + param.arrowCls[1] + "'>&lt;</li><li class='" + param.arrowCls[2] + "'>&gt;</li>";

		} else {

			arrowP = "<li class='" + param.arrowCls[1] + "'></li><li class='" + param.arrowCls[2] + "'></li>";

		}

		arrowBox.append(arrowP);

		arrowBox.find('li').eq(0).off('.lzbanner').on('click.lzbanner',function(e) {

			if (status.flag) {
				
				status.cPoint--;

				me.bannerExcute();
			}
		});

		arrowBox.find('li').eq(1).off('.lzbanner').on('click.lzbanner',function(e) {
			
			if (status.flag) {
				
				status.cPoint++;
				
				me.bannerExcute();
			}
		});
	} 

	var bannerEffect = function(val) {

		this.$ele = $(val);

		this.param = this.$ele.data('lzbanner-param');

		this.status = this.$ele.data('lzbanner-status');

		this.img = this.$ele.data('lzbanner-img');
	}

	bannerEffect.prototype.setEffect = function() {

		var effect = this,

		param = this.param,

		status = this.status;

		if ($.isArray(param.effect)) {

			effect[param.effect[status.sPoint]] ? effect[param.effect[status.sPoint]]() : effect['defaults']()
			
		} else {

			effect[param.effect] ? effect[param.effect]() : effect['defaults']();

		}
	}


	bannerEffect.prototype.defaults = function() {

		var temp = $.effectParam(this.$ele),

		param = this.param,

		status = this.status,

		img = this.img;

		img.css(temp[2]).eq(status.cPoint).css('zIndex', 30);

		if (status.nPoint > status.sPoint) {

			img.eq(status.cPoint).css(temp[0]).animate(temp[2], param.speed);

			img.eq(status.sPoint).animate(temp[1], param.speed);

		} else if (status.nPoint < status.sPoint) {

			img.eq(status.cPoint).css(temp[1]).animate(temp[2], param.speed);

			img.eq(status.sPoint).animate(temp[0], param.speed);
		}
	}

	bannerEffect.prototype.fade = function(){

		var img = this.img,

		param = this.param,

		status = this.status;

		img.eq(status.cPoint).css({
			top:0,
			left:0,
			zIndex: 35,
			display: 'none'
		}).fadeIn(param.speed);

	}

	bannerEffect.prototype.cut = function(){

		var img = this.img,

		status = this.status;

		img.eq(status.cPoint).css({
			top:0,
			left:0,
			zIndex:35
		});

	}

	var bannerMethods = function(val) {

		this.$ele = $(val);

		this.status = this.$ele.data('lzbanner-status');

		this.img = this.$ele.data('lzbanner-img');

		this.param = this.$ele.data('lzbanner-param');

	}

	bannerMethods.prototype.autoPlay = function(){

		var me = this.$ele,

		status = this.status,

		param = this.param;

		(param.dir == 'left' || param.dir == 'up') ? status.cPoint++:status.cPoint--;

		me.bannerExcute();

	}

	bannerMethods.prototype.indexChange = function() {

		var status = this.status,

		imgLen = status.imgLen,

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

	bannerMethods.prototype.excuteEffect = function() {

		var methods = this,

		status = this.status,

		param = this.param,

		img = this.img,

		effect =this.$ele.get(0).bannereffect;

		var pointBox = this.$ele.find('.' + param.btnCls[0]).find('div');

		if (pointBox) {

			pointBox.removeClass(param.btnCls[3]).eq(status.cPoint).addClass(param.btnCls[3]);
		}

		img.css({zIndex: 0,display: 'none'});

		img.eq(status.sPoint).css({zIndex: 30,display: 'block'});

		img.eq(status.cPoint).css('display', 'block');

		effect.setEffect();

		status.sPoint = status.cPoint;
	}

	bannerMethods.prototype.onProgress = function() {

		var progress = this,

		status = this.status,

		param = this.param;

		status.nPoint = status.cPoint;

		endPoint=progress.indexChange();

		if (endPoint) {

			progress.excuteEffect();

			if(status.sPoint==status.imgLen-1 && param._onLast) param._onLast.call(this,param,status);

			param._onSwitch && param._onSwitch.call(this,param,status);

			status.flag = false

			setTimeout(function(){

				status.flag = true;

			}, param.speed);
		}
		
	}

	var bannerInit = function(val, a, b, c, d) {

		this.$ele = $(val);

		this.$ele.data('lzbanner-param', this.initParam(a, b, c, d));

		this.$ele.data('lzbanner-imgBox', this.$ele.children().first());

		this.$ele.data('lzbanner-img', this.$ele.data('lzbanner-imgBox').children());

		this.$ele.data('lzbanner-status', {
			flag: true,
			mouseH: false,
			cPoint: 0,
			sPoint: 0,
			nPoint: 0,
			imgW:this.$ele.width(),
			imgH:this.$ele.height(),
			imgLen:this.$ele.data('lzbanner-img').length,
			timer:null
		});
	}

	bannerInit.prototype.initEvent = function() {

		var me = this.$ele,

		self = me.get(0),

		status = me.data('lzbanner-status'),

		param = me.data('lzbanner-param'),

		event = new bannerEvent(me);

		$(window).resize(function(e) {

			status.imgW = me.width();

			status.imgH = me.height();

		}); 

		me.off('.lzbanner').on('mouseover.lzbanner',function(e) {

			clearInterval(status.timer);

			status.timer = null;

			status.mouseH = true;

		}).on('mouseout.lzbanner',function(e) {

			param.auto && (status.timer = setInterval(self.bannerexcute.autoPlay.bind(self.bannerexcute), param.interval));

			status.mouseH = false;

		});

		event.setEvent();

		param.auto && (status.timer = setInterval(self.bannerexcute.autoPlay.bind(self.bannerexcute), param.interval));

	}

	bannerInit.prototype.layout = function() {

		var me = this.$ele,

		status = me.data('lzbanner-status'),

		imgBox = me.data('lzbanner-imgBox');

		img = me.data('lzbanner-img');

		me.hide().css('position', 'relative');

		imgBox.css('position', 'absolute').addClass('lz-bannerImg').children().css('position', 'absolute').addClass('lz-bannerImg-images');

		img.css({display: 'none',zIndex: 0}).eq(0).css({display: 'block',zIndex: 30});

		imgBox.nextAll().css('zIndex', 50);

		me.show();

	}

	bannerInit.prototype.initParam = function(a, b, c, d) {

		var param = {

			dir: 'left',

			effect: 'defaults',

			speed: 600,

			interval: 3000,

			event: ['btn', 'arrow'],

			auto: true,

			cycle: true,

			btnCls: ['lz-bannerPoint-box', 'lz-bannerPoint', 'lz-bannerPoint-point', 'lz-bannerPoint-hover'],

			arrowCls: ['lz-bannerBtn', 'lz-bannerBtn-left', 'lz-bannerBtn-right'],

			arrowStyle: true,

			_onSwitch:null,

			_onLast:null
		}

		if ($.isObject(a)) {

			param = $.extend({},param, a);

		} else {

			param.dir = a;

			param.interval = b;

			param.speed = c;

			param.effect = d; 

			!isNaN(a) && (param.interval = a, param.speed = b); 

			(a == 'left' || a == 'right' || a == 'up' || a == 'down') ? (param.dir = a) : (effect = a);

			typeof a === 'function' && (param._onSwitch=a);

		}

		if(this.$ele.data('banner-param')){

			$.extend({},param, this.$ele.data('banner-param'));

		}

		param.dir = (param.dir == 'left' || param.dir == 'right' || param.dir == 'up' || param.dir == 'down') ? param.dir: 'left';

		param.speed = (param.speed == null) ? 600 : param.speed;

		param.interval = (param.interval == null) ? 3000 : param.interval;

		param.interval == 'fast' && (param.interval = 1500, param.speed = 300);

		param.interval == 'medium' && (param.interval = 3000, param.speed = 600);

		param.interval == 'slow' && (param.interval = 6000, param.speed = 1200); 

		(isNaN(param.interval) || isNaN(param.speed)) && (param.interval = 3000, param.speed = 600); 

		(param.interval < param.speed) && jQuery.error('参数设置错误 动画间隔小于动画速度');
		
		param.auto = (param.auto === false) ? false: true;

		param.cycle = (param.cycle === false) ? false: true;

		param.arrowStyle = (param.arrowStyle === false) ? false: true; 

		typeof param._onSwitch !=='function' && (param._onSwitch = null);

		typeof param._onLast !=='function'  && (param._onLast=null);

		(this.imgLen <= 1) && (param.auto = false, param.event = '');

			return param;
	}

	var tool = function(val){

		this.$ele = $(val);

	}

	tool.prototype.destory = function(){

		var me = this.$ele;

		$.each(me,function(index,val){

			var self = $(val),

			status = self.data('lzbanner-status'),

			param = self.data('lzbanner-param');

			if(status.timer) clearInterval(status.timer);

			self.off('lzbanner');

			if(btn=self.find(param.btnCls[0])) btn.remove();

			if(arrow = self.find(param.arrowCls[0])) btn.remove();

			self.removeData('lzbanner-status').removeData('lzbanner-param');

		})

		return false;

	}

	tool.prototype.init = function(a,b,c,d){

		var me = this.$ele;

		$.each(me,function(index,val){

			var self = $(val),

			status = self.data('lzbanner-status'),

			param = self.data('lzbanner-param');

			if(status.timer) clearInterval(status.timer);

			self.off('lzbanner');

			if(btn=self.find(param.btnCls[0])) btn.remove();

			if(arrow = self.find(param.arrowCls[0])) btn.remove();

			self.removeData('lzbanner-status').removeData('lzbanner-param');

		})

		me.lzbanner(a,b,c,d);

	}

	tool.prototype.index = function(num){

		var me = this.$ele;

		if(num===undefined){

			return me.eq(0).data('lzbanner-status').sPoint+1;

		}else{

			$.each(me,function(index,val){

				$(val).data('lzbanner-status').cPoint = num-1;

				$(val).bannerExcute();

			})

			return this;

		}

	}

	tool.prototype.next = function(){

		var self = this;

		var me = this.$ele;

		$.each(me,function(index,val){

			self.stop();

			var status = $(val).data('lzbanner-status'),

			param = $(val).data('lzbanner-param');

			if(status.flag){

				status.cPoint +=1;

				$(val).bannerExcute();

			}

			param.auto && self.start();

		})

		return this;

	}

	tool.prototype.prev = function(){

		self = this;

		var me = this.$ele;

		$.each(me,function(index,val){

			self.stop();

			var status = $(val).data('lzbanner-status'),

			param = $(val).data('lzbanner-param');

			if(status.flag){

				status.cPoint -=1;

				$(val).bannerExcute();
			}

			param.auto && self.start();

		})

		return this;

	}

	tool.prototype.setInterval = function(num){

		var me = this.$ele;

		$.each(me,function(index,val){

			var param = $(val).data('lzbanner-param');

			num>param.speed && (param.interval=num);

		})

		return this;

	}

	tool.prototype.setSpeed = function(num){

		var me = this.$ele;

		$.each(me,function(index,val){

			var param = $(val).data('lzbanner-param');

			num<param.interval && (param.speed=num);

		})

		return this;

	}

	tool.prototype.setEffect = function(arr){

		var me = this.$ele;

		$.each(me,function(index,val){

			$(val).data('lzbanner-param').effect=arr;

		})

		return this;

	}

	tool.prototype.setDirection = function(str){

		var me = this.$ele;

		$.each(me,function(index,val){

			$(val).data('lzbanner-img').css({
				top:0,
				left:0
			})

			$(val).data('lzbanner-param').dir=str;

		})

		return this;

	}

	tool.prototype.start = function(){

		var me = this.$ele;

		$.each(me,function(index,val){

			var status = $(val).data('lzbanner-status'),

			param = $(val).data('lzbanner-param');

			if(!status.timer){

				status.timer = setInterval(val.bannerexcute.autoPlay.bind(val.bannerexcute),param.interval)

			}

		})

		return this;

	}

	tool.prototype.stop = function(){

		var me = this.$ele;

		$.each(me,function(index,val){

			var status = $(val).data('lzbanner-status');

			if(status.timer){

				clearInterval(status.timer);

				status.timer = null;

			}	

		})

		return this;

	}

	tool.prototype.onCycle = function(){

		var me = this.$ele;

		$.each(me,function(index,val){

			$(val).data('lzbanner-param').cycle=true;

		})

		return this;


	}

	tool.prototype.offCycle = function(){

		var me = this.$ele;

		$.each(me,function(index,val){

			$(val).data('lzbanner-param').cycle=false;

		})

		return this;


	}

	tool.prototype.on = function(str,fn){

		var me =this.$ele;

		if(typeof fn ==='function'){

			$.each(me,function(index,val){

				str ==='switch' && ($(val).data('lzbanner-param')._onSwitch=fn);

				str ==='last' && ($(val).data('lzbanner-param')._onLast=fn);

			})

		}

	}

	$.fn.bannerTool = function(){

		var me = $(this);

		return new tool(me);

	}

	$.fn.bannerExcute = function() {

		var me = $(this).get(0);

		me.bannerexcute.onProgress();
	}

	$.fn.lzbanner = function(a,b,c,d){

		var me = $(this);

		$.each(me,function(index,val){

			var newBanner = new bannerInit(val,a,b,c,d);

			val.bannerexcute = new bannerMethods(val);

			val.bannereffect = new bannerEffect(val);

			newBanner.initEvent();

			newBanner.layout();

		})

		return me.bannerTool();

	}

})(jQuery)