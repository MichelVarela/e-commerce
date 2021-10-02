new Glider(document.querySelector('.brands .glider'), {
    slidesToShow: 1.5,
    slidesToScroll: 1,
    arrows: {
        prev: '.brands .glider-prev',
        next: '.brands .glider-next'
    },
    responsive: [
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 2.5,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 3.5,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 990,
            settings: {
                slidesToShow: 4.5,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 5.5,
                slidesToScroll: 3,
            }
        }
    ]
});