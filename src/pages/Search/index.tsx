import React, { useState, useEffect } from 'react';
import { TextField, Box, Button, FormHelperText, LinearProgress } from '@mui/material';
import QueueIcon from '@mui/icons-material/Queue';
import CenterBox from '../../components/CenterBox';
import { formatUrl, validateUrl } from '../../helpers';
import { useSubscribeMutation } from '../../slices/subscriptionSlice';
import { useApiErrorHandler } from '../../hooks/useApiErrorHandler';
import { ErrorType } from '../../types/responses/errorResponses';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';

const defaultUrl = `https://www.amazon.com`;

const Settings: React.FC = () => {
    const [selectedUrl, setSelectedUrl] = useState(defaultUrl);
    const [subscribe, { isLoading }] = useSubscribeMutation();
    const handleError = useApiErrorHandler();
    const {accessToken}= useAuth();

    useEffect(() => {
        setSelectedUrl(formatUrl(selectedUrl));
    }, [selectedUrl]);

    const handleClick = async () => {
        const result = validateUrl(selectedUrl);
        if (result.status === 'ok') {
            try {
                const response = await subscribe({body:{ url: selectedUrl }, accessToken}).unwrap();
                if (response.status === 'ok') {
                    toast.success(response.message);
                }
            } catch (_e) {
                const e = _e as ErrorType
                handleError(e);
            }
        }
        else{
            toast.error(result.message)
        }
    };

    return (
        <>
            <CenterBox>
                <Box marginY='8px' display='flex' justifyContent='center'>
                    <QueueIcon />
                </Box>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Product URL"
                    variant="outlined"
                    value={selectedUrl}
                    onChange={(e) => { setSelectedUrl(e.target.value) }}
                />
                <FormHelperText id="url-helper-text">
                    Find a product to track
                </FormHelperText>
                <Button
                    sx={{ marginTop: '8px' }}
                    onClick={handleClick}
                    color="primary"
                    variant="contained"
                >
                    Subscribe
                </Button>
                {isLoading && <LinearProgress />}
            </CenterBox>
        </>
    )
}

export default Settings;