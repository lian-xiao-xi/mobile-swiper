function MobileSwiper(selector, configure) {
  this.container = document.querySelector(selector);
  this.wraper = this.container.querySelector(configure.wraperSelector);
  this.slides = this.wraper.querySelectorAll(configure.slideSelector);
  var dotsContainer = this.container.getElementsByClassName(configure.paginationWraper)[0];

  this.queue = (function (len) {
    var i, arr = [];
    // console.log(this);
    for (i = 0; i < len; i++) {
      arr[i] = i;
    }
    return arr;
  })(this.slides.length);

  this.virtual = new Array(this.slides.length);

  var x0, y0, hasmoved, lock;
  var right = () => {
    this.queue.unshift(this.queue.pop());
    if (configure.ifPagination) cutDots('right')
    swap('right');
  },
    left = () => {
      this.queue.push(this.queue.shift())
      if (configure.ifPagination) cutDots('left')
      swap('left')
    };
  var touchstartHandle = function (e) {
    var touch = e.targetTouches[0];
    var x = touch.pageX, y = touch.pageY;
    x0 = x; y0 = y;
    hasmoved = false; lock = false;
  };
  var touchmoveHandle = (e) => {
    // lock 的作用：
    // 每次 touchstart 事件之后的连续 touchmove 事件中，
    // 手指在X轴的移动距离超过50后将不再执行 touchmoveHandle 函数
    if (lock) return;
    var touch = e.targetTouches[0];
    var x = touch.pageX, y = touch.pageY;
    var offsetX = x0 - x, offsetY = y0 - y;

    // hasmoved 的作用：
    // 每次 touchstart 事件之后的第一个 touchmove 事件
    // 通过判断 touch 的 offsetX 绝对值与 offsetY 的绝对值大小来决定是否阻止 touchmove 事件的浏览器默认行为，
    // 避免每次 touchmove 事件都需要判断Math.abs(offsetX) > Math.abs(offsetY)来执行 e.preventDefault()
    hasmoved || (hasmoved = !hasmoved, Math.abs(offsetX) > Math.abs(offsetY) && e.preventDefault());
    if (offsetX <= -50) {
      // 图片向右移动
      console.log('right');
      lock = !lock;
      right()
    } else if (offsetX >= 50) {
      // 图片向左移动
      console.log('left')
      lock = !lock;
      left()
    }
  };
  var cutDots = (orientation) => {
    // console.log(dotsContainer)
    var activeDot = dotsContainer.getElementsByClassName(configure.paginationActive)[0];
    // console.log(activeDot)
    activeDot.classList.remove(configure.paginationActive);
    orientation === 'left' &&
      (activeDot.nextElementSibling != null ? (activeDot.nextElementSibling.classList.add(configure.paginationActive)) : (dotsContainer.firstElementChild.classList.add(configure.paginationActive)))
    orientation === 'right' &&
      (activeDot.previousElementSibling != null ? (activeDot.previousElementSibling.classList.add(configure.paginationActive)) : (dotsContainer.lastElementChild.classList.add(configure.paginationActive)))
  };
  var swap = (orientation) => {

    var isArray = Array.isArray || ((obj) => {
      return Object.prototype.toString.call(obj) === '[object Array]';
    });
    // configure.css 必须为数组且长度为奇数
    if (!(isArray(configure.css) && configure.css.length % 2 !== 0)) return;

    let queue = [].concat(this.queue),
      total = this.virtual.length, //items总数
      last = total - 1, // 最后一个索引
      virtual = new Array(total),
      collect = 0, // 提取数
      odd = 1; // 
    console.log(queue);

    while (collect < configure.css.length && queue.length > 0) {
      // console.log(collect,collect === last && odd === 2 && "right" === orientation,odd)
      virtual[odd === 1 ? queue.shift() : queue.pop()] = configure.css[collect === last && odd === 2 && "right" === orientation ? ++collect : collect++];
      odd = odd === 1 ? 2 : 1;
      // console.log(collect)
    }

    /*****-----调试用-------******/
    // console.log(configure.css)
    // for (var i = 0; i < this.virtual.length; i++) {
    //   console.log('virtual' + i + ': ' + virtual[i])
    // }
    /*****-----调试用-------******/

    for (var i = 0; i < total; i++) {
      this.virtual[i] !== virtual[i] &&
        (this.virtual[i] = virtual[i], this.slides[i].style.cssText = this.virtual[i] || configure.defalutStyle)
      // console.log('本次的this.virtual' + i + ': ' + this.virtual[i]);
    }

  };

  var timer; // 用于存放定时器
  this.init = function () {
    this.wraper.style["-webkit-transform-style"] = "preserve-3d";
    for (var i = 0; i < this.slides.length; i++) {
      this.slides[i].style.cssText = configure.defalutStyle;
    }
    swap(configure.direction || 'right');
    configure.automatic === true && (timer = setInterval(left, configure.interval));

    if (this.slides.length > 0) {
      this.container.addEventListener('touchstart', touchstartHandle);
      // this.container.addEventListener('touchend', touchendHandle);
      this.container.addEventListener('touchmove', touchmoveHandle);
    };

    if (configure.ifPagination) { // 需要导航点
      dotsContainer ||
        (dotsContainer = document.createElement('div'), dotsContainer.classList.add(configure.paginationWraper), this.wraper.insertAdjacentElement("afterend", dotsContainer))
      // 轮播导航小圆点添加至应有的数量
      for (var i = 0; i < this.slides.length; i++) {
        dotsContainer.insertAdjacentHTML('afterbegin', `<${configure.paginationLabel} class="${configure.paginationClass}"></${configure.paginationLabel}>`)
      }
      dotsContainer.children[0].classList.add(configure.paginationActive);
    } else { // 不需要导航点
      dotsContainer && dotsContainer.remove();
    }
  };
  this.destory = function () {
    this.container.removeEventListener('touchstart', touchstartHandle);
    this.container.removeEventListener('touchmove', touchmoveHandle);
  }
  this.init();
}