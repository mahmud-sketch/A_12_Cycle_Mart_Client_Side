import { useState, useEffect } from 'react'
import initializeAuthentication from '../Firebase/firebase.initialize';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";


initializeAuthentication();
function useFirebase() {
    const [user, setUser] = useState({});
    // const [error, setError] = useState({});
    const [errMessage, setErrMessage] = useState('');
    const [loginErrMsg, setLoginErrMsg] = useState('');
    const [loginSucMsg, setLoginSucMsg] = useState('');
    const [isLoading, setIsLoading] = useState(true);



    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const signInUsingGoogle = () => {
        setIsLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const registerUsingMailandPassword = (name, email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                setUser(result.user);
                console.log(result.user);
                setUserName(name);
                setErrMessage('Congratulations!!! Registraton successful.please click bolew link to go to log in page');
            }).catch((err => {
                setErrMessage(err.message);
            }))
    }

    const processLogin = (email, password, location, history) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(res => {
                console.log(res.user);
                setLoginSucMsg('log in successful!');
                const destination = location.state?.from || '/';
                history.replace(destination);

            })
            .catch((error) => {
                setLoginErrMsg(error.message);

            });
    }


    const setUserName = (name) => {
        updateProfile(auth.currentUser, { displayName: name })
            .then(res => { })

    }

    const logout = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            setUser({});
            setLoginSucMsg('');
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
        setErrMessage,
        registerUsingMailandPassword,
        processLogin,
        loginErrMsg,
        loginSucMsg
    }
}

export default useFirebase
