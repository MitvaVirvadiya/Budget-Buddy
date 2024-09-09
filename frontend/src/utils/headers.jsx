
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