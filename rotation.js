window.onload = function () {
  let imgBox = document.querySelector('.img-container'),
    ctrlBar = document.querySelector('.controller'),
    bars = document.querySelectorAll('.controller span'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next'),
    wrapper = document.querySelector('.wrapper'),
    delayTime = 3000,
    timer = null,
    index = 1,
    rotated = false;
  //轮播函数
  //控制条函数
  const btnCtrl = () => {
    for (let i = 0, len = bars.length; i < len; i++) {
      if (bars[i].className.length > 11) {
        bars[i].className = 'control-bar';
        break;
      }
    }
    bars[index - 1].className = bars[index - 1].className + ' active'
  }
  //图片切换函数
  const rotate = (offset = -512) => {
    rotated = true;
    const px = offset,
      speed = px / 30,
      nextLeft = parseInt(imgBox.style.left) + offset;
    //动画函数
    const run = () => {
      if ((speed < 0 && parseInt(imgBox.style.left) > nextLeft) || (speed > 0 && parseInt(imgBox.style.left) < nextLeft)) {
        imgBox.style.left = parseInt(imgBox.style.left) + speed + 'px';
        setTimeout(run, 20);
      } else {
        rotated = false;
        imgBox.style.left = nextLeft + 'px';
        if (nextLeft < -2048) {
          imgBox.style.left = -512 + 'px';
        }
        if (nextLeft > -512) {
          imgBox.style.left = -2048 + 'px';
        }
      }
    }
    run();
  }

  //箭头绑定click事件
  next.addEventListener('click', function () {
    if (!rotated) {
      if (index + 1 <= 4) {
        index++;
      } else {
        index = 1;
      }
      rotate(-512);
      btnCtrl();
    }
  }, false)
  prev.addEventListener('click', function () {
    if (!rotated) {
      if (index - 1 > 0) {
        index--;
      } else {
        index = 4;
      }
      rotate(512);
      btnCtrl();
    }

  }, false)
  //鼠标事件滑入
  const play = () => {
    timer = setInterval(function () {
      if (!rotated) {
        if (index + 1 > 4) {
          index = 1;
        } else {
          index++;
        }
        rotate();
        btnCtrl();
      }
    }, delayTime);
  }
  const stop = () => {
    clearInterval(timer);
  }
  play();
  wrapper.addEventListener('mouseover', function () {
    stop();
  }, false);
  wrapper.addEventListener('mouseout', function () {

    play();
  }, true);
  //控制条点击事件
  for (let i = 0, len = bars.length; i < len; i++) {
    bars[i].addEventListener('click', function (e) {
      e.stopPropagation();
      let rel = parseInt(e.target.getAttribute('rel'));
      let offset = -512 * (rel - index);
      rotate(offset);
      index = rel;
      btnCtrl();
    }, false)
  }
}

