import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function ProfileCookie() {
  const [cookieValue, setCookieValue] = useState(null);

  useEffect(() => {
    const value = Cookies.get('profile');

    if (value) {
      setCookieValue(JSON.parse(value));
    }
  }, []);

  return cookieValue;
}
