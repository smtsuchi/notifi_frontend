import React, { createContext, useCallback, useState } from 'react';
import { NotificationMethodType, UserType } from '../types/entities/UserType';
import {
    useUpdateNotifyOnDropOnlyMutation,
    useUpdateNotificationMethodMutation,
} from '../slices/userSlice';
import toast from 'react-hot-toast';
import { useApiErrorHandler } from '../hooks/useApiErrorHandler';
import { ErrorType } from '../types/responses/errorResponses';

interface AuthContextType {
    isAuthenticated: boolean;
    user: UserType;
    accessToken: string;
    login: (user: UserType, access_token: string) => void;
    logout: () => void;
    notificationMethod: NotificationMethodType;
    setNotificationMethod: (notificationMethod: NotificationMethodType) => void;
    notifyOnDropOnly: boolean;
    setNotifyOnDropOnly: (notifyOnDropOnly: boolean) => void;
    updateProfile: (user: UserType) => void
}
const initialUser: UserType = {
    id: '',
    username: 'string',
    email: '',
    phone: '',
    date_created: '',
    subscription_count: 0,
    notify_on_drop_only: false,
    notification_method: 'both',
}
const initialValue = {
    isAuthenticated: false,
    user: initialUser,
    accessToken: '',
    login: () => {},
    logout: () => {},
    notificationMethod: 'both' as NotificationMethodType,
    setNotificationMethod: () => {},
    notifyOnDropOnly: false,
    setNotifyOnDropOnly: () => {},
    updateProfile: () => {},
}


export const AuthContext = createContext<AuthContextType>(initialValue);

const AuthContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const getUserFromLS = useCallback(() => {
        const user = localStorage.getItem('user')
        if (user) {
            return JSON.parse(user)
        }
        return initialUser
    },[]);
    const getTokenFromLS = useCallback(() => {
        const token = localStorage.getItem('access_token');
        return token? token.slice(1,-1): ''
    },[]);
    const [user, _setUser] = useState<UserType>(getUserFromLS());
    const [accessToken, setAccessToken] = useState<string>(getTokenFromLS());
    const [updateNotifyOnDropOnly] = useUpdateNotifyOnDropOnlyMutation();
    const [updateNotificationMethod] = useUpdateNotificationMethodMutation();
    const handleError = useApiErrorHandler();

    const login = (user: UserType, accessToken: string)=>{
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('access_token', JSON.stringify(accessToken))
        _setUser(user)
        setAccessToken(accessToken)
    };

    const logout = useCallback(()=>{
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        _setUser(initialUser);
        setAccessToken('')
    }, []);

    const updateProfile = async (updatedUser: UserType) => {
        _setUser(updatedUser)
    };
    
    const setNotificationMethod = async (notification_method: NotificationMethodType) => {
        const oldState = { ...user};
        _setUser((prevUser)=>{
            return {...prevUser, notification_method}
        })
        try{
            const response = await updateNotificationMethod({body:{notification_method}, accessToken}).unwrap()
            if (response.status === 'ok'){
                toast.success(response.message)
                localStorage.setItem('user', JSON.stringify({...user, notification_method}))                
            } else {
                toast.error('Something went wrong.')
            }
        } catch (_e) {
            const e = _e as ErrorType
            handleError(e);
            _setUser(oldState);
          }
    };

    const setNotifyOnDropOnly = async (notify_on_drop_only: boolean) => {
        const oldState = { ...user};
        _setUser((prevUser)=>{
            return {...prevUser, notify_on_drop_only}
        })
        const response = await updateNotifyOnDropOnly({body:{notify_on_drop_only}, accessToken}).unwrap()
        try{
            if (response.status === 'ok'){
                toast.success(response.message)
                localStorage.setItem('user', JSON.stringify({...user, notify_on_drop_only})) 
            } else {
                toast.error("Something went wrong.")
            }
        } catch (_e) {
            const e = _e as ErrorType
            handleError(e);
            _setUser(oldState);
          }
    };

    const values = {
        isAuthenticated: Boolean(user.id),
        user,
        accessToken,
        login,
        logout,
        updateProfile,
        setNotificationMethod,
        notificationMethod: user.notification_method,
        setNotifyOnDropOnly,
        notifyOnDropOnly: user.notify_on_drop_only,
    };
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;