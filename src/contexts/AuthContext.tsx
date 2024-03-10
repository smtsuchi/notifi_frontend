import React, { createContext, useState } from 'react';
import { UserType } from '../types/entities/UserType';

interface AuthContextType {
    isAuthenticated: boolean;
    user: UserType;
    login: (user: UserType) => void;
    logout: () => void;
}
const initialUser = {
    id: '',
    username: 'string',
    email: '',
    phone: '',
    date_created: '',
    subscription_count: 0,
    notify_on_drop_only: false,
}
const initialValue = {
    isAuthenticated: false,
    user: initialUser,
    login: () => {},
    logout: () => {}
}


export const AuthContext = createContext<AuthContextType>(initialValue);

const AuthContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const getUserFromLS = () => {
        const user = localStorage.getItem('user')
        if (user) {
            return JSON.parse(user)
        }
        return initialUser
    }
    const [user, _setUser] = useState<UserType>(getUserFromLS() ?? {})
    const login = (user: UserType)=>{
        localStorage.setItem('user', JSON.stringify(user))
        _setUser(user)
    }
    const logout = ()=>{
        localStorage.removeItem('user')
        _setUser(initialUser)
    }
    const values = {
        isAuthenticated: Boolean(user.id),
        user,
        login,
        logout
    }
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;