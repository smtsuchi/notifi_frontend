import React, { useEffect, useState } from 'react';
import { BottomNavigation, Box, BottomNavigationAction, CircularProgress } from '@mui/material';
import { useGetSubscriptionsQuery } from '../../slices/subscriptionSlice';
import { useApiErrorHandler } from '../../hooks/useApiErrorHandler';
import { ErrorType } from '../../types/responses/errorResponses';
import TableRowsIcon from '@mui/icons-material/TableRows';
import TimelineIcon from '@mui/icons-material/Timeline';
import SubscriptionDataGrid from './SubscriptionDataGrid';
import SubscriptionChart from './SubscriptionChart';
import { getSubscriptionsGroupedByProductId } from '../../helpers';
import { SubscriptionType } from '../../types/entities/SubscriptionType';

export type RowType = {
    imgUrl: string;
    productName: string;
    currentPrice: number;
    lowestPrice: number;
    subscriberCount: number;
    subscriptionDate: string;
    cancelledDate: string;
    isActive: boolean;
    productUrl: string;
    description: string;
    id: string;
};


const Dashboard: React.FC = () => {

    const [selected, setSelected] = useState<'dataGrid' | 'chart'>('dataGrid');
    const { currentData, error, isError, isFetching } = useGetSubscriptionsQuery();
    const handleError = useApiErrorHandler();

    useEffect(() => {
        const e = error as ErrorType
        isError && handleError(e)
    }, [isError, error, handleError])

    const rows: RowType[] = getSubscriptionsGroupedByProductId(currentData?.data ? currentData.data : [])
        .map((subscription: SubscriptionType) => ({
            imgUrl: subscription.product.image_url,
            productName: subscription.product.product_name,
            currentPrice: subscription.product.current_price,
            lowestPrice: subscription.product.lowest_recorded_price,
            subscriberCount: subscription.product.subscriber_count,
            subscriptionDate: subscription.subscription_date,
            cancelledDate: subscription.cancelled_date,
            //
            isActive: Boolean(subscription.cancelled_date),
            productUrl: subscription.product.url,
            description: subscription.product.description,
            id: subscription.product_id
        }));


    return (
        <Box sx={{ height: 520, width: '100%' }}>
            <BottomNavigation
                showLabels
                value={selected}
                onChange={(_event, newValue) => {
                    console.log(newValue)
                    setSelected(newValue);
                }}
            >
                <BottomNavigationAction value='dataGrid' label="Data Grid" icon={<TableRowsIcon />} />
                <BottomNavigationAction value='chart' label="Charts" icon={<TimelineIcon />} />
            </BottomNavigation>

            {
                selected === 'dataGrid' ? (
                    <SubscriptionDataGrid rows={rows} isFetching={isFetching} />
                ) : (
                    isFetching ?
                        <Box display='flex' justifyContent='center' marginTop='16px'><CircularProgress /></Box>
                        :
                        <SubscriptionChart rows={rows} isFetching={isFetching} />
                )
            }
        </Box>
    );
}

export default Dashboard