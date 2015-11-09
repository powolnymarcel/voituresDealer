(function () {
    "use strict";

    $.as24 = $.as24 || {};
    $.as24.cookieInfoLayer = $.as24.cookieInfoLayer || {};
    $.as24.cookieInfoLayer = (function () {
        var cookieLayerOffset = 0;
        var cookieLayerName = 'as24-cookieinfolayer';
        var getCookieLayerMarkup = function(){
			var translations = $.as24.cookieInfoLayerTranslations;
				 return '<div id="cookieInfoLayer" style="position:fixed;left:0;top:0;z-index:19000;width:100%;background-color:#333;-ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=70);filter: alpha(opacity=70);opacity:0.7;">' +
				  '   <a style="display:block;margin:9px 10px;color:white;font-family: Verdana;font-size:12px;text-decoration:none;" href="' + translations.infoPage + '?intcidm=cookielayerInfo" target="_blank">' +
				  '       <div style="text-align:center;line-height:18px">' + translations.infoPageText + '</div>' +
				  '   </a>' +
				  '   <div class="close" style="position:absolute;top:0px;right:0px;font-family: Verdana;background-color:black;color:white;cursor:pointer;line-height:20px;padding: 0 15px;margin:8px 10px 0 0;font-size:12px">' + translations.closeLinkText + '</div>' +
				  '</div>';
			  };

        var writeInfoLayerCookie = function(value) {
            var dom = location.host.substring(location.host.indexOf('.')),
                date,
                expires;

            date = new Date();
            date.setTime(date.getTime() + (3650 * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toGMTString();

            document.cookie = cookieLayerName +  '=' + value + expires + '; path=/; domain=' + dom;
        };

        var readInfoLayerCookie = function() {
            var cookies = document.cookie.split(';'),
                cookie;
            for(var i=0; i<cookies.length; i++) {
                cookie = cookies[i];
                if (cookie.indexOf(cookieLayerName) !== -1) {
                    return cookie.split('=')[1];
                }
            }
            return "";
        };

        var handleFirstCookieLayerView = function () {
            var cookieValue = readInfoLayerCookie();
            if (cookieValue !== '0' && cookieValue !== '1') {
                if (typeof s !== 'undefined' && typeof s.as24 !== 'undefined' && typeof s.as24.trackClick === 'function') {
                    s.as24.trackClick('cookieLayerShown', { 'list1': 'cookieLayerShown' });
                }
                $(document).trigger('cookieLayerFirstTimeShown');
                writeInfoLayerCookie('0');
            }
        };

        var correctBubblesPosition = function(offset) {
            $(".bubble").has(".bubbleContent").css("margin-top", -offset);

        };

        var setOffsets = function(callbackEvent) {
            var cookieLayerOffset = $('#cookieInfoLayer').height();
            $('body').css({ marginTop: cookieLayerOffset });
            $('#inPageAd').css({ marginTop: -cookieLayerOffset });
            $('#inPageAd_NEU').css({ marginTop: -cookieLayerOffset });
            correctBubblesPosition(cookieLayerOffset);
            $(document).trigger(callbackEvent, [cookieLayerOffset]);
        };

        return {
            show: function () {
                if ($('#cookieInfoLayer').length === 0) {
                    if (readInfoLayerCookie() !== '1') {
                        $('body').prepend(getCookieLayerMarkup()).css({ position: 'relative' });
                        $('#cookieInfoLayer a').css('margin-right', $('#cookieInfoLayer .close').outerWidth() + 20).hover(function() {
                            $(this).css('text-decoration', 'underline');
                        }, function() {
                            $(this).css('text-decoration', 'none');
                        });


			            $(window).resize(function() {
                            if($('#cookieInfoLayer').length === 0)
                                return;
                            setOffsets('cookieLayerResize');
			            });

                        $(function () {
                            correctBubblesPosition($('#cookieInfoLayer').height());
                        });

                        setOffsets('cookieLayerShown');

                        $('#cookieInfoLayer .close').click(function () {
                            if (typeof s_gi === 'function') {
                                s = s_gi($.as24.cookieInfoLayerTranslations.omnitureAccount);
                                if (typeof s !== 'undefined' && typeof s.tl !== 'undefined') {
                                    s.tl(this, 'o', 'cookielayerClose');
                                }
                            }

                            writeInfoLayerCookie('1');

                            if($(document).closeBubbles !== null && typeof $(document).closeBubbles === 'function')
                            {
                            	$(document).closeBubbles();
                            	correctBubblesPosition(0);
                            }

                            $('body').css({ marginTop: '0' });
                            $('#inPageAd').css({ marginTop: '0' });
                            $('#inPageAd_NEU').css({ marginTop: '0' });
                            $('#cookieInfoLayer').remove();

                            $(document).trigger('cookieLayerClosed');

                            return false;
                        });
                        handleFirstCookieLayerView();
                    }
                }
            }
        };
    } ());
})();

$(function () {
   var translations = $.as24.cookieInfoLayerTranslations;
   if(!translations || !translations.infoPage || !translations.infoPageText || !translations.closeLinkText || !translations.omnitureAccount) {
	   return;
   }
    $.as24.cookieInfoLayer.show();
});