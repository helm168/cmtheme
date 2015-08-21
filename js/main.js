(function(){
  if(!window.CodeMirrorTheme) {
    window.CodeMirrorTheme = {};
  }
  
  function addTheme(theme) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/codemirror/theme/' + theme + '.css';
    document.head.appendChild(link);
  }  
    
  var cachedThemes = {};
  CodeMirrorTheme.setTheme = function(theme, editor) {
    if(!cachedThemes[theme]) {
      addTheme(theme);
      cachedThemes[theme] = true;
    }
    editor.setOption('theme', theme);
  };
})();

(function(){
  //ie6/ie7/ie8 doesn't have getElementsByClassName method
  if(!document.getElementsByClassName) {
    document.getElementsByClassName = function(className) {
      var all = document.getElementsByTagName('*'); 
      var res = [];
      var idx, ln, ele;
      ln = all.length;
      for(idx = 0; idx < ln; idx++) {
        ele = all[idx];
        if(Array.prototype.indexOf.call(ele.classList, className) !== -1) {
          res.push(ele); 
        }
      }
      return res;
    }
  }

  var eles = document.getElementsByClassName('js-code-mirror');
  var idx, ln, ele;
  ln = eles.length;
  var id2modeMap = {
    'type-html': 'xml',
    'type-js': 'javascript',
    'type-css': 'css'
  };

  var cmEditors = [];

  for(idx = 0; idx < ln; idx++) {
    ele = eles[idx];
    cmEditors.push(CodeMirror.fromTextArea(ele, {
      readOnly: true,
      mode: id2modeMap[ele.id],
      theme: 'monokai'
    }));
  }

  function isNodeCollection(node) {
    var toStr = Object.prototype.toString.call(node); 
    return toStr === '[object NodeList]' || 
      toStr === '[object HTMLCollection]' ||
      toStr === '[object Array]';
  }

  function bind(doms, eventName, fn, capture) {
    capture = !!capture;
    var idx, ln, dom;
    if(!isNodeCollection(doms)) {
      doms = [doms];
    }

    ln = doms.length;

    for(idx = 0; idx < ln; idx++) {
      dom = doms[idx];
      if(dom.addEventListener) {
        dom.addEventListener(eventName, fn, capture)
      } else {
        dom.attachEvent(eventName, fn);
      }
    }
  }

  var tabTitles = document.getElementsByClassName('tab-title');
  var tabContents = document.getElementsByClassName('tab-content');
  var activeIdx = -1;
  var activeEditor;
  var themeSelect = document.getElementsByClassName('js-theme')[0];

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
      activeEditor = cmEditors[idx];
      CodeMirrorTheme.setTheme(themeSelect[themeSelect.selectedIndex].textContent, activeEditor);
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

  //init
  CodeMirrorTheme.setTheme(themeSelect[0].textContent, activeEditor);
  'onchange' in themeSelect ? 
  bind(themeSelect, 'change', function(evt) {
    console.log('change');
    CodeMirrorTheme.setTheme(themeSelect[themeSelect.selectedIndex].textContent, activeEditor);
  }) :
  bind(themeSelect, 'click', function(evt) {
    console.log('click');
    CodeMirrorTheme.setTheme(themeSelect[themeSelect.selectedIndex].textContent, activeEditor);
  });
})();
