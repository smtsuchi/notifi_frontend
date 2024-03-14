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
    login: (user: UserType) => void;
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
    const [user, _setUser] = useState<UserType>(getUserFromLS());
    const [updateNotifyOnDropOnly] = useUpdateNotifyOnDropOnlyMutation();
    const [updateNotificationMethod] = useUpdateNotificationMethodMutation();
    const handleError = useApiErrorHandler();

    const login = (user: UserType)=>{
        localStorage.setItem('user', JSON.stringify(user))
        _setUser(user)
    };

    const logout = useCallback(()=>{
        localStorage.removeItem('user')
        _setUser(initialUser);
    }, []);

    const updateProfile = async (updatedUser: UserType) => {
        console.log(updatedUser, "UP");
        _setUser(updatedUser)
    };
    
    const setNotificationMethod = async (notification_method: NotificationMethodType) => {
        const oldState = { ...user};
        _setUser((prevUser)=>{
            return {...prevUser, notification_method}
        })
        try{
            const response = await updateNotificationMethod({notification_method}).unwrap()
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
        const response = await updateNotifyOnDropOnly({notify_on_drop_only}).unwrap()
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