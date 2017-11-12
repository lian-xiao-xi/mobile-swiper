# mobile-swiper

移动端左右切换幻灯片组件，组件无任何依赖直接即可以使用，仅适用于移动端

## 用法

调用以下代码
 ```js
 new MobileSwiper('.swiper-container', {
      wraperSelector: '.swiper-wraper', // 组件容器
      slideSelector: '.swiper-slide', // 轮播图片容器
      ifPagination: true, // 是否需要导航点
      automatic: true, // 是否自动轮播
      interval: 5000, // 自动轮播的时间间隔毫秒数
      paginationSelector: '.swpier-pagination', // 导航圆点容器
      paginationLabel: 'p', // 需要js添加导航点时导航点的元素标签
      paginationActive: 'active', // 当前所在轮播图对应的导航圆点css类名
      direction: 'right', // 轮播图数量为奇数时，哪边多放一张图片
      // 金字塔式的样式列表，必须为数组且数组长度必须为奇数
      css: [
        // virtual[queue[0]] 的样式
        "z-index: 3; transform: translate3d(0, 0, 10px) scale3d(1, 1, 1); visibility: visible; transition: transform .3s ease;",
        // virtual[queue[n]] 的样式
        "z-index: 2; transform: translate3d(-33%, 0, 6px) scale3d(.8, .8, 1); visibility: visible; transition: transform .3s ease;",
        // virtual[queue[1]] 的样式
        "z-index: 2; transform: translate3d(33%, 0, 6px) scale3d(.8, .8, 1); visibility: visible; transition: transform .3s ease;",
        // virtual[queue[n-1]] 的样式
        "z-index: 1; transform: translate3d(-66%, 0, 2px) scale3d(.667, .667, 1); visibility: visible; transition: transform .3s ease;",
        // virtual[queue[2]] 的样式
        "z-index: 1; transform: translate3d(66%, 0, 2px) scale3d(.667, .667, 1); visibility: visible; transition: transform .3s ease;"
      ]
    })
 ```

要求 `.swiper-container` 是以下结构：  

```html
<div class="swiper-container">
    <ul class="swiper-wraper">
      <li class="swiper-slide">
        <div class="slide-content">1</div>
      </li>
      <li class="swiper-slide">
        <div class="slide-content">2</div>
      </li>
      <li class="swiper-slide">
        <div class="slide-content">3</div>
      </li>
      <li class="swiper-slide">
        <div class="slide-content">4</div>
      </li>
      <li class="swiper-slide">
        <div class="slide-content">5</div>
      </li>
      <li class="swiper-slide">
        <div class="slide-content">6</div>
      </li>
      <li class="swiper-slide">
        <div class="slide-content">7</div>
      </li>
    </ul>
    <!-- 如果需要分页器 -->
    <ul class="swpier-pagination"></ul>
  </div>
```

**具体可以查看：**
[DEMO](链接)
