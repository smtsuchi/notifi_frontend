import React, { useEffect } from 'react';
import { useGetSubscriptionsQuery } from '../../slices/subscriptionSlice';
import Subscription from './Subscription';
import { SubscriptionType } from '../../types/entities/SubscriptionType';
import { useApiErrorHandler } from '../../hooks/useApiErrorHandler';
import { Box, Container, CircularProgress } from '@mui/material';


const Subscriptions: React.FC = () => {
    const { currentData, error, isError, isFetching } = useGetSubscriptionsQuery();
    const handleError = useApiErrorHandler();

    useEffect(() => {
        isError && handleError(error)
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
                    : !isFetching && 'No data available'
                }
            </Container>
        </Box>
    )
}

export default Subscriptions