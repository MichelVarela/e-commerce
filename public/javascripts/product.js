new Glider(document.querySelector('.product .glider'), {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: '.product .dots',
    arrows: {
        prev: '.product .glider-prev',
        next: '.product .glider-next'
    },
    responsive: [
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2.5,
                slidesToScroll: 2.5,
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
            }
        }
    ]
});