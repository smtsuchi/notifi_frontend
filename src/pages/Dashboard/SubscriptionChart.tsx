import React, { useEffect, useState } from 'react';
import { Box, ToggleButtonGroup, ToggleButton, Avatar, LinearProgress } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { RowType } from '.';
import NoRowsOverlay from './NoRowsOverlay';
import { useGetPricesByProductIdsQuery } from '../../slices/subscriptionSlice';
import { ErrorType } from '../../types/responses/errorResponses';
import { useApiErrorHandler } from '../../hooks/useApiErrorHandler';
import { useAuth } from '../../hooks/useAuth';
import { truncateString } from '../../helpers';

interface SubscriptionChartProps {
    rows: RowType[];
    isFetching: boolean;
}

export interface GraphableDataType {
    [productId: string]: number[];
}

interface SeriesItem {
    data: number[];
    label: string;
}

const SubscriptionChart: React.FC<SubscriptionChartProps> = ({ rows, isFetching }) => {
    const {accessToken} = useAuth();
    const [selected, setSelected] = useState(rows);
    const productIds = rows.map(product => product.id);
    const {currentData, error, isError} = useGetPricesByProductIdsQuery({body:{product_ids: productIds}, accessToken});
    const handleError = useApiErrorHandler();
    
    useEffect(() => {
        const e = error as ErrorType
        isError && handleError(e)
    }, [isError, error, handleError])


    const handleSelected = async (
        _event: React.MouseEvent<HTMLElement>,
        newSelected: RowType[],
    ) => {
        setSelected(newSelected);
    };

    const getGraphableData = (selected: RowType[]):SeriesItem[] => {
        const output = []
        for (const product of selected){
            if (currentData){
                output.push({
                    data: currentData?.data[product.id].map(priceObj => priceObj.amount),
                    label: product.productName
                })
            }
        }
        return output;
    };

    const truncateSeries = (series: SeriesItem[]) => {
        const minLength = Math.min(...series.map(item => item.data.length));
    
        const truncatedSeries = series.map(item => {
            return {
                data: item.data.slice(0, minLength),
                label: truncateString(item.label)
            };
        });
    
        return truncatedSeries;
    }

    const calcHeight = () => {
        return selected.length*30 + 300
    }
    const calcBottomMargin = () => {
        return selected.length*30 + 100
    }


    const showChart = () => (
        rows.length > 0 ?
            (
                <>
                    <ToggleButtonGroup
                        color="primary"
                        value={selected}
                        onChange={handleSelected}
                        aria-label="product list"
                        orientation="vertical"
                    >
                        {rows.map((subscriber) => (
                            <ToggleButton value={subscriber} aria-label="bold">
                                <Avatar aria-label={subscriber.productName} sx={{ objectFit: 'contain' }} src={subscriber.imgUrl} />
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                    <LineChart
                        series={truncateSeries(getGraphableData(selected))}
                        // xAxis={[{ scaleType: 'point', data: xLabels }]}
                        width={400}
                        height={calcHeight()}
                        margin={{ top: 50, bottom: calcBottomMargin(), left: 50, right:10 }}
                        slotProps={{
                            legend: {
                              direction: 'column',
                              position: { vertical: 'bottom', horizontal: 'middle' },
                            },
                        }}
                    />
                </>
            ) : <NoRowsOverlay />
    )
    return (
        <Box
            border={'1px solid rgba(224, 224, 224, 1)'}
            borderRadius='4px'
            display='flex'
            position='relative'
            justifyContent='center'
            paddingY='16px'
        >
            {isFetching ? <LinearProgress /> : showChart()}
        </Box>
    )
}

export default SubscriptionChart