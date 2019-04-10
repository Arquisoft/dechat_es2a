let {defineSupportCode} = require('cucumber');
 
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

defineSupportCode( function({When, Then}) {
 When('Pagina inicial de la app {string}', function(site) {
   return browser.get(site);
 });

 Then('El titulo deberia de ser {string}', function(title) {
   return expect(browser.getTitle()).to.eventually.eql(title);
 });

 When('Hago click en el boton de registro', function() {
      var registerLink = element(by.id('register'));

   return registerLink.click();
 });

 Then('Deberia de ver {string} titulo', function(string) {
      var elemento = element(by.id('solidProvider'));


   return expect(elemento.getText()).to.eventually.eql(string);
 });
});