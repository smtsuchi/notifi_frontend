import React, { useState } from 'react';
import { Box, ToggleButtonGroup, ToggleButton, Avatar, LinearProgress } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { RowType } from '.';
import NoRowsOverlay from './NoRowsOverlay';

interface SubscriptionChartProps {
    rows: RowType[];
    isFetching: boolean;
}

const SubscriptionChart: React.FC<SubscriptionChartProps> = ({ rows, isFetching }) => {
    const [selected, setSelected] = useState(rows);
    

    const handleSelected = (
        _event: React.MouseEvent<HTMLElement>,
        newSelected: RowType[],
    ) => {
        console.log(newSelected)
        setSelected(newSelected);
    };

    const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
    const xLabels = [
        'Page A',
        'Page B',
        'Page C',
        'Page D',
        'Page E',
        'Page F',
        'Page G',
    ];

    const showChart = () => (
        rows.length > 0 ?
            (
                <>
                    <ToggleButtonGroup
                        value={selected}
                        onChange={handleSelected}
                        aria-label="text formatting"
                    >
                        {rows.map((subscriber) => (
                            <ToggleButton value={subscriber} aria-label="bold">
                                <Avatar aria-label={subscriber.productName} sx={{ objectFit: 'contain' }} src={subscriber.imgUrl} />
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                    <LineChart
                        series={[
                            { data: pData, label: 'pv' },
                            { data: uData, label: 'uv' },
                        ]}
                        xAxis={[{ scaleType: 'point', data: xLabels }]}
                        width={500}
                        height={300}
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
        >
            {isFetching ? <LinearProgress /> : showChart()}


        </Box>
    )
}

export default SubscriptionChart