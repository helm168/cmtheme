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
  var a_splice = Array.prototype.splice;
  var a_join = Array.prototype.join;
  var a_indexOf = Array.prototype.indexOf;

  //for ie7~?
  if(!document.head) {
    document.head = document.getElementsByTagName('head')[0];
  }

  //ie7-? doesn't support Array.prototype.indexOf
  if(!Array.prototype.indexOf) {
    Array.prototype.indexOf = a_indexOf = function(target) {
      var idx, ln;
      ln = this.length;
      for(idx = 0; idx < ln; idx++) {
        if(this[idx] === target) {
          return idx;
        }
      }
      return -1;
    }
  }

  //ie6/ie7/ie8 doesn't have getElementsByClassName method
  if(!document.getElementsByClassName) {
    document.getElementsByClassName = function(className) {
      var all = document.getElementsByTagName('*'); 
      var res = [];
      var idx, ln, ele;
      ln = all.length;
      var classList;
      for(idx = 0; idx < ln; idx++) {
        ele = all[idx];
        classList = getClassList(ele);
        if(a_indexOf.call(classList, className) !== -1) {
          res.push(ele); 
        }
      }
      return res;
    }
  }
  
  function getClassList(ele) {
    var classList, className;
    classList = ele.classList;
    if(!classList) {
      className = ele.className || '';
      classList = className.split(/\s+/);
      classList.add = function(target) {
        if(a_indexOf(this, target) === -1)
          this.push(target);
      }
      classList.remove = function(target) {
        var idx;
        if((idx = a_indexOf(this, target)) !== -1) {
          this.splice(idx, 1);
        }
      }
    }
    return classList;
  }

  function addClass(ele, className) {
    getClassList(ele).add(className);
  }

  function removeClass(ele, className) {
    getClassList(ele).remove(className);
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
        removeClass(tabTitles[activeIdx], 'active');
        removeClass(tabContents[activeIdx], 'active');
      }

      addClass(tabTitles[idx], 'active'); 
      addClass(tabContents[idx], 'active'); 

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
