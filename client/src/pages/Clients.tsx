import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Alert,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Client, createClientAction, getClientsListAction, useAppDispatch, useAppSelector } from '../Redux';

export const ClientsPage = () => {
    const dispatch = useAppDispatch();
    const { list, isLoading, isError, isCreating } = useAppSelector((state) => state.client)

    const [form, setForm] = useState({
        name: '',
    });

    const [formError, setFormError] = useState<string | null>(null);

    useEffect(() => {
        const fetchClientsList = async () => {
            try {
                await dispatch(getClientsListAction()).unwrap()
            } catch (err) {
                console.error("Error fetching Clients list:", err);
            }
        }
        
        fetchClientsList()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        if (!form.name.trim()) {
        setFormError('Client name is required');
        return;
        }

        try {
            await dispatch(createClientAction({
                        name: form.name.trim()
                    })).unwrap()

            setForm({ name: '' });
        } catch (err: any) {
            setFormError(err?.data?.message || 'Failed to create client');
        }
    };

    if (isLoading) {
        return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
            <CircularProgress />
        </Box>
        );
    }

    if (isError) {
        return <Alert severity="error">Failed to load clients</Alert>;
    }

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h4" component="h1" gutterBottom>
            Clients Management
        </Typography>

        <Card elevation={3} sx={{ mb: 5 }}>
            <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AddIcon color="primary" /> Add New Client
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                        fullWidth
                        label="Client Name / Company Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        placeholder="e.g. Acme Corp, Global Media, etc."
                        />
                    </Grid>
                </Grid>

                {formError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {formError}
                </Alert>
                )}

                <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 3 }}
                disabled={isCreating}
                startIcon={isCreating ? <CircularProgress size={20} /> : <AddIcon />}
                >
                {isCreating ? 'Creating...' : 'Create Client'}
                </Button>
            </Box>
            </CardContent>
        </Card>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" gutterBottom>
            Existing Clients
        </Typography>

        {list.length === 0 ? (
            <Alert severity="info">No clients created yet.</Alert>
        ) : (
            <TableContainer component={Paper} elevation={2}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                <TableRow sx={{ backgroundColor: 'grey.100' }}>
                    <TableCell>ID</TableCell>
                    <TableCell>Client Name</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {list.map((client: Client) => (
                    <TableRow key={client.id} hover>
                        <TableCell>{client.id}</TableCell>
                        <TableCell component="th" scope="row">
                            {client.name}
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        )}
        </Box>
    );
}