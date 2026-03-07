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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Divider,
  Card,
  CardContent,
  SelectChangeEvent,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { format } from 'date-fns';
import { addTimeEntryAction, Client, getClientsListAction, getRolesListAction, getTimeEntriesListAction, Role, TimeEntries, useAppDispatch, useAppSelector } from '../Redux';

interface TimeEntryForm {
  clientId: string;
  roleId: string;
  hours: string;
  date: string;
}

export const TimeEntriesPage = () => {

    const dispatch = useAppDispatch();

    const { list: clientsList, isLoading: isClientLoading } = useAppSelector((state) => state.client)
    const { list: rolesList, isLoading: isRolesLoading } = useAppSelector((state) => state.roles)
    const { list: timeEntriesList, isLoading: isTimeEntriesLoading, isError } = useAppSelector((state) => state.time_entries)

    const [yearMonth, setYearMonth] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [filters, setFilters] = useState({
        clientId: '',
        month: '',
    });

    const defaultState = {
        clientId: '',
        roleId: '',
        hours: '',
        date: ''
    }

    const [form, setForm] = useState<TimeEntryForm>(defaultState);

    const [formError, setFormError] = useState<string | null>(null);

    const fetchClientsList = async () => {
        try {
            await dispatch(getClientsListAction()).unwrap()
        } catch (err) {
            console.error("Error fetching Clients list:", err);
        }
    }

    const fetchRolesList = async () => {
        try {
            await dispatch(getRolesListAction()).unwrap()
        } catch (err) {
            console.error("Error fetching Roles list:", err);
        }
    }
    
    const fetchTimeEntriesList = async () => {
        try {
            await dispatch(getTimeEntriesListAction({
                client_id: filters.clientId ?? '',
                yearMonth: filters.month ?? ''
            })).unwrap()
        } catch (err) {
            console.error("Error fetching Time Entries list:", err);
        }
    }

    useEffect(() => {
        setFilters((prev) => ({ ...prev, ['month']: yearMonth }));
    }, [yearMonth])
    
    useEffect(() => {
        fetchClientsList();
        fetchRolesList();
        fetchTimeEntriesList();
    }, [])

    useEffect(() => {
        fetchTimeEntriesList();
    }, [filters])

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFilterChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);
        setIsSubmitting(true);

        const clientId = Number(form.clientId);
        const roleId = Number(form.roleId);
        const hoursNum = Number(form.hours);

        if (!form.clientId) {
        setFormError('Please select a client');
        return;
        }
        if (!form.roleId) {
        setFormError('Please select a role');
        return;
        }
        if (isNaN(hoursNum) || hoursNum <= 0) {
        setFormError('Hours must be a positive number');
        return;
        }
        if (!form.date) {
        setFormError('Date is required');
        return;
        }

        try {
            await dispatch(addTimeEntryAction({
                clientId,
                role_id: roleId,
                total_hours: hoursNum,
                entry_date: form.date
            })).unwrap();

            setForm(defaultState);
            setFilters({ clientId: '', month: '' });
            setIsSubmitting(false);
        } catch (err: any) {
            
            setIsSubmitting(false);
            setFormError(err?.data?.message || 'Failed to add time entry');
        }
    };

    const isLoading = isClientLoading || isRolesLoading || isTimeEntriesLoading;

    if (isLoading) {
        return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
        </Box>
        );
    }

    if (isError) {
        return <Alert severity="error">Failed to load time entries</Alert>;
    }

    return (
        <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
        <Typography variant="h4" component="h1" gutterBottom>
            Time Entries
        </Typography>

        <Card elevation={3} sx={{ mb: 5 }}>
            <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AddIcon color="primary" /> Log Time Entry
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                        <FormControl fullWidth required variant="outlined" error={!form.clientId && !!formError}>
                        <InputLabel>Client</InputLabel>
                        <Select
                            label="Client"
                            name="clientId"
                            value={form.clientId}
                            onChange={handleFormChange}
                        >
                            <MenuItem value="" disabled>Select client</MenuItem>
                            {clientsList.map((c: Client) => (
                                <MenuItem key={c.id} value={c.id}>
                                    {c.name}
                                </MenuItem>
                            ))}
                        </Select>
                        </FormControl>
                    </Grid>

                    <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                        <FormControl fullWidth required variant="outlined" error={!form.roleId && !!formError}>
                        <InputLabel>Role</InputLabel>
                        <Select
                            label="Role"
                            name="roleId"
                            value={form.roleId}
                            onChange={handleFormChange}
                        >
                            <MenuItem value="" disabled>Select role</MenuItem>
                            {rolesList.map((r: Role) => (
                                <MenuItem key={r.id} value={r.id}>
                                    {r.name}
                                </MenuItem>
                            ))}
                        </Select>
                        </FormControl>
                    </Grid>

                    <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Hours"
                            name="hours"
                            value={form.hours}
                            onChange={handleFormChange}
                            type="number"
                            required
                            variant="outlined"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Date"
                            name="date"
                            type="date"
                            value={form.date}
                            onChange={handleFormChange}
                            required
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                </Grid>

                {formError && (
                <Alert severity="error" sx={{ mt: 3 }}>
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
                    startIcon={isSubmitting ? <CircularProgress size={20} /> : <AddIcon />}
                    >
                    {isSubmitting ? 'Adding...' : 'Add Time Entry'}
                </Button>
            </Box>
            </CardContent>
        </Card>

        <Divider sx={{ my: 5 }} />

        <Box sx={{ mb: 4, display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <Typography variant="h5" component="h2">
            Time Entries
            </Typography>

            <FormControl sx={{ minWidth: 160 }}>
            <InputLabel>Filter by Client</InputLabel>
            <Select
                label="Filter by Client"
                name="clientId"
                value={filters.clientId}
                onChange={handleFilterChange}
            >
                <MenuItem value="">All Clients</MenuItem>
                {clientsList.map((c: Client) => (
                <MenuItem key={c.id} value={c.id}>
                    {c.name}
                </MenuItem>
                ))}
            </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 160 }}>
                <TextField
                    fullWidth
                    label="Month"
                    name="month"
                    type="month"
                    value={yearMonth}
                    onChange={(e) => setYearMonth(e.target.value)}
                    variant="outlined"
                />
            </FormControl>
        </Box>

        {timeEntriesList.length === 0 ? (
            <Alert severity="info">No time entries found matching the filters.</Alert>
        ) : (
            <TableContainer component={Paper} elevation={2}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                <TableRow sx={{ bgcolor: 'grey.100' }}>
                    <TableCell>Client</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell align="right">Hours</TableCell>
                    <TableCell align="center">Date</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {timeEntriesList.map((entry: TimeEntries) => (
                    <TableRow key={entry.id} hover>
                    <TableCell>{entry.clientData?.name || `Client #${entry.client_id}`}</TableCell>
                    <TableCell>{entry.roleData?.name || `Role #${entry.role_id}`}</TableCell>
                    <TableCell align="right">{entry.total_hours}</TableCell>
                    <TableCell align="center">{entry.entry_date}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        )}
        </Box>
    );
}