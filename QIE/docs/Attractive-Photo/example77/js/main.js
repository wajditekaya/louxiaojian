jQuery(window).load(function() {
    $.get('feed.php', function(data){
        $('.smart_gallery').append(data);

        $('.smart_gallery').gallery({
            random: true,
            circular: true,
            masked: true,
            animation: "blind",
            noofthumbnails: 6,
            thumbnailscrollspeed: 2000,
            animationspeed: 1000,
            stickthumbnails: true,
            imagedisplaytime: 3000
        });
    });
});