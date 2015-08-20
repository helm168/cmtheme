(function(){
  var eles = document.querySelectorAll('.js-code-mirror');
  var idx, ln, ele;
  ln = eles.length;
  for(idx = 0; idx < ln; idx++) {
    ele = eles[idx];
    CodeMirror.fromTextArea(ele, {
      htmlMode: true,
      mode: 'text/html',
      theme: 'xq-dark'
    });
  }
})();
