const isUserRoleAdmin = (): boolean => {
  const storage = JSON.parse(sessionStorage.getItem('nefal-access') || '{}');

  if (!storage.role) {
    return false;
  }

  const userRole = storage.role;

  return userRole === 'ADMIN' || userRole === 'SELLER';
};

export default isUserRoleAdmin;
