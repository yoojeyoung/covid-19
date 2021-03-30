//jQuery.noConflict();
! function ($) {

    $(function () {
        initUI.setup();

        // mac os 일 경우 html 태그에 mac_os 클래스 붙임
        if (navigator.userAgent.indexOf('Mac OS X') != -1) {
            $("html").addClass("mac_os");
        }

    });

    var initUI = (function () {
        var isLoaded;

        function setup() {
            if (isLoaded) {
                return;
            }
            isLoaded = true;

            // 아코디언 메뉴
            registUI('.accrodion-container', accordionController, false);

            // SVG 애니메이션
            registUI('.ui-lottie', lottieController, false);
        }

        function registUI(el, fn, saveData) {
            if (saveData === undefined) {
                saveData = true;
            }

            var _inst;

            $(el).each(function (idx, obj) {
                _inst = new fn();
                _inst.init(obj, el);
                if (saveData) {
                    $(el).data('_inst', _inst);
                }
            });
        }

        return {
            setup: setup
        };
    })();

    // 아코디언 메뉴
    var accordionController = function () {
        var el, accrodionBtn;

        function init(_el) {
            el = $(_el);
            accrodionBtn = el.find('.accrodion-btn');

            setEvents();

            return this;
        }

        function setEvents() {
            accrodionBtn.on('click', function (e) {
                e.preventDefault();

                var $this = $(this);

                accordionState($this.parent().index());
            });
        }

        function accordionState(_index) {
            if (accrodionBtn.parent().eq(_index).hasClass('open')) {
                accrodionBtn.parent().eq(_index).removeClass('open');
                accrodionBtn.parent().eq(_index).children('.accrodion-content').show().stop().slideUp(300);

                setScroll(accrodionBtn.parent().eq(_index));
                return false;
            }

            // 토글 컨셉
            if (el.find('.accrodion-list').hasClass('ui-accrodion-toggle')){
                el.find('.accrodion-item').removeClass('open');
                el.find('.accrodion-content').hide();
            }

            accrodionBtn.parent().eq(_index).addClass('open');
            accrodionBtn.parent().eq(_index).children('.accrodion-content').hide().stop().slideDown(300);
            setScroll(accrodionBtn.parent().eq(_index));
        }

        function setScroll(target) {
            $('html, body').animate({ scrollTop: target.offset().top }, 700);
        }


        return { init: init }
    }


    // lottie SVG Animation
    var lottieController = function () {
        var el;

        function init(_el) {
            el = $(_el);

            setLottie();


            return this;
        }

        function setLottie() {
            // 애니메이션 01
            bodymovin.loadAnimation({
                container: document.getElementById('character01'),
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: '../js/character_01_01/01_01.json'
            });
        }


        return { init: init }
    }





}(jQuery);
