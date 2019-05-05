<template>
  <swiper :options="swiperOption">
    <swiper-slide><img src="slide1.png"/></swiper-slide>
    <swiper-slide><img src="slide2.png"/></swiper-slide>
    <swiper-slide><img src="slide3.png"/></swiper-slide>
    <swiper-slide><img src="slide4.png"/></swiper-slide>
    <swiper-slide><img src="slide5.png"/></swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
  export default {
    data() {
      return {
        swiperOption: {
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      }
    }
  }
</script>