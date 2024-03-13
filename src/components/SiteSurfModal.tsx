import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogTitle,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    Input,
    InputLabel,
    Paper,
    PaperProps,
} from '@mui/material';
import { Save as SaveIcon, Close as CloseIcon } from '@mui/icons-material';

const defaultUrl = `https://www.amazon.com`;
const defaultIframeSrc = `https://www.amazon.com`;

interface SiteSurfModalProps {
    setModalOpen: (val: boolean) => void;
    url?: string;
    exportCallback: (url: string, maxProduct?: number) => void;
}

const PaperComponent = (props: PaperProps) => {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
};

const doWorkOnURL = (final_url: string) => {
    let url = '';
    let parsedUrl = null;
    try {
        parsedUrl = new URL(final_url);
        url = `${defaultUrl}${parsedUrl.pathname}${parsedUrl.search}`;
    } catch (e) {
        console.log(e);
        url = `${defaultUrl}${final_url}`;
    }

    return url;
};

const SiteSurfModal: React.FC<SiteSurfModalProps> = ({
    setModalOpen,
    url,
    exportCallback,
}) => {
    const [editedUrl, setEditedUrl] = useState('');
    const [iframeSrc, setIframeSrc] = useState('');

    useEffect(() => {
        if (url) {
            const newUrl = doWorkOnURL(url);
            setEditedUrl(newUrl);
            setIframeSrc(newUrl.replace(defaultUrl, defaultIframeSrc));
        }
    }, [url]);

    useEffect(() => {
        const listener = (event: MessageEvent) => {
            // this won't work. Needs permission from host e.g. amazon.com
            console.log(event);
        };

        window.addEventListener('message', listener);

        return () => {
            window.removeEventListener('message', listener);
        };
    }, [setEditedUrl]);

    const handleSaveClick = async () => {
        setIframeSrc(editedUrl);
        exportCallback(editedUrl)
    };

    const handleGoClick = () => {
        setIframeSrc(editedUrl);
    };
    return (
        <Dialog
            open
            onClose={() => setModalOpen(false)}
            fullWidth
            maxWidth={false}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
            sx={{ zIndex: 1501 }}
        >
            <DialogTitle
                sx={{ bgcolor: 'primary.main', color: 'white' }}
                style={{
                    cursor: 'move',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
                id="draggable-dialog-title"
            >
                Search for a URL
                <IconButton
                    sx={{ color: 'white' }}
                    aria-label="close"
                    onClick={() => setModalOpen(false)}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Container sx={{ mt: 4, display: 'flex', flexDirection: {xs: 'column', md: 'row'} }}>
                <Box ml={3} flexGrow={1}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="url">Product URL</InputLabel>
                        <Input
                            id="url"
                            aria-describedby="url-helper-text"
                            value={editedUrl}
                            onChange={(e) => setEditedUrl(e.target.value)}
                            fullWidth
                        />
                        <FormHelperText id="url-helper-text">
                            Find a product to save
                        </FormHelperText>
                    </FormControl>
                </Box>
                <Box display="flex">
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        p={1}
                    >
                        <Button onClick={handleGoClick} color="primary" variant="contained">
                            View URL
                        </Button>
                    </Box>

                    <Box display="flex" justifyContent="flex-start" p={1}>
                        <Button onClick={handleSaveClick} size='large' startIcon={<SaveIcon />}>
                            Save
                        </Button>
                    </Box>
                </Box>
            </Container>
            <Box sx={{ mt: 1, pl: 3 }}>
                <Grid item xs={12}>
                    <iframe src={iframeSrc} id="iframe" title="testing" width="98%" height="600px" onLoad={()=>{
                        
                    }}/>
                </Grid>
            </Box>
        </Dialog>
    );
};
export default SiteSurfModal;