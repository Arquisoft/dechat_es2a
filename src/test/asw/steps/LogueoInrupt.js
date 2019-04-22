const assert = require('assert');
const { Given, When, Then } = require('cucumber');

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

When('Pagina inicial {string}', function (site) {
    return browser.get(site);
});

When('Selecciono Inrupt y Go', function() {
    var selectDropdownbyNum = function ( element, eleccion ) {
    if (eleccion){
      var elijo = element.findElements(by.tagName('username'))   
        .then(function(options){
          elijo[eleccion].click();
        });
    }
  };
    var providerLink = element(by.id('provider'));
    return providerLink.click();
 
	selectDropdownbyNum(element,1);
    var link = element(by.id('Go'));
    return link.click();
});