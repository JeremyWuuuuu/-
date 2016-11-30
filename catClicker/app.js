(function () {
  var display = document.querySelector('.right');
  var lists = document.querySelectorAll('li');
  //set initial cat when initializing the page
  var cats = [
    { src: './cat.jpg', clicked: 0 },
    { src: './cat2.jpg', clicked: 0 },
    { src: './cat3.jpg', clicked: 0 },
    { src: './cat4.jpg', clicked: 0 },
    { src: './cat5.jpg', clicked: 0 }
  ];
  var currentCat;
  //controls the view of this simple app
  var view = {
    init: function () {
      var html = '<span>' + 'clicked:' + currentCat.clicked + '</span>' + '<br>' + '<img src="' + currentCat.src + ' ">';
      return html;
    }
  };
  //controller 
  var controller = {
    //render function
    render: function () {
      display.innerHTML = view.init();
      display.childNodes[2].addEventListener('click', () => {
        controller.increase();
      }, false);
    },
    //show the cat infos
    show: function (i) {
      model.change(i);
      this.render();
    },
    //cat clicked increaser
    increase: function () {
      currentCat.clicked = parseInt(currentCat.clicked) + 1;
      this.render();
    }
  };
  //model 
  var model = {
    //initialization
    init: function () {
      currentCat = cats[0];
      lists.forEach((v, i) => {
        v.addEventListener('click', (e) => {
          e.stopPropagation();
          controller.show(i);
        }, false);
      }
      );
    },
    //changethe current cat
    change: function (i) {
      currentCat = cats[i];
    }
  };
  model.init();
  controller.render();
})()