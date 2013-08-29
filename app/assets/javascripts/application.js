// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

function autocheck(e){
	var letters = /^[0-9a-zA-Z_-]*$/;
	var form = document.getElementById("form");
	var elems = form.getElementsByTagName("input");
	for (var i = 0; i < elems.length; i++) {
		if(elems[i].type == "text"){
			if(elems[i].id == e) {
				if(letters.test(elems[i].value)){
					elems[i].className = 'textfield';
					var msg = document.getElementById("err_" + elems[i].id);
					msg.innerHTML = '';
				} else {
					elems[i].className = 'textfield_error';
					var msg = document.getElementById("err_" + elems[i].id);
					msg.innerHTML = " may only contain numbers, letters, underscore and dash";
				}
				break;
			}
			if(elems[i].value == ''){
				elems[i].className = 'textfield_error';
				var msg = document.getElementById("err_" + elems[i].id);
				msg.innerHTML = " cannot be blank";
			}
		} else if(elems[i].id == "user_password" || elems[i].id == "pwd"){
			if(elems[i].value.length < 6 || elems[i].value.length > 18){
				elems[i].className = 'textfield_error';
				var msg = document.getElementById("err_" + elems[i].id);
				msg.innerHTML = " the length should between 6 and 18";
			} else {
				elems[i].className = 'textfield';
				var msg = document.getElementById("err_" + elems[i].id);
				msg.innerHTML = '';
			}
			if(elems[i].id == e) {
				if(elems[i].value == '') {
					elems[i].className = 'textfield';
					var msg = document.getElementById("err_" + elems[i].id);
					msg.innerHTML = '';
				}
				break;
			}
		} else if (elems[i].id == "user_password_cnf"){
			if(elems[i-1].value != elems[i].value){
				elems[i].className = 'textfield_error';
				var msg = document.getElementById("err_" + elems[i].id);
				msg.innerHTML = " passwords should match well";
			} else {
				elems[i].className = 'textfield';
				var msg = document.getElementById("err_" + elems[i].id);
				msg.innerHTML = '';
			}
			if(elems[i].id == e) {
				if(elems[i].value == '') {
					elems[i].className = 'textfield';
					var msg = document.getElementById("err_" + elems[i].id);
					msg.innerHTML = '';
				}
				break;
			}
		}
	}
}

function submit_check(){
	var letters = /^[0-9a-zA-Z_-]*$/;
	var field = document.getElementById('alert');
	if(document.getElementById('user_first_name').value == '') { 
		field.innerHTML = 'You should fill all the blanks correctly'; return false; 
	}
	if(!letters.test(document.getElementById('user_first_name').value)) { 
		field.innerHTML = 'You should fill all the blanks correctly'; return false; 
	}
	if(document.getElementById('user_last_name').value == '') { 
		field.innerHTML = 'You should fill all the blanks correctly'; return false; 
	}
	if(!letters.test(document.getElementById('user_last_name').value)) { 
		field.innerHTML = 'You should fill all the blanks correctly'; return false; 
	}
	if(document.getElementById('user_login_name').value == '') { 
		field.innerHTML = 'You should fill all the blanks correctly'; return false; 
	}
	if(!letters.test(document.getElementById('user_login_name').value)) { 
		field.innerHTML = 'You should fill all the blanks correctly'; return false; 
	}
	var pwd0 = document.getElementById('user_password').value;
	var pwd1 = document.getElementById('user_password_cnf').value;
	if(pwd0.length > 18 || pwd0.length < 6) { 
		field.innerHTML = 'You should fill all the blanks correctly'; return false; 
	}
	if(pwd0 != pwd1) { 
		field.innerHTML = 'You should fill all the blanks correctly'; return false; 
	}
	return true;
}

function login_check(){
	var letters = /^[0-9a-zA-Z_-]*$/;
	var field = document.getElementById('alert');
	if(document.getElementById('login_name').value == '') { 
		field.innerHTML = 'You should fill all the blanks correctly'; return false; 
	}
	if(!letters.test(document.getElementById('login_name').value)) { 
		field.innerHTML = 'You should fill all the blanks correctly'; return false; 
	}
	var pwd = document.getElementById('pwd').value;
	if(pwd.length > 18 || pwd.length < 6) { 
		field.innerHTML = 'You should fill all the blanks correctly'; return false; 
	}
	return true;
}
