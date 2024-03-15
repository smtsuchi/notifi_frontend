import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import {
    Card, CardHeader, CardMedia, CardContent, CardActions, Collapse,
    Avatar, Box, Menu, MenuItem, Typography
} from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { SubscriptionType } from '../../types/entities/SubscriptionType'
import { formatPrice } from '../../helpers';
import { useUnsubscribeMutation } from '../../slices/subscriptionSlice';
import { useApiErrorHandler } from '../../hooks/useApiErrorHandler';
import toast from 'react-hot-toast';
import { ErrorType } from '../../types/responses/errorResponses';
import { useAuth } from '../../hooks/useAuth';

interface ExpandMoreProps extends IconButtonProps {
    expand: number;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    return <IconButton {...props} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

interface SubscriptionProps {
    subscription: SubscriptionType;
}

const Subscription: React.FC<SubscriptionProps> = ({ subscription }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [expanded, setExpanded] = useState(false);
    const [unsubscribe] = useUnsubscribeMutation();
    const handleError = useApiErrorHandler();
    const { accessToken } = useAuth();

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = async () => {
        try {
            const response = await unsubscribe({ body: { id: subscription.id }, accessToken }).unwrap();
            if (response.status === 'ok') {
                toast.success(response.message);
            }
        } catch (_e) {
            const e = _e as ErrorType
            handleError(e);
        }
        handleClose();
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 345, minWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar
                        sx={{ bgcolor: red[500] }}
                        aria-label={subscription.product.product_name}
                        src={subscription.product.image_url}
                    />
                }
                action={
                    <Box>

                        <IconButton
                            aria-label="More Actions"
                            onClick={handleOpen}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClick}>
                                <Typography textAlign="center">Unsubscribe</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                }
                title={subscription.product.product_name}
                subheader={formatPrice(subscription.product.current_price)}
            />
            <CardMedia
                component="img"
                height="194"
                image={subscription.product.image_url}
                alt={subscription.product.product_name}
                sx={{
                    objectFit: 'contain'
                }}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                    <a
                        href={subscription.product.url}
                        target='_blank'
                        style={{
                            color: '#0000EE',
                            textDecoration: 'underline',
                            alignItems: 'center',
                            display: 'flex',
                        }}
                    >
                        <span>
                            Go to Amazon Product Page
                        </span>
                        <OpenInNewIcon sx={{ fontSize: '16px' }} />
                    </a>
                </Typography>
            </CardContent>
            {subscription.product.description && (
                <>
                    <CardActions disableSpacing>
                        <ExpandMore
                            expand={+expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>Product Description:</Typography>
                            <Typography paragraph>
                                {subscription.product.description}
                            </Typography>
                        </CardContent>
                    </Collapse>
                </>
            )}
        </Card>
    );
}

export default Subscription