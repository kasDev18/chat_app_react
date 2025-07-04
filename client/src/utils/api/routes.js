const server = import.meta.env.VITE_SERVER_URL;

const login = `${server}/api/auth/login`;
const signup = `${server}/api/auth/signup`;
const logout = `${server}/api/auth/logout`;
const messages = `${server}/api/messages`;
const users = `${server}/api/users`;
const editAvatar = `${server}/api/users/update-avatar`;

export { login, signup, logout, messages, users, editAvatar };