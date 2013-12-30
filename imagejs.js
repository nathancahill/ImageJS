window.ImageJS = {
    load: function(options) {
        var url, start, done, progress, dimensions, interval, img, called_dimensions;

        if (options instanceof Object) {
            url = options.url;
            start = options.start;
            done = options.done;
            progress = options.progress;
            dimensions = options.dimensions;
            interval = options.interval;
        } else if (typeof options == "string") {
            url = options;
        }

        if (typeof start != 'function') {
            start = function() {};
        }

        if (typeof done != 'function') {
            done = function() {};
        }

        if (typeof progress != 'function') {
            progress = function() {};
        }

        if (typeof dimensions != 'function') {
            dimensions = function() {};
        }

        if (typeof interval != 'number' || interval < 1) {
            interval = 100;
        }

        img = new Image();
        img.src = url;

        start(url, img.width, img.height);

        called_dimensions = false;

        if (img.width !== 0 && img.height !== 0) {
            dimensions(url, img.width, img.height);
            called_dimensions = true;
        }

        var i = setInterval(function() {
            if (img.complete) {
                clearInterval(i);
                done(url, img.width, img.height);
            } else {
                if (img.width !== 0 && img.height !== 0 && !called_dimensions) {
                    dimensions(url, img.width, img.height);
                    called_dimensions = true;
                }
                progress(url, img.width, img.height);
            }
        }, interval);
    }
};
