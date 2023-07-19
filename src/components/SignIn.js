import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function SignIn() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => checkGoogleToken(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  const checkGoogleToken = (googleResponse) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo`, {
        headers: {
          Authorization: `Bearer ${googleResponse.access_token}`,
          Accept: 'application/json'
        }
      })
      .then((res) => {
        sendUserToServer(res.data);
      })
      .catch((err) => console.log(err));
  };

  const sendUserToServer = (user) => {
    axios
      .post('https://leaf-ledger-be.herokuapp.com/api/v1/users', {
        data: user
      })
      .then(function (response) {
        const profileData = response.data.data;
        Cookies.set('profile', JSON.stringify(profileData));
        setProfile(profileData);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const profileCookie = Cookies.get('profile');
    if (profileCookie) {
      const profileData = JSON.parse(profileCookie);
      setProfile(profileData);
    }
    setLoading(false);
  }, []);

  const logOut = () => {
    googleLogout();
    setProfile(null);
    Cookies.remove('profile');
  };

  return (
    <div>
      {profile ? (
        <div>
          <img src={profile.attributes.picture} alt='user image' />
          <p>Name: {profile.attributes.name}</p>
          <p>Email Address: {profile.attributes.email}</p>
          <br />
          {console.log(profile.attributes)}
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        !loading && (
          <button onClick={() => login()}>Sign in with Google 🚀 </button>
        )
      )}
    </div>
  );
}
