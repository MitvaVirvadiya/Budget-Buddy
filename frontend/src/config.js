const config = {
  basename: '/',
  defaultPath: '/dashboard',
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 12
};


export const headersConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export const authHeadersConfig = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  }
};

export default config;
