const PAGE = {
  data: {
    navigatorBarIdArr: ['intro-section', 'course-section', 'teacher-section', 'product-section', 'qual-section'],
    navigatorBarActiveId: '',
    navigatorBarFixed: false,
    navigatorBarFixedOffset: 424,
    navigatorBarHeight: 70,
    duration: 500,
    itemWidth: 225,
    translateX: 0,        //每一次记录，必须有
    index: 0,
    islock: false,
    len: 5,
    swiper_1: new Swiper({ idWrapper: '#swiper-wrapper_1', id: '#swiper_1', itemWidth: 225, itemNum: 5, displayNum: 4 }),
    swiper_2: new Swiper({ idWrapper: '#swiper-wrapper_2', id: '#swiper_2', itemWidth: 225, itemNum: 5, displayNum: 4 }),
  },
  init: function () {
    this.bind();
  },
  bind: function () {
    window.addEventListener('scroll', this.refreshNavigator);
    let navigatorBar = document.getElementsByClassName('nav-container')[0];
    this.onEventListener(navigatorBar, 'click', 'nav-item', this.goNavigator);
    let classArrow = document.getElementsByClassName('dragon-class-arrow')
    classArrow[0].addEventListener('click', this.classChangeFirst)
    classArrow[1].addEventListener('click', this.classChangeSecond)
    classArrow[2].addEventListener('click', this.classChangeThird)
    let dragonList = document.getElementsByClassName("dragon-list")[0];
    this.onEventListener(dragonList, 'click', 'dragon-item', this.goVideo);
  },
  goVideo: function () {
    let offsetTop = document.getElementsByClassName('course-video')[0].offsetTop - PAGE.data.navigatorBarHeight;
    document.documentElement.scrollTop = offsetTop;
    document.getElementsByClassName('course-video')[0].play()
  },
  classChangeFirst: function (e) {
    if (e.target.className.indexOf('active') != -1) {
      e.target.className = 'dragon-class-arrow'
      e.target.parentNode.parentNode.nextElementSibling.className = 'dragon-small-list-first'
    } else {
      e.target.className += ' active'
      e.target.parentNode.parentNode.nextElementSibling.className += ' active'
    }
  },
  classChangeSecond: function (e) {
    if (e.target.className.indexOf('active') != -1) {
      e.target.className = 'dragon-class-arrow'
      e.target.parentNode.parentNode.nextElementSibling.className = 'dragon-small-list-second'
    } else {
      e.target.className += ' active'
      e.target.parentNode.parentNode.nextElementSibling.className += ' active'
    }
  },
  classChangeThird: function (e) {
    if (e.target.className.indexOf('active') != -1) {
      e.target.className = 'dragon-class-arrow'
      e.target.parentNode.parentNode.nextElementSibling.className = 'dragon-small-list-third'
    } else {
      e.target.className += ' active'
      e.target.parentNode.parentNode.nextElementSibling.className += ' active'
    }
  },
  onEventListener: function (parentNode, action, childClassName, callback) {
    parentNode.addEventListener(action, function (e) {
      e.target.className.indexOf(childClassName) >= 0 && callback(e);
    })
  },
  goNavigator: function (e) {
    let id = e.target.dataset.nav;
    let offsetTop = document.getElementsByClassName(id)[0].offsetTop - PAGE.data.navigatorBarHeight;
    document.documentElement.scrollTop = offsetTop;
  },
  refreshNavigator: function () {
    PAGE.fixedNavigator();
    PAGE.heightLightNavigator();
  },
  heightLightNavigator: function () {
    let scrollTop = document.documentElement.scrollTop;
    let filterNav = PAGE.data.navigatorBarIdArr.filter(data => {
      let offsetTop = document.getElementsByClassName(data)[0].offsetTop;
      return scrollTop >= offsetTop - PAGE.data.navigatorBarHeight
    })
    let navigatorBarActiveId = filterNav.length ? filterNav[filterNav.length - 1] : '';
    if (PAGE.data.navigatorBarActiveId !== navigatorBarActiveId) {
      PAGE.data.navigatorBarActiveId = navigatorBarActiveId;
      let navigatorBarItems = document.getElementsByClassName('nav-item');
      for (let i = 0; i < navigatorBarItems.length; i++) {
        let navigatorBarItem = navigatorBarItems[i];
        let dataNav = navigatorBarItem.dataset.nav;
        if (dataNav === navigatorBarActiveId) {
          navigatorBarItem.className = 'nav-item active';
        } else {
          navigatorBarItem.className = 'nav-item';
        }
      }
    }
  },
  fixedNavigator: function () {
    let scrollTop = document.documentElement.scrollTop;
    let navigatorBarTop = (PAGE.data.navigatorBarFixedOffset + PAGE.data.navigatorBarHeight);
    let navigatorBarFixed = scrollTop >= navigatorBarTop; //它把true or false状态储存在了data里。
    if (PAGE.data.navigatorBarFixed !== navigatorBarFixed) {
      PAGE.data.navigatorBarFixed = navigatorBarFixed;
      let navigatorBar = document.getElementsByClassName('nav-container')[0];
      if (navigatorBarFixed) {
        navigatorBar.className = 'nav-container fixed-top'
      } else {
        navigatorBar.className = 'nav-container'
      }
    }
  }
}

PAGE.init();

