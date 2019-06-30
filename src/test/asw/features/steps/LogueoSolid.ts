const assert = require('assert');
const {
  Given,
  When,
  Then,
  And
} = require('cucumber');
import { browser, by, element } from 'protractor';
import { first } from 'rxjs/operators';

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

When('Pagina inicial de logueo {string}', function (string) {
  return browser.get(string);
});


When('Selecciono para iniciar como Solid Community y pincho en {string}', function (string) {
  var providerLink = element(by.className('ng-input'));
  providerLink.click();
  var span = element.all(by.className('ng-option')).get(1);
  span.click();
  var link = element.all(by.className('wide-button')).first();
  return link.click();
});

