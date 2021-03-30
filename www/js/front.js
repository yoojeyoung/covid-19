if( window.console == undefined ){ console = { log : function(){} }; }
/** browser checker **/
;(function($){$.browserTest=function(a,z){var u='unknown',x='X',m=function(r,h){for(var i=0;i<h.length;i=i+1){r=r.replace(h[i][0],h[i][1]);}return r;},c=function(i,a,b,c){var r={name:m((a.exec(i)||[u,u])[1],b)};r[r.name]=true;r.version=(c.exec(i)||[x,x,x,x])[3];if(r.name.match(/safari/)&&r.version>400){r.version='2.0';}if(r.name==='presto'){r.version=($.browser.version>9.27)?'futhark':'linear_b';}r.versionNumber=parseFloat(r.version,10)||0;r.versionX=(r.version!==x)?(r.version+'').substr(0,1):x;r.className=r.name+r.versionX;return r;};a=(a.match(/Opera|Navigator|Minefield|KHTML|Chrome/)?m(a,[[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/,''],['Chrome Safari','Chrome'],['KHTML','Konqueror'],['Minefield','Firefox'],['Navigator','Netscape']]):a).toLowerCase();$.browser=$.extend((!z)?$.browser:{},c(a,/(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/,[],/(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));$.layout=c(a,/(gecko|konqueror|msie|opera|webkit)/,[['konqueror','khtml'],['msie','trident'],['opera','presto']],/(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);$.os={name:(/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase())||[u])[0].replace('sunos','solaris')};if(!z){$('html').addClass([$.os.name,$.browser.name,$.browser.className,$.layout.name,$.layout.className].join(' '));}};$.browserTest(navigator.userAgent);})(jQuery);//http://jquery.thewikies.com/browser/
var CTC = CTC || {};
CTC = {
	touchis : "ontouchstart" in window,
	init : function(){
		var funcThis = this;
		$(function(){
			if(funcThis.touchis){
				$("html").addClass("touchmode");
			}else{
				$("html").removeClass("touchmode");
			}
			funcThis.dimLayerControl();
			funcThis.layoutCommon();
			funcThis.formCommon();
		});
		$(window).on("load",function(){
			funcThis.oldBrowerPop();
		});
	},
	layoutCommon : function(){
		// var menuList = $('.plm_list > li').find('.pltm_list_w');
		// if(menuList.length){
		// 	menuList.closest('li').find('.plm').css({
		// 		'background' : '#fff'
		// 	})
		// }
		$(".adm_mendl_w").on("click",function(){
			$(".mentype_list_w").slideToggle();
		});
		$(".btn_pghtotal").on("click",function(){
			$(".page_wrap").toggleClass("fold");
		});
		$(".plm").on("click",function(){
			var $this = $(this),
				$t_p = $this.parents(".plm_list > li"),
				$t_g = $(".plm_list > li").not($t_p), 
				$t_t = $this.next(".pltm_list_w");

			if($t_g.hasClass("active")){
				$t_g.removeClass("active");
				
				if($(".page_wrap").hasClass("fold")){
					$t_g.find(".pltm_list_w").css("display","");
				}else{
					$t_g.find(".pltm_list_w").slideUp();
				}
			}
			
			$t_p.toggleClass("active");
			$t_t.slideToggle();
		});

		$(document).on("click",function(e){
			if($(e.target).parents(".adm_men_w").length === 0){
				$(".mentype_list_w").slideUp();
			}
		});
	},
	rockMenu : function(target){
		$(function(){
			var $target = $(target) || target;
			$target.addClass("active");
			$target.find(".pltm_list_w").show();
		});
	},
	dimLayerControl : function(){
		var thisUI = this;
		$(document).on("click",".btn_layerclose , .closetrigger",function(){
			thisUI.dimLayerHide($(this).parents(".dimlayer_z"));
		});
	},
	dimLayerShow : function(target,callback){
		$(function(){
			action(target,callback);
		});
		function action(target,callback){
			var $target = $(target),
				$t_layer_td = null,
				$t_layer_tit_low = null,
				$t_layer_tit_low_height = 0,
				$t_layer_td_cssptd = 0,
				$t_layer_td_csspbd = 0,
				$t_btn_lysm_w = null,
				$t_btn_lysm_w_height = 0,
				$t_layer_cont = null,
				$t_layer_box = null,
				$t_layer_box_height = 0;
			
			$(".dimlayer_z").hide();
			$target.show();
			setTimeout(function(){
				$t_layer_td = $target.find(".dimlayer_td");
				$t_layer_td_cssptd = $t_layer_td.length ? parseInt($t_layer_td.css("padding-top")) : 0;
				$t_layer_td_csspbd = $t_layer_td.length ? parseInt($t_layer_td.css("padding-bottom")) : 0;
				$t_layer_box = $target.find(".layer_box");
				$t_layer_box_height = $t_layer_box.length ? $t_layer_box.outerHeight() : 0;
				
				boxHeight();
				
				if($t_layer_box_height+$t_layer_td_cssptd+$t_layer_td_csspbd > $(window).height()){
					$("html,body").addClass("touchDis");
				}
				$(window).on("resize",function(){
					boxHeight();
				});
				if(callback){
					callback();
				}
			},50);
			
			function boxHeight(){
				$t_layer_tit_low = $target.find(".layer_tit_low");
				$t_layer_tit_low_height = $t_layer_tit_low.length ? $t_layer_tit_low.outerHeight() : 0;
				$t_btn_lysm_w = $target.find(".btn_lysm_w");
				$t_btn_lysm_w_height = $t_btn_lysm_w.length ? $t_btn_lysm_w.outerHeight() : 0;
				$t_layer_cont = $target.find(".layer_cont");
				$t_layer_cont.css("max-height",$(window).height() - ($t_layer_td_cssptd+$t_layer_td_csspbd+$t_btn_lysm_w_height+$t_layer_tit_low_height));
			}
		}
		function getScrollBarWidth() {
		    var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
		        widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
		    $outer.remove();
		    return 100 - widthWithScroll;
		};
	},
	dimLayerHide : function(target){
		$(function(){
			action(target);
		});
		
		function action(target){
			var $target = $(target);
			$(".dimlayer_z").hide();
			$target.hide();
			$("html,body").removeClass("touchDis");
		}
	},
	/* 구브라우저 미지원 팝업 */
	oldBrowerPop : function(){
		var innerHtml = "";
		if( navigator.appName.indexOf("Microsoft") > -1 ){
			if(navigator.appVersion.indexOf("MSIE 7") > -1 || navigator.appVersion.indexOf("MSIE 8") > -1 || navigator.appVersion.indexOf("MSIE 9") > -1){
				innerHtml += "<div class='browser_layer_w'>";
				innerHtml += "<div class='browser_layer'>";
				innerHtml += "<div class='brow_top'>미지원 브라우저 알림</div>";
				innerHtml += "<div class='brow_mid'>";
				innerHtml += "<p class='brow_mid_p'>";
				innerHtml += "웹사이트의 모든 기능을 이용하시려면<br>";
				innerHtml += "최신 브라우저로 업데이트하시기 바랍니다.";
				innerHtml += "</p>";
				innerHtml += "<p class='brow_btn_w'>";
				innerHtml += "<a href='https://support.microsoft.com/ko-kr/help/17621/internet-explorer-downloads' class='brow_btn' target='_blank' title='새창'><span class='hdtext'>Internet Explorer 다운로드 바로가기</span></a>";
				innerHtml += "</p>";
				innerHtml += "</div>";
				innerHtml += "</div>";
				innerHtml += "</div>";
				$("body").append(innerHtml);
				$(".browser_layer").css({"margin-top":-$(".browser_layer").outerHeight()/2});
				$(".browser_layer_w").addClass("complete");
				$(".page_wrap").css({"z-index":0});
			}
		}
	},
	windowPopup : function(w,h,url) {
		cw=screen.availWidth;     //화면 넓이
		ch=screen.availHeight;    //화면 높이
		sw=w;    //띄울 창의 넓이
		sh=h;    //띄울 창의 높이
		ml=(cw-sw)/2;        //가운데 띄우기위한 창의 x위치
		mt=(ch-sh)/2;         //가운데 띄우기위한 창의 y위치
		test=window.open(url,'tst','width='+sw+',height='+sh+',top='+mt+',left='+ml+',resizable=no,scrollbars=yes');
	},
	formCommon : function(){
		$(document).on("change",".dsel",function(){
			var $this = $(this),
				$t_opt = $this.find("option:selected")[0].value;
			if($t_opt === "0"){
				$this.addClass("ing_place");
			}else{
				$this.removeClass("ing_place");
			}
		});
	}
};
CTC.init();

