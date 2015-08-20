(function(){
  var eles = document.querySelectorAll('.js-code-mirror');
  var idx, ln, ele;
  ln = eles.length;
  console.log('ln', ln);
  for(idx = 0; idx < ln; idx++) {
    ele = eles[idx];
    CodeMirror.fromTextArea(ele, {
      theme: 'xq-dark'
    });
  }


  function bind(doms, eventName, fn, capture) {
    capture = !!capture;
    var idx, ln, dom;
    ln = doms.length;
    if(!ln) {
      doms = [doms];
      ln = 1;
    }

    for(idx = 0; idx < ln; idx++) {
      dom = doms[idx];
      dom.addEventListener(eventName, fn, capture)
    }
  }

  var tabTitles = document.querySelectorAll('.tab-title');
  var tabContents = document.querySelectorAll('.tab-content');
  var activeIdx = -1;

  function setActive(idx) {
    if(activeIdx !== idx) {
      //-1 indicate not init
      if(activeIdx != -1) {
        tabTitles[activeIdx].classList.remove('active');
        tabContents[activeIdx].classList.remove('active');
      }

      tabTitles[idx].classList.add('active');
      tabContents[idx].classList.add('active');

      activeIdx = idx;
    }  
  }

  //init;
  setActive(0);
    
  bind(tabTitles, 'click', function(evt) {
    var tabTitle, tabIdx, tabContent;
    tabTitle = evt.target; 
    tabIdx = tabTitle.dataset.tabIdx;
    setActive(tabIdx);
  });

})();
