import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FB_API_KEY,
    authDomain: import.meta.env.VITE_FB_AUTH,
    projectId: import.meta.env.VITE_FB_PRJ_ID,
    storageBucket: import.meta.env.VITE_FB_STORAGE,
    messagingSenderId: import.meta.env.VITE_FB_MESSAGE_ID,
    appId: import.meta.env.VITE_FB_APP_ID
   
  }

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;