import {initializeApp} from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import {getDoc, setDoc, collection, getFirestore, doc} from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDT99pLbOlfOpuFHyBLhUuTPFhBkenA6No",
    authDomain: "popcorn-time-cf5c3.firebaseapp.com",
    projectId: "popcorn-time-cf5c3",
    storageBucket: "popcorn-time-cf5c3.appspot.com",
    messagingSenderId: "684169023964",
    appId: "1:684169023964:web:6547d34f45a58edbb1ff19"
};


const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
provider.setCustomParameters({
    'prompt': 'select_account'
});
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);
export const db = getFirestore(firebaseApp);
export const createUserDocumentFromAuth = async (auth, additionalInfo = {displayName: ''}) => {
    if (!auth) return;
    const docRef = await doc(db, "users", auth.uid);

    const querySnapshot = await getDoc(docRef);
    if (!querySnapshot.exists()) {
        const {displayName, email, photoURL} = auth;
        const createdAt = new Date();
        try {
            await setDoc(docRef, {
                displayName,
                email,
                photoURL,
                createdAt,
                ...additionalInfo
            })
        } catch (error) {
            console.log('Error writing new user information to Firebase Database', error)
        }
        return docRef;
    }
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}


export const signInWithEmail = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}
