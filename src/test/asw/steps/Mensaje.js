import {Given, Then, When} from 'cucumber';
import {by, element} from 'protractor';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import {AppPage} from '../../pageobjects/App.po';
import {LoginPage} from '../../pageobjects/Login.po';
import {ContactPage} from '../../pageobjects/Contact.po';
import {MessagePage} from '../../pageobjects/Message.po';

const expect = chai.use(chaiAsPromised).expect;




Given('The init app', () => {
  AppPage.navigateTo().then(() => {
    LoginPage.login(' https://pruebaes2a.solid.community/profile/card#me', '!Pruebaes2a');
  });
});

Given('An open conversation', () => {
  AppPage.navigateTo().then(() => {
    LoginPage.login(' https://pruebaes2a.solid.community/profile/card#me', '!Pruebaes2a').then(() => {
      ContactPage.clickContact('Testerino');
    });
  });
});

When('The user select a conversation', () => {
  ContactPage.clickContact('Testerino');
});

When('The user type a message', () => {
  MessagePage.writeMessage('Hola, te mando un mensaje');
});

When('Click on send button', () => {
  MessagePage.clickSend();
});

