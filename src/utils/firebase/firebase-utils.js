import {initializeApp} from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import {getDoc, setDoc, arrayUnion, arrayRemove, getFirestore, doc, updateDoc} from "firebase/firestore";
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDpKjXxqV7Ndgb8SxkV2uTiibHa6WdmCRE",
    authDomain: "popcorn-react.firebaseapp.com",
    projectId: "popcorn-react",
    storageBucket: "popcorn-react.appspot.com",
    messagingSenderId: "253492709956",
    appId: "1:253492709956:web:c75c00bbadaa8b18480a11"
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

export const createUserDocumentFromAuth = async (auth, additionalInfo, movie = {}) => {
    if (!auth) return;
    console.log(movie)
    const userId = auth.uid
    const docRef = await doc(db, "users", userId);
    const querySnapshot = await getDoc(docRef);
    const {displayName, email, photoURL} = auth;
    const data = {
        displayName,
        email,
        photoURL,
        favoriteMovies: [],
        createdAt: new Date(),
        ...additionalInfo
    };

    if (!querySnapshot.exists()) {
        try {
            await setDoc(docRef, data, {merge: true});
        } catch (error) {
            console.error('Error creating user document:', error);
        }
    }
    const querySnapshotOfFav = await querySnapshot.data().favoriteMovies;
    console.log(querySnapshot.data().favoriteMovies)

    if (Object.keys(movie).length > 0) {
        if (querySnapshotOfFav.length === 0) {
            console.log("array is empty so add movie without any check");
            try {
                await updateDoc(docRef, {
                    favoriteMovies: arrayUnion(movie)
                });
                console.log('Favorite movies updated successfully!');
            } catch (error) {
                console.error('Error updating favorite movies:', error);
            }
        } else {
            const querySnapshotOfFav = await querySnapshot.data().favoriteMovies;
            const querySnapshotOfFavId = querySnapshotOfFav?.map(fav => fav.imdb_id)
            console.log("array is not empty so check it before add movie");
            if (querySnapshotOfFavId.includes(movie.imdb_id)) {
                console.log(`'does movie exist before?'` + querySnapshotOfFavId.includes(movie.imdb_id));
                try {
                    await updateDoc(docRef, {
                        favoriteMovies: arrayRemove(movie)
                    });
                    console.log(querySnapshotOfFavId);
                    console.log('Favorite movies remove successfully!');
                } catch (error) {
                    console.error('Error updating favorite movies:', error);
                }
            } else {
                try {
                    await updateDoc(docRef, {
                        favoriteMovies: arrayUnion(movie)
                    });
                    console.log('Favorite movies updated successfully!');
                } catch (error) {
                    console.error('Error updating favorite movies:', error);
                }
            }
        }
    }
    return docRef;
}

export const getFavoriteMoviesFromAuth = async (auth) => {
    if (!auth) return;
    const docRef = await doc(db, "users", auth.uid);
    const querySnapshot = await getDoc(docRef);
    const querySnapshotOfFav = await querySnapshot.data().favoriteMovies;
    return querySnapshotOfFav;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}


export const signInWithEmail = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback)
}



