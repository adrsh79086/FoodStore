
   var firebaseConfig = {
        apiKey: "AIzaSyDmxT32LVO0gJgykLU5D-Xt8noVl6m-O-I",
        authDomain: "prakrati-63d43.firebaseapp.com",
        databaseURL: "https://prakrati-63d43.firebaseio.com",
        projectId: "prakrati-63d43",
        storageBucket: "prakrati-63d43.appspot.com",
        messagingSenderId: "900253623176",
        appId: "1:900253623176:web:08e2d2a5ed9f84f3b8d03d",
        measurementId: "G-NPCN0PZYCS"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
	firebase.analytics();
	
  console.log(firebase);
 
 var database= firebase.database();
 var ref= database.ref('Customer Details');
 
 



const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
var a;

form.addEventListener('submit', e => {
a=0;
	e.preventDefault();
	checkInputs();

});

function checkInputs() {
	// trim to remove the whitespaces
	const usernameValue = username.value.trim();
	const passwordValue = password.value.trim();
	const phoneNoDigits=String(passwordValue);

	if(usernameValue === '') {
		setErrorFor(username, 'Username cannot be blank');
		a++;
	} else {
		setSuccessFor(username);
	}
	
	// if(emailValue === '') {
	// 	setErrorFor(email, 'Email cannot be blank');
	// } else if (!isEmail(emailValue)) {
	// 	setErrorFor(email, 'Not a valid email');
	// } else {
	// 	setSuccessFor(email);
	// }
	
	if(passwordValue === '') {
		setErrorFor(password, 'Phone no. cannot be empty');
		a++;
	} else if(phoneNoDigits.length<10) {
setErrorFor(password, 'Enter the full no.');
a++;
		//setSuccessFor(password);
		//console.log(a.length);
	}else if(phoneNoDigits.length>10){
	setErrorFor(password, 'Number limit exceeded');
	a++;
	}else{
		setSuccessFor(password);
	}

	if(a==0){

var data={
 
  name1:usernameValue,
     phone_no:passwordValue
 }
 ref.push(data);

  alert("Thanks for choosing us");


	}
	else{
		alert("Wrong input");
	}

}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}
	
// function isEmail(email) {
// 	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
// }










