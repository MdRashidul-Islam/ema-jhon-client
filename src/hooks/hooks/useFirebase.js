import {
  createUserWithEmailAndPassword,
  getAuth,
  getIdToken,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { initAuth } from "../Firebase/firebase.init";

initAuth();
const useFirebase = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  // const [admin, setAdmin] = useState(false);
  // const [token, setToken] = useState("");
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  //----------------register user start------------------//
  const registerUser = (name, email, password, navigate) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Sign-up Successfully",
          showConfirmButton: false,
          timer: 1300,
        });

        const newUser = { email, displayName: name };
        setUser(newUser);

        // saveUser(email, name, "POST");

        updateProfile(auth.currentUser, {
          displayName: name,
        }).catch((error) => {
          const errorMessage = error.message;
        });

        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: `${error.message}`,
          showConfirmButton: true,
          timer: 1300,
        });
      })
      .finally(() => setIsLoading(false));
  };
  //---------register User end-----------------//

  //-------------login with email password start--------------//
  const signWithEmail = (email, password, location, navigate) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const user = res.user;
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1300,
        });
        setUser(user);
        const destination = location?.state?.from || "/";
        navigate(destination);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: `${error.message}`,
          showConfirmButton: true,
          timer: 1300,
        });
      })
      .finally(() => setIsLoading(false));
  };
  //-------------login with email password end--------------//

  //------------------sign in with google start---------------------//
  const googleSignIn = (location, navigate) => {
    setIsLoading(true);
    signInWithPopup(auth, provider).then((res) => {
      const user = res.user;
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Google Login successfully",
        showConfirmButton: false,
        timer: 800,
      });
      // saveUser(user.email, user.displayName, "PUT");
      const destination = location?.state?.from || "/";
      navigate(destination);
    });
  };
  //------------------sign in with google end---------------------//

  //-----------------sign out start------------------//
  const logOut = () => {
    signOut(auth)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: `Logout Successfully`,
          showConfirmButton: false,
          timer: 1300,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: `${error.message}`,
          showConfirmButton: false,
          timer: 800,
        });
      })
      .finally(() => setIsLoading(false));
  };
  //-----------------sign out end------------------//

  //---------------Auth state start---------------//
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // getIdToken(user).then((idToken) => {
        //   setToken(idToken);
        // });
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unSubscribe;
  }, [auth]);
  //---------------Auth state start---------------//

  // useEffect(() => {
  //   fetch(`https://morning-garden-34433.herokuapp.com/users/${user.email}`)
  //     .then((res) => res.json())
  //     .then((data) => setAdmin(data.admin));
  // }, [user.email]);

  // save user state
  // const saveUser = (email, displayName, method) => {
  //   const user = { email, displayName };
  //   fetch("https://morning-garden-34433.herokuapp.com/users", {
  //     method: method,
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(user),
  //   }).then();
  // };

  return {
    isLoading,
    user,

    registerUser,
    logOut,
    signWithEmail,
    googleSignIn,
  };
};
export default useFirebase;
