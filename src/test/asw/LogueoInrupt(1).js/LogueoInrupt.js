
const assert=require('assert');
const { Given, When, Then }=require('cucumber');

function loginUser(user, psswd){
	if(user==='uo257275' && psswd==='_Ligamento4')
		return "pass";
	else
		return "deny";
}

Given('{string} with password {string}', function(user, psswd){
	this.user=user;
	this.psswd=psswd;
});

When('I try to login him', function(){
	this.response=loginUser(this.user, this.psswd);
});

Then('I should be told {string}', function(expected){
	assert.equal(this.response, expected);
});