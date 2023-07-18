import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export default function SignIn() {
  const [ user, setUser ] = useState([]);
	const [ profile, setProfile ] = useState([]);

	const login = useGoogleLogin({
			onSuccess: (codeResponse) => setUser(codeResponse),
			onError: (error) => console.log('Login Failed:', error)
	});

	useEffect(
    () => {
      if (user) {
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json'
            }
          })
          .then((res) => {
            sendUserToServer(res.data);
          })
          .catch((err) => console.log(err));
      }
    },
    [ user ]
	);

  const sendUserToServer = (token) => {
    axios
      .post('http://127.0.0.1:3000/api/v1/session', {
        headers: {
          GoogleToken: token,
          Accept: 'application/json'
        }
      })
      .then(function(response) {
        console.log(response.data)
      })
      .catch((err) => console.log(err));
  };

	const logOut = () => {
			googleLogout();
			setProfile(null);
	};
  
return (
    <div>
      <h2>React Google Login</h2>
          <br />
          <br />
          {profile ? (
              <div>
                  <img src={profile.picture} alt='user image' />
                  <h3>User Logged in</h3>
                  <p>Name: {profile.name}</p>
                  <p>Email Address: {profile.email}</p>
                  <br />
                  <br />
                  <button onClick={logOut}>Log out</button>
              </div>
          ) : (
              <button onClick={() => login()}>Sign in with Google 🚀 </button>
          )}
    </div>
  );

}