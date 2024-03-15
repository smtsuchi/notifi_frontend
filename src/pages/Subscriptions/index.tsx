import React, { useEffect } from 'react';
import { useGetSubscriptionsQuery } from '../../slices/subscriptionSlice';
import Subscription from './Subscription';
import { SubscriptionType } from '../../types/entities/SubscriptionType';
import { useApiErrorHandler } from '../../hooks/useApiErrorHandler';
import { Box, Container, CircularProgress } from '@mui/material';
import { ErrorType } from '../../types/responses/errorResponses';
import { useAuth } from '../../hooks/useAuth';
import NoRowsOverlay from '../Dashboard/NoRowsOverlay';


const Subscriptions: React.FC = () => {
    const {accessToken} = useAuth();
    console.log(accessToken, !!accessToken)
    const { currentData, error, isError, isFetching } = useGetSubscriptionsQuery(accessToken, {skip: !accessToken});
    const handleError = useApiErrorHandler();

    useEffect(() => {
        const e = error as ErrorType
        isError && handleError(e)
    }, [isError, error, handleError])

    return (
        <Box
            display='flex'
            flexDirection='column'
        >
            {isFetching && <CircularProgress sx={{ marginX: 'auto' }}/>}
            <Container
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '16px',
                    maxWidth: '1088px',
                }}
            >
                {currentData
                    ? currentData.data.map((subscription: SubscriptionType) => (
                        <Subscription
                            key={subscription.product_id}
                            subscription={subscription}
                        />
                    ))
                    : !isFetching && <NoRowsOverlay />
                }
            </Container>
        </Box>
    )
}

export default Subscriptions