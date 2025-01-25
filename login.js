import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
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
        auth.languageCode = 'en';

        // Email & Password Login
        let button = document.getElementById("login-btn");

        button.addEventListener('click', function (event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Email',
                    text: 'Please enter a valid email address.'
                });
                return;
            }

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    window.location.href = "index.html";
                    Swal.fire({
                        icon: 'success',
                        title: 'You are logged in successfully',
                        text: 'Welcome to the world of rugs in Jordan.'
                    });
                })
                .catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid email or password',
                        text: 'Please enter a valid email address or password.'
                    });
                });
        });

        // // Google Sign-In
        // const googleSignInBtn = document.getElementById('google-signin-btn');
        // const provider = new GoogleAuthProvider();

        // googleSignInBtn.addEventListener('click', async () => {
        //     try {
        //         const result = await signInWithPopup(auth, provider);
        //         const user = result.user;
        //         alert(`Welcome ${user.displayName}`);
        //         window.location.href = "index.html";  // Redirect to home page after sign-in
        //     } catch (error) {
        //         console.error("Error signing in with Google:", error);
        //         alert("Google Sign-In failed: " + error.message);
        //     }
        // });