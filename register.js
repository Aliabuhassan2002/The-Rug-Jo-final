
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
  import {  getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    onAuthStateChanged,
  } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyArHIXn3B9oSWdGSD51DsM773hEnXzBb1g",
    authDomain: "the-rug.firebaseapp.com",
    projectId: "the-rug",
    storageBucket: "the-rug.firebasestorage.app",
    messagingSenderId: "34143881728",
    appId: "1:34143881728:web:a333791771da0d338726e5",
    measurementId: "G-HEZHMFH8NS"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  // const provider = new GoogleAuthProvider();
  // auth.languageCode = "en";
  
  
  // Handle regular email/password signup
  // Handle regular email/password signup
  let button = document.getElementById("reg-frm");
  
  
  button.addEventListener("click", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confPass=document.getElementById("confirmPass").value;
    
  
  
    const nameRegex = /^[A-Za-z\s]{3,30}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    if (!nameRegex.test(name)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Name',
        text: 'Please enter a valid name (3-30 characters).'
      });
      return;
    } else if (!emailRegex.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.'
      });
      return;
    } else if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Password',
        text: 'Password must be at least 8 characters long and include letters, numbers, and at least one special character.'
      });
      return;
    
    } else {
      if(confPass==password){
      Swal.fire({
        title: 'Creating your account...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, { displayName: name })
            .then(() => {
              localStorage.setItem("username", name);
              Swal.fire({
                icon: 'success',
                title: `Welcome, ${name}!`,
                text: 'Your account has been created successfully.',
                confirmButtonText: 'Continue'
              }).then(()=>{
                window.location.href = "index.html";
  
              })
            })
            .catch((error) => {
              console.error("Error updating profile:", error);
            });
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error
          });
        });
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: "The passwords doesn't matches"
        });
      }
    }
  });