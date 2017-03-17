/**
 * Created by Jeremy on 17/03/2017.
 */
(function (global) {

    /*
     * 轮播图函数
     * @param {Object} options - 需要用到的基础变量。
     * @param {HTMLElement} options.container - 图片的装载器。
     * @param {HTMLElement} options.controlBars - 底部控制bar
     * @param {HTMLElement} options.leftArrow - 左侧箭头
     * @param {HTMLElement} options.rightArrow - 右侧箭头
     * @param {HTMLElement} options.wrapper - 最外层的包装体
     * @param {number} options.delayTime - 轮播延时
     * @param {number} options.imageLen - 轮播图片长度
     * @param {number} options.imageNum - 轮播图片数量
     * @param {number} options.speedRate - 动画速率
     * @param {string} options.originClass - 底部bar的原始类名
     * @param {string} options.activeClass - 底部bar的激活类名
     * @return {void}
     * 使用方法 slider(options);
     * */
    var slider = function (options) {
        var container = options.container,
            bars = options.controlBars,
            prev = options.leftArrow,
            next = options.rightArrow,
            wrapper = options.wrapper,
            delayTime = options.delayTime,
            len = options.imageLen,
            num = options.imageNum,
            unit = options.unit,
            speedRate = options.speedRate,
            originClass = options.originClass,
            timer = null,
            index = 1,
            activeClass = options.activeClass,
            rotated = false,
            run = function (container, speed, nextLeft) {

                if ((speed < 0 && parseInt(container.style.left) > nextLeft) || (speed > 0 && parseInt(container.style.left) < nextLeft)) {
                    container.style.left = parseInt(container.style.left) + speed + unit;
                    setTimeout(run, 20, container, speed, nextLeft);
                } else {
                    rotated = false;
                    container.style.left = nextLeft + unit;
                    if (nextLeft < -(num * len)) {
                        container.style.left = -(len) + unit;
                    }
                    if (nextLeft > -(len)) {
                        container.style.left = -(num * len) + unit;
                    }
                }
            },
            barMove = function () {
                document.querySelector('.' + activeClass).className = originClass;
                bars[index - 1].className = originClass + ' ' + activeClass;
            },
            rotate = function (offset) {
                offset = offset || -len;
                rotated = true;
                var speed = offset / speedRate;
                var nextLeft = parseInt(container.style.left) + offset;
                run(container, speed, nextLeft);
            };
        next.addEventListener('click', function () {
            if (!rotated) {
                if (index < num) {
                    index++;
                } else {
                    index = 1;
                }
                rotate(-len);
                barMove();
            }
        }, false);
        prev.addEventListener('click', function () {
            if (!rotated) {
                if (index > 1) {
                    index--;
                } else {
                    index = num;
                }
                rotate(len);
                barMove();
            }
        }, false);
        var player = function (delayTime) {
                timer = setInterval(function () {
                    if (!rotated) {
                        if (index >= num) {
                            index = 1;
                        } else {
                            index++;
                        }
                        rotate(-len);
                        barMove();
                    }
                }, delayTime);
            },
            stopPlayer = function () {
                clearInterval(timer);
            };
        player(delayTime);
        wrapper.addEventListener('mouseover', function () {
            stopPlayer();
        });
        wrapper.addEventListener('mouseout', function () {
            player(delayTime);
        });

        for (var i = 0; i < bars.length; i++) {
            bars[i].addEventListener('click', function (e) {
                e.stopPropagation();
                var rel = parseInt(e.target.getAttribute('data-rel')),
                    offset = -len * (rel - index);
                rotate(offset);
                index = rel;
                barMove();
            })
        }
    };

    global.slider = slider;
    this.module && (this.module.exports = slider);
})(this);