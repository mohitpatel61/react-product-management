const userInfo = async () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : {};
  };
  export { userInfo };
  