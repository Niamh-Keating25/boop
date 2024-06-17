import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createContext } from 'react';
import { LoginPage } from './pages/Login/LoginPage';
import { CreateAccountPage } from './pages/Create-Account/CreateAccountPage';
import { HomePage } from './pages/Home/HomePage';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { CreatePostPage } from './pages/Create-post/CreatePostPage';
import { LoggedInUser } from './api';

 
export type UserAppContext = {
    user: LoggedInUser;
  };
  
  const initialContext: UserAppContext = {
    user: {
      blocked: true,
      confirmed: true,
      createdAt: '',
      email: '',
      id: 1,
      provider: '',
      updatedAt: '',
      username: ''
    },
  };
  
  export const AppContext = createContext<UserAppContext>(initialContext);
  
  type Props = {
    user: LoggedInUser;
  };
  
  const AppRouter: React.FC<Props> = ({ user }) => {
    const context: UserAppContext = {
      user,
    };
  
  
    return (
      <AppContext.Provider value={context}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/create-post" element={<CreatePostPage />} />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    );
  };
  
  export default AppRouter;