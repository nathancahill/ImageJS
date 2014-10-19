ImageJS
=======

Simple (and library agnostic) library for loading images in Javascript. Preloading images is as simple as:

```javascript
ImageJS.load('http://i.imgur.com/5AEdh4K.png');
```

### Callbacks ###

Several callbacks are available as the image is loading:

```javascript
ImageJS.load({
    start: function(url, width, height) {},
    progress: function(url, width, height) {},
    dimensions: function(url, width, height) {},
    done: function(url, width, height) {}
});
```

 - start: Called when the image starts loading.
 - progress: Called repeatedly as the image loads. Percentage of progress is not available in Javascript.
 - dimensions: Called as soon as the image dimensions are available (if the image is cached, this is called immediately).
 - done: Called when the image is fully loaded.

### Examples ###

Load an image, and display it when it finishes loading. Assumes the target element ```<img id="image" />``` is in the HTML:

```javascript
ImageJS.load({
    url: 'http://i.imgur.com/5AEdh4K.png',
    done: function(url, width, height) {
        document.getElementById('image').src = url;
    }
});
```

Full example with spinner placeholder. 

```javascript
ImageJS.load({
    url: 'http://i.imgur.com/5AEdh4K.png',
    start: function() {
        $('#image')
            .css('background-image', 'url("http://www.ajaxload.info/cache/FF/FF/FF/00/00/00/5-0.gif")')
            .css('background-position', 'center')
            .css('background-repeat', 'no-repeat');
    },
    dimensions: function(url, width, height) {
        document.getElementById('image').width = width;
        document.getElementById('image').height = height;
    },
    done: function(url) {
        $('#image')
            .css('background-image', 'none');

        document.getElementById('image').src = url;
    }
});
```
