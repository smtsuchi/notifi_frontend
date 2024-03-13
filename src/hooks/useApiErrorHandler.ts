import { useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { ErrorType } from "../types/responses/errorResponses";
import toast from "react-hot-toast";

export const useApiErrorHandler = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const handleError = useCallback((err: ErrorType) => {
        if (err.status === 401){
            logout()
            toast.error('Your session has expired. Please log in again.')
            navigate('/login')
        }
        else {
            if(err.data?.message){
                toast.error(err.data.message);
            }
        }
    }, [logout]);
    return handleError;
};