class Swiper {
  constructor(props) {
    this.state = {
      idWrapper: props.idWrapper,
      id: props.id,
      itemWidth: props.itemWidth,
      itemNum: props.itemNum,
      displayNum: props.displayNum,
      index: 0,
      islock: false,
      duration: 500,
      translateX: 0,
      len: 0,
    }
    this._$ = selector => document.querySelector(selector);
    this._createElement = type => document.createElement(type);//用于创建DOM
    this._appendChild = (container, node) => container.appendChild(node);//用于增加子节点
    this._clone();
    this._addHTML();
  }
  _clone() {
    let swiperItemWidth = this.state.itemWidth;
    let idContainer = this._$(this.state.id)
    let len = idContainer.children.length;
    this.state.len = len;
    let arr = []
    let index = this.state.index;
    for (let i = 0; i < len; i++) {
      let item = idContainer.children[i].cloneNode(true);
      arr.push(item)
    }
    for (let i = 0; i < len; i++) {
      let item = idContainer.children[i].cloneNode(true);
      arr.push(item)
    }
    idContainer.prepend(...arr)
    this.state.translateX = -(swiperItemWidth * len + swiperItemWidth * index);   //因为在头部克隆了一个，所以默认先偏一个，想看第index个就偏index个
  }
  _addHTML() {
    let idWrapper = this._$(this.state.idWrapper)
    let idContainer = this._$(this.state.id)
    let swiperLeft = this._createElement('img')
    let swiperRight = this._createElement('img')
    let swiperWrapper = this._createElement('div')
    let swiperWidth = this.state.itemWidth * this.state.displayNum
    idContainer.setAttribute('style', `width:${swiperWidth}px;display:flex;flex-wrap:nowrap;height:auto;`)
    swiperLeft.setAttribute("class", 'swiper-left')
    swiperLeft.setAttribute("src", './image/a.png')
    swiperRight.setAttribute("class", 'swiper-right')
    swiperRight.setAttribute("src", './image/a 副本.png')
    swiperWrapper.setAttribute("class", 'swiper-wrapper')
    this._appendChild(swiperWrapper, idContainer)
    this._appendChild(swiperWrapper, swiperLeft)
    this._appendChild(swiperWrapper, swiperRight)
    this._appendChild(idWrapper, swiperWrapper)
    swiperLeft.addEventListener('click', this.swiperPrev.bind(this))
    swiperRight.addEventListener('click', this.swiperNext.bind(this))
    this.goIndex(this.state.index);
  }
  swiperPrev() {
    let index = this.state.index;
    this.goIndex(index - 1);
    this.state.islock = true;
  }
  swiperNext() {
    let index = this.state.index;
    this.goIndex(index + 1);
    this.state.islock = true;
  }
  goIndex(index) {
    if (this.state.islock == true) {
      return
    }
    let swiperDuration = this.state.duration;
    let swiperItemWidth = this.state.itemWidth;
    let beginTranslateX = this.state.translateX;
    let endTranslateX = - (swiperItemWidth * this.state.len + swiperItemWidth * index);
    let idContainer = this._$(this.state.id)
    let swiperWidth = swiperItemWidth * this.state.displayNum
    let that=this
    this.animateTo(beginTranslateX, endTranslateX, swiperDuration, function (value) {
      idContainer.setAttribute('style', `width:${swiperWidth}px;display:flex;flex-wrap:nowrap;transform:translateX(${value}px)`)
    }, function (value) {
      if (index == that.state.len) {
        index = 0
        value = - (swiperItemWidth * that.state.len + swiperItemWidth * 0)
      }
      if (index == -that.state.len) {
        index = 0
        value = - (swiperItemWidth * that.state.len + swiperItemWidth * 0)
      }
      idContainer.setAttribute('style', `width:${swiperWidth}px;display:flex;flex-wrap:nowrap;transform:translateX(${value}px)`)
      that.state.index = index;
      that.state.translateX = value;
      that.state.islock = false;
    })
  }
  animateTo(begin, end, duration, changeCallback, finishCallback) {
    let startTime = Date.now();
    let that = this
    requestAnimationFrame(function update() {
      let dataNow = Date.now();
      let time = dataNow - startTime;
      let value = that.linear(time, begin, end, duration);
      typeof changeCallback === 'function' && changeCallback(value)
      if (startTime + duration > dataNow) {
        requestAnimationFrame(update)
      } else {
        typeof finishCallback === 'function' && finishCallback(end)
      }
    })
  }
  linear(time, begin, end, duration) {
    return (end - begin) * time / duration + begin;
  }
}
