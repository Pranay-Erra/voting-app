import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDpIObBUJUHfJem0P59qw3Qu9x0s3RfJSw",
    authDomain: "otp-generation-53766.firebaseapp.com",
    projectId: "otp-generation-53766",
    storageBucket: "otp-generation-53766.appspot.com",
    messagingSenderId: "104769876286",
    appId: "1:104769876286:web:f4819b4a1d5a8f651dbc6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Set the language code
auth.languageCode = 'it';

// Uncomment the line below to use the default device/browser language
// auth.useDeviceLanguage();

if (process.env.NODE_ENV === 'development') {
  try {
    auth.settings.appVerificationDisabledForTesting = true;
  } catch (error) {
    console.error("Error disabling app verification for testing: ", error);
  }
}

export { auth };
