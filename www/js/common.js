if( window.console == undefined ){ console = { log : function(){} }; }
/** browser checker **/
;(function($){$.browserTest=function(a,z){var u='unknown',x='X',m=function(r,h){for(var i=0;i<h.length;i=i+1){r=r.replace(h[i][0],h[i][1]);}return r;},c=function(i,a,b,c){var r={name:m((a.exec(i)||[u,u])[1],b)};r[r.name]=true;r.version=(c.exec(i)||[x,x,x,x])[3];if(r.name.match(/safari/)&&r.version>400){r.version='2.0';}if(r.name==='presto'){r.version=($.browser.version>9.27)?'futhark':'linear_b';}r.versionNumber=parseFloat(r.version,10)||0;r.versionX=(r.version!==x)?(r.version+'').substr(0,1):x;r.className=r.name+r.versionX;return r;};a=(a.match(/Opera|Navigator|Minefield|KHTML|Chrome/)?m(a,[[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/,''],['Chrome Safari','Chrome'],['KHTML','Konqueror'],['Minefield','Firefox'],['Navigator','Netscape']]):a).toLowerCase();$.browser=$.extend((!z)?$.browser:{},c(a,/(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/,[],/(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));$.layout=c(a,/(gecko|konqueror|msie|opera|webkit)/,[['konqueror','khtml'],['msie','trident'],['opera','presto']],/(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);$.os={name:(/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase())||[u])[0].replace('sunos','solaris')};if(!z){$('html').addClass([$.os.name,$.browser.name,$.browser.className,$.layout.name,$.layout.className].join(' '));}};$.browserTest(navigator.userAgent);})(jQuery);//http://jquery.thewikies.com/browser/
var COVID = COVID || {};
COVID = {
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
			funcThis.formCommon();
		});
		$(window).on("load",function(){
			funcThis.oldBrowerPop();
			funcThis.commonFunc();
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
	},
	commonFunc : function(){
		var touchmode = "ontouchstart" in window;
		if(touchmode){
			document.querySelector("body").classList.add("touchmode");
		}
		var pghtopmenulow = document.querySelector(".pghtopmenu-low");
		var btnmbtotal = document.querySelector(".btn-mbtotal");
		var bgpghdim = document.querySelector(".bg-pghdim");
		var pghtopmenu = document.querySelector(".pghtopmenu-list");
		var pghtopmenuli = document.querySelectorAll(".pghtopmenu-list > li");
		var pghom = document.querySelectorAll(".pghom");
		var pghsidezone = document.querySelector(".pghside-zone");
		var pghtmListWrap = document.querySelectorAll(".pghtm-list-wrap");
		var currentItem = null;
		var rockItem = null;
		var pghmenuObj = null;
		init();
		function init(){
			if(pghtopmenulow !== null){
				if(pghmenuObj == null){
					pghmenuObj = new IScroll(".pghtopmenu-low",{
						mouseWheel: true,
						preventDefault : false
					});
				}else{
					pghmenuObj.refresh();
				}
				[].forEach.call(pghtopmenuli, function(el) {
					if(el.children[1] !== undefined){
						el.classList.add("has-menu");
					}
				});
			}
		}
		[].forEach.call(pghom,function(pghom_this){
			pghom_this.togis = false;
			pghom_this.addEventListener("click",function(e){
				var nextItem = pghom_this.nextElementSibling;
				var setTimeObj = 0;
				var setTimeObj2 = 0;
				if(setTimeObj>0 || setTimeObj2>0){
					clearTimeout(setTimeObj);
					clearTimeout(setTimeObj2);
				}
				if(currentItem && currentItem !== pghom_this){
					currentItem.classList.remove("active");
					if(currentItem.nextElementSibling !== null){
						currentItem.nextElementSibling.style.height = "0px";
					}
					pghom_this.togis = false;
				}
				pghom_this.classList.toggle('active');
				if(pghom_this.togis){
					if(nextItem !== null && !nextItem.classList.contains("ani")){
						nextItem.classList.add("ani");
						nextItem.style.height = "0px";
					}
				}else{
					if(nextItem !== null && !nextItem.classList.contains("ani")){
						nextItem.classList.add("ani");
						nextItem.style.display = "block";
						nextItem.style.height = nextItem.children[0].clientHeight + "px";
					}
				}
				currentItem = pghom_this;
				setTimeObj = setTimeout(function(){
					if(nextItem !== null){
						nextItem.classList.remove("ani");
					}
					pghmenuObj.refresh();
				},511);
				pghom_this.togis = !pghom_this.togis;
			});
		});
		btnmbtotal.addEventListener("click",function(){
			pghsidezone.style.display = "block";
			setTimeout(function(){
				pghsidezone.classList.add("active");
			},30);
			setTimeout(function(){
				pghmenuObj.refresh();
			},530);
			if(touchmode){
				document.querySelector("body,html").classList.add("touchDis");
			}
		});
		bgpghdim.addEventListener("click",function(){
			pghsidezone.classList.remove("active");
			setTimeout(function(){
				pghsidezone.style.display = "none";
			},530);
			if(touchmode){
				document.querySelector("body,html").classList.remove("touchDis");
			}
		});
		
		window.addEventListener('resize', function(){
			pghmenuObj.refresh();
			resetCss();
		});

		function resetCss(){
			if(window.innerWidth>1679){
				pghsidezone.removeAttribute("style");
				pghsidezone.classList.remove("active");
			}
		}

		function rockMenu(one,two){
			var rockitem = document.querySelector(one);
			var rockitem_m = rockitem.children[0];
			var rockitem_t = rockitem.children[1] !== undefined ? rockitem.children[1] : null;
			var rocktwo = document.querySelector(two);
			
			rockitem_m.classList.add("active");
			if(rockitem_t !== null){
				rockitem_t.classList.add("ani");
				rockitem_t.style.display = "block";
				if(touchmode){
					rockitem_t.style.height = "auto";
				}else{
					rockitem_t.style.height = rockitem_t.children[0].clientHeight + "px";
				}
			}
			if(rocktwo !== null){
				rocktwo.classList.add("active");
			}
			if(rockitem_t !== null){
				rockitem_t.classList.remove("ani");
			}
			pghmenuObj.refresh();

			
			rockitem_m.togis = true;
			currentItem = rockitem_m;

			var firstAction = false;
			btnmbtotal.addEventListener("click",function(){
				if(firstAction){return;}
				rockitem_t.style.height = rockitem_t.children[0].clientHeight + "px";
				firstAction = true;
			});
			window.addEventListener("resize",function(){
				rockitem_t.style.height = rockitem_t.children[0].clientHeight + "px";
			});
		}
		return{
			"rockMenu" : rockMenu
		}
	}
};
COVID.init();

