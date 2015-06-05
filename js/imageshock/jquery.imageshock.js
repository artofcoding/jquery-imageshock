/**
 * Copyright (C) 2014 art of coding UG, http://www.art-of-coding.eu.
 */
;(function($) {
    
    $.fn.imageshock = function(options) {
        
        var defaultOptions = {
            imageSets: 'imageshock/imagesets',
            fileextension: 'jpg',
            startImage: 'imageshock/index.jpg',
            imageSetRangeBegin: 1,
            imageSetRangeEnd: 13,
            counterSelector: '#imageshock-counter',
            randMaxLoopCount: 1000
        };
        
        var settings = $.extend({}, defaultOptions, options);
    
        /**
         * Generate a random number within bounds (min >= r <= max) and
         * exclude all numbers from an exclude list.
         * @param {number} min Minimum number.
         * @param {number} max Maximum number.
         * @param {number[]} exclude Number should be one of these.
         */
        function rand(min, max, exclude) {
            if (typeof exclude === 'undefined') {
                exclude = [0];
            }
            // Calculate base from 'max' number
            var sMax = '' + max;
            var base = Math.pow(10, sMax.length);
            // Calculate random number
            var r = 0;
            var rWithinBounds = false;
            var rExcluded = false;
            var rOK = false;
            var loopCount = 0;
            do {
                loopCount++;
                r = Math.floor((Math.random() * base) + 1);
                rWithinBounds = r >= min && r <= max;
                rExcluded = $.inArray(r, exclude) > -1;
                rOK = rWithinBounds && !rExcluded;
            } while (loopCount < settings.randMaxLoopCount && !rOK);
            return r;
        }
    
        /**
         * Show a countdown from start to stop.
         * @param {int} start
         * @param {int} stop
         */
        function countdown(start, stop) {
            var i = start - 1;
            if (i >= stop) {
                setTimeout(function() {
                    $(settings.counterSelector).html(i);
                    countdown(i, stop);
                }, 1000);
            }
        }
    
        /**
         * Execute a function after some time.
         * @param {function} f The function to execute.
         * @param {number} minSecs Minimum number of seconds to wait before executing the function.
         * @param {number} maxSecs Maximum number of seconds to wait before executing the function.
         */
        function startRandom(f, minSecs, maxSecs) {
            var secs = rand(minSecs, maxSecs);
            setTimeout(f, secs * 1000);
            countdown(secs, 0);
        }
    
        /**
         * Change background image.
         */
        function setBackgroundImage(val) {
            $('body').css('background-image', val);
        }
    
        /**
         * Preload an image set.
         * @param {object} element A jQuery element.
         * @param {string|number} imageSetQualifier Qualifier for image set; used to construct filename.
         */
        function preloadImageSet(element, imageSetQualifier) {
            for (var i = 1; i < 6; i++) {
                var n = settings.imageSets + '/' + imageSetQualifier + '/' + imageSetQualifier + '_' + i + '.' + settings.fileextension;
                element.find('#img' + i).attr('href', n);
            }
        }
    
        /**
         * Iterate background images shocklingly fast.
         * @param {object} element A jQuery element.
         * @param {number} startIdx Index of image in image set to start with.
         * @param {number} stopIdx Index of image in image set to stop with.
         * @param {timeout} Timeout between changing the background image.
         */
        function backgroundImageShock(element, startIdx, stopIdx, timeout) {
            var image = element.find('#img' + startIdx);
            var imageHref = image.attr('href');
            var name = 'url(' + imageHref + ')';
            setBackgroundImage(name);
            if (startIdx < stopIdx) {
                startIdx++;
                setTimeout(function() { backgroundImageShock(element, startIdx, stopIdx, timeout); }, timeout);
            } else {
                setTimeout(function() { setBackgroundImage(settings.startImage); }, timeout);
            }
        }
    
        /**
         * @param {object} element A jQuery element.
         * @param {number} lastImageSet The last chosen image set.
         */
        function work(element, lastImageSet) {
            var imageSet = rand(settings.imageSetRangeBegin, settings.imageSetRangeEnd, lastImageSet || [0]);
            console.log('work(): imageSet=' + imageSet);
            // Load image set
            preloadImageSet(element, imageSet);
            setTimeout(function() { backgroundImageShock(element, 1, 5, 150); }, 1000);
            // Reschedule
            startRandom(function() { work(element, imageSet); }, 10, 15);
        }
        
        //
        return this.each(function() {
            var element = $(this);
            for (var i = 1; i < 6; i++) {
                element.append('<img id="img' + i + '" style="visible: none;">');
            }
            startRandom(function() { work(element, [0]); }, 10, 15);
        });
        
    }
    
})(jQuery);
