# jquery-imageshock

Changing Images Shockingly Fast with JavaScript

Main goal is to provide a shockingly-fast exchanging of images in the browser with plain JavaScript and just use jQuery to ease some development.

# Setup

Create a directory ``imageshock/imagesets`` containing
1. an index image,
1. subdirectories for the image sets, with each set an unique number assigned and each with the same number of images.

The filenames should contain image set and image number in the order they should be shown, i.e. ``<imageset number>_<image number>.jpg``:

    imageshock/imagesets
        1/1_1.jpg
        1/1_2.jpg
        1/1_3.jpg
        1/1_4.jpg
        2/2_1.jpg
        2/2_2.jpg
        2/2_3.jpg
        2/2_4.jpg

## Usage

You need two ``<div>``s in the page,
1. ``imageshock-counter`` for showing a counter until the next imageshock and
1. ``imageshock-preload`` for preloading images.

    <html>
        <body>
            <div>
                <span id="imageshock-counter" style="font-size: 48px; color: black;"></span>
            </div>
            <div id="imageshock-preload">
            </div>
            <script src="http://code.jquery.com/jquery-1.11.0.min.js" type="text/javascript"></script>
            <script language="JavaScript" type="text/javascript" src="jquery.imageshock.js"></script>
            <script language="JavaScript" type="text/javascript">
                $(document).ready(function() {
                    $('#imageshock-preload').imageshock();
                });
            </script>
        </body>
    </html>

## Configuration

        var defaultOptions = {
            imageSets: 'imageshock/imagesets',
            fileextension: 'jpg',
            startImage: 'imageshock/index.jpg',
            imageSetRangeBegin: 1,
            imageSetRangeEnd: 13,
            counterSelector: '#imageshock-counter',
            randMaxLoopCount: 1000
        };
