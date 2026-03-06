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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Client, getClientsListAction, Role, setClientRevenueAction, useAppDispatch, useAppSelector } from '../Redux';
import { format } from 'date-fns';

export const RevenuePage = () => {

    const dispatch = useAppDispatch();
    const [yearMonth, setYearMonth] = useState(format(new Date(), 'yyyy-MM'));
    const { list, isLoading, isError, isCreating } = useAppSelector((state) => state.client)
    const [clientsList, setClientsList] = useState<Client[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    const [form, setForm] = useState({
        client_id: null,
        month: '',
        year: '',
        revenue: '',
        estimated_hours: '',
    });

    const [formError, setFormError] = useState<string | null>(null);

    const fetchClientsList = async () => {
        try {
            await dispatch(getClientsListAction()).unwrap()
        } catch (err) {
            console.error("Error fetching Clients list:", err);
        }
    }

    useEffect(() => {
        fetchClientsList();
    }, [])
    
    useEffect(() => {
        setClientsList(list);
    }, [list])

    useEffect(() => {
        const [year, month] = yearMonth.split('-');
        console.log(`Year: ${year} Month: ${month}`);
        setForm((prev) => ({ ...prev, ['year']: year }));
        setForm((prev) => ({ ...prev, ['month']: month }));
    }, [yearMonth])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);
        setIsSubmitting(true);

        const revenueValue = Number(form.revenue);

        if (!form.client_id) {
            setFormError('Client is required');
            return;
        }
        if (isNaN(revenueValue) || revenueValue < 0) {
            setFormError('Revenue must be a non-negative number');
            return;
        }

        try {
            await dispatch(setClientRevenueAction({
                client_id: form.client_id,
                month: Number(form.month),
                year: Number(form.year),
                revenue: revenueValue,
                estimated_hours: Number(form.estimated_hours)
            })).unwrap()

            setForm({ client_id: null, month: '', year: '', revenue: '', estimated_hours: '' });
            setIsSubmitting(false);
        } catch (err: any) {
            setFormError(err?.data?.message || 'Failed to save Revenue');
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
        return <Alert severity="error">Failed to load roles</Alert>;
    }

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Set Client Monthly Revenue
            </Typography>

            <Card elevation={3} sx={{ mb: 5 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AddIcon color="primary" /> Set Client Monthly Revenue
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                                <FormControl fullWidth required variant="outlined">
                                    <InputLabel id="client-label">Client</InputLabel>
                                    <Select
                                        labelId="client-label"
                                        label="Client"
                                        name="client_id"
                                        value={form.client_id}
                                        onChange={(e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value}))}
                                    >
                                        <MenuItem value="" disabled>
                                        Select client
                                        </MenuItem>
                                        {clientsList.map((client: Client) => (
                                            <MenuItem key={client.id} value={client.id}>
                                                {client.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Month"
                                    name="month"
                                    type="month"
                                    value={yearMonth}
                                    onChange={(e) => setYearMonth(e.target.value)}
                                    required
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Revenue"
                                    name="revenue"
                                    value={form.revenue}
                                    onChange={handleChange}
                                    type="number"
                                    required
                                    variant="outlined"
                                    helperText="Greater then 0"
                                    inputProps={{ min: 1 }}
                                />
                            </Grid>
                            
                            <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Estimated Hours"
                                    name="estimated_hours"
                                    value={form.estimated_hours}
                                    onChange={handleChange}
                                    type="number"
                                    required
                                    variant="outlined"
                                    placeholder="Optional"
                                    helperText="Leave blank if not estimated"
                                    inputProps={{ min: 1 }}
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
                            sx={{ mt: 4 }}
                            disabled={isSubmitting}
                            startIcon={
                                isSubmitting ? <CircularProgress size={20} color="inherit" /> : <AddIcon />
                            }
                            >
                            {isSubmitting ? 'Saving...' : 'Save Revenue'}
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}