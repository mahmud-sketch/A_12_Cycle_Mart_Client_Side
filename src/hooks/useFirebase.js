import { useState, useEffect } from 'react'
import initializeAuthentication from '../Firebase/firebase.initialize';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";

initializeAuthentication();
function useFirebase() {
    const [user, setUser] = useState({});
    // const [error, setError] = useState({});
    const [errMessage, setErrMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const signInUsingGoogle = () => {
        setIsLoading(true);
        return signInWithPopup(auth, googleProvider);
    }


    const setUserName = (name) => {
        updateProfile(auth.currentUser, { displayName: name })
            .then(res => { })

    }

    const logout = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            setUser({});
        }).catch((error) => {
            // An error happened.
        }).finally(() => setIsLoading(false));
    }

    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, user => {
            if (user) {
                // console.log(user);
                setUser(user);
            } else {
                setUser({});
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [])
    return {
        user,
        // error,
        signInUsingGoogle,
        logout,
        setUserName,
        setIsLoading,
        isLoading,
        errMessage,
        setErrMessage
    }
}

export default useFirebase
