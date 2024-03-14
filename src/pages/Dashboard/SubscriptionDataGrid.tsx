import React from 'react';
import { Avatar, LinearProgress } from '@mui/material';
import {
    DataGrid, GridCellParams, GridColDef,
    GridToolbar,
    useGridApiRef
} from '@mui/x-data-grid';
import Moment from 'react-moment';
import NoRowsOverlay from './NoRowsOverlay';
import { RowType } from '.';
import { formatPrice } from '../../helpers';

interface SubscriptionDataGridProps {
    rows: RowType[];
    isFetching: boolean;
}

const SubscriptionDataGrid: React.FC<SubscriptionDataGridProps> = ({ rows, isFetching }) => {
    const apiRef = useGridApiRef();

    

    const columns: GridColDef[] = [
        {
            field: 'img',
            headerName: 'Image',
            renderCell: (params: GridCellParams) => <Avatar aria-label={params.row.productName} sx={{ objectFit: 'contain' }} src={params.row.imgUrl} />,
            minWidth: 80,
            maxWidth: 80
        },
        {
            field: 'productName',
            headerName: 'Product Name',
            flex: 2,
            minWidth: 85,
        },
        {
            field: 'currentPrice',
            headerName: 'Current Price',
            renderCell: (params: GridCellParams) => <p>{formatPrice(params.row.currentPrice)}</p>,
            flex: 1,
            minWidth: 85,
        },
        {
            field: 'lowestPrice',
            headerName: 'Lowest Price',
            renderCell: (params: GridCellParams) => <p>{formatPrice(params.row.lowestPrice)}</p>,
            flex: 1,
            minWidth: 85,
        },
        {
            field: 'subscriberCount',
            headerName: '# of Subscribers',
            flex: .5,
            minWidth: 85,
        },
        {
            field: 'subscriptionDate',
            headerName: 'Subscription Date',
            renderCell: (params: GridCellParams) => <Moment format="D MMM YYYY" withTitle>{params.row.subscriptionDate}</Moment>,
            flex: .7,
            minWidth: 85,
        },
        {
            field: 'cancelledDate',
            headerName: 'Cancellation Date',
            renderCell: (params: GridCellParams) => (params.row.cancellationDate && <Moment format="D MMM YYYY" withTitle>{params.row.cancellationDate}</Moment>),
            flex: .7,
            minWidth: 85
        },
    ];

    return (
        <DataGrid
            loading={isFetching}
            rows={rows}
            columns={columns}
            apiRef={apiRef}
            disableRowSelectionOnClick
            slots={{
                toolbar: GridToolbar,
                loadingOverlay: LinearProgress,
                noRowsOverlay: NoRowsOverlay
            }}
        />
    )
}

export default SubscriptionDataGrid