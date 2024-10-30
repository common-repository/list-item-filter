/*
 * List Item Filter WordPress Plugin, v1.4
 * By Zach Watkins, http://zachwatkins.info, watkinza@gmail.com
 * License: GPL2+
*/

function Listitemfilter(form){

  this.form = form;
  this.ele = this.form.querySelector('input');
  this.usetitles = (this.form.getAttribute('data-lifp-search-titles') === 'true');
  this.needsPolyfillPlaceholder = (typeof this.ele.placeholder == 'undefined');

  var items = {
    eles: form.parentNode.getElementsByTagName('li'),
    text: []
  };

  var resultsmsg = this.form.getAttribute('data-lifp-no-results-msg'),
      noresults = resultsmsg != '' ? document.createElement('div') : false;

  this.init = function(){

    // Collect the list items
    if(items.eles.length > 0){

      // Pass search text from elements to a stored array
      for(var i = 0; i < items.eles.length; i++){

        var html = items.eles[i].innerHTML,
            main = '',
            title = '',
            all = [];

        // Isolate main element text
        main = html.replace(/<[^<>]+>/g,'');

        // Isolate title attribute text
        if(this.usetitles){

          // Isolate first title in html, replace commas with spaces, remove extra spaces
          title = html.match(/title="([^"]*)"/);
          if(title)
            title = title[1].replace(/\s*,\s*/g,' ').replace(/\s+/,' ');

        }

        // Combine text to be stored
        if(main != '')
          all.push(main);
        if(title != '')
          all.push(title);

        // Store text
        items.text.push(all.join(' '));

      }

      // Add no results message
      if(noresults){
        noresults.className = 'lifp-result-notice lifp-hide';
        noresults.innerHTML = resultsmsg;
        items.eles[0].parentNode.insertBefore(noresults, items.eles[0]);
      }

      // Add search field functionality
      this.ele.addEventListener('keyup', this.handler);

      // Prevent the form from being submitted
      this.form.addEventListener('submit', this.preventSubmit);

      // Polyfill for IE9, input's placeholder attribute
      if(this.needsPolyfillPlaceholder){
        this.polyfillPlaceholder();
      }

    }
  };

  this.handler = function(e){

    var value = e.target.value.toLowerCase(),
        toShow = [],
        toHide = [],
        valuesToCheck = [],
        shownclass = 'lifp-show',
        hiddenclass = 'lifp-hide';

    // Remove the commas and spaces at the ends of the search string
    value = value.replace(/^\s+/, '').replace(/\s+$/, '').replace(/,/g, '');

    if(value != ''){

      // Show only some items
      // If the search box has multiple words, search for them individually in addition to the whole value
      if(value.indexOf(' ') > 0){
        valuesToCheck = value.split(' ');
      }

      // Add the full value to the checked group
      valuesToCheck.push(value);

      // Loop through each stored item
      for(var i = 0; i < items.text.length; i++){

        var itemtext = items.text[i].toLowerCase(),
            found = false;

        // Compare each word in the search string to the item's searchable text
        for(var j = 0; j < valuesToCheck.length; j++){

          if(itemtext.indexOf(valuesToCheck[j]) > -1){

            // Show item
            toShow.push(items.eles[i]);
            found = true;
            break;

          }

        }

        // Hide unmatched stored items
        if(!found) {
          toHide.push(items.eles[i]);
        }

      }

    } else {

      // Show all items
      toShow = items.eles;

    }

    // Show and hide elements
    for(var i = 0; i < toShow.length; i++){

      // Remove hiddenclass and add shownclass
      var className = toShow[i].className;

      if(className.indexOf(shownclass) < 0){
        className = className.replace(hiddenclass,'').replace('  ',' ');
        if(className != ''){
          toShow[i].className = className + ' ' + shownclass;
        } else {
          toShow[i].className = shownclass;
        }
      }

    }

    for(var i = 0; i < toHide.length; i++){

      // Remove shownclass and add hiddenclass
      var className = toHide[i].className;

      if(className.indexOf(hiddenclass) < 0){
        className = className.replace(shownclass,'').replace('  ',' ');
        if(className != ''){
          toHide[i].className = className + ' ' + hiddenclass;
        } else {
          toHide[i].className = hiddenclass;
        }
      }

    }

    // Handle results message
    if(noresults){
      if(toShow.length == 0){
        // Add shownclass
        if(noresults.className.indexOf(shownclass) < 0)
          noresults.className = 'lifp-result-notice ' + shownclass;
      } else {
        // Add hiddenclass
        if(noresults.className.indexOf(hiddenclass) < 0)
          noresults.className = 'lifp-result-notice ' + hiddenclass;
      }
    }

  };

  this.preventSubmit = function(e){

    e.preventDefault();
    return false;

  };

  this.polyfillPlaceholder = function(){

    this.ele.value = this.ele.getAttribute('placeholder');
    this.ele.addEventListener('focus', this.polyfillPHFocus);
    this.ele.addEventListener('blur', this.polyfillPHBlur);

  };

  this.polyfillPHFocus = function(e){

    var placeholder = e.target.getAttribute('placeholder');
    if(e.target.value == placeholder){
      e.target.value = '';
    }

  };

  this.polyfillPHBlur = function(e){

    var placeholder = e.target.getAttribute('placeholder');
    if(e.target.value == ''){
      e.target.value = placeholder;
    }

  };

  this.init();
}

// For each instance of shortcode, create new list filter object
(function(){

  var forms = document.querySelectorAll('form.list-item-filter-plugin');

  for(var i = 0; i < forms.length; i++){
    new Listitemfilter(forms[i]);
  }

})();
