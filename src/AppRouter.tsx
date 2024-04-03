import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createContext } from 'react';
import { LoginPage } from './pages/Login/LoginPage';
import { CreateAccountPage } from './pages/Create-Account/CreateAccountPage';
import { HomePage } from './pages/Home/HomePage';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { CreatePostPage } from './pages/Create-post/CreatePostPage';

 
export type UserAppContext = {
    user: User;
  };

  export type User = {
    username: string;
    password: string;

  }
  
  const initialContext: UserAppContext = {
    user: {
      username: '',
      password: ''
    },
  };
  
  export const AppContext = createContext<UserAppContext>(initialContext);
  
  type Props = {
    user: User;
  };
  
  const AppRouter: React.FC<Props> = ({ user }) => {
    const context: UserAppContext = {
      user,
    };
  
  
    return (
      <AppContext.Provider value={context}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/create-account" element={<CreateAccountPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/create-post" element={<CreatePostPage />} />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    );
  };
  
  export default AppRouter;