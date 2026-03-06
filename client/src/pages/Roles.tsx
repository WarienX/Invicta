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
import { createRoleAction, getRolesListAction, Role, useAppDispatch, useAppSelector } from '../Redux';

export const RolesPage = () => {

    const dispatch = useAppDispatch();
    const { list, isLoading, isError, isCreating } = useAppSelector((state) => state.roles)
    
    const [form, setForm] = useState({
        name: '',
        monthlySalary: 0,
        productiveHours: 160,
    });

    const [formError, setFormError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRolesList = async () => {
            try {
                await dispatch(getRolesListAction()).unwrap()
            } catch (err) {
                console.error("Error fetching Roles list:", err);
            }
        }
        
        fetchRolesList()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        const monthlySalaryNum = Number(form.monthlySalary);
        const productiveHoursNum = Number(form.productiveHours);

        if (!form.name.trim()) {
        setFormError('Role name is required');
        return;
        }
        if (isNaN(monthlySalaryNum) || monthlySalaryNum <= 0) {
        setFormError('Monthly salary must be a positive number');
        return;
        }
        if (isNaN(productiveHoursNum) || productiveHoursNum <= 0) {
        setFormError('Productive hours must be a positive number');
        return;
        }

        try {
            await dispatch(createRoleAction({
                name: form.name.trim(),
                monthly_salary: monthlySalaryNum,
                productive_hours: productiveHoursNum,
            })).unwrap()

            setForm({ name: '', monthlySalary: 0, productiveHours: 160 });
        } catch (err: any) {
            setFormError(err?.data?.message || 'Failed to create role');
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
            Roles Management
        </Typography>

        {/* Create Form */}
        <Card elevation={3} sx={{ mb: 5 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AddIcon color="primary" /> Create New Role
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                fullWidth
                                label="Role Name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                variant="outlined"
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                fullWidth
                                label="Monthly Salary (₹)"
                                name="monthlySalary"
                                value={form.monthlySalary}
                                onChange={handleChange}
                                type="number"
                                required
                                variant="outlined"
                                inputProps={{ min: 1 }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                fullWidth
                                label="Productive Hours / Month"
                                name="productiveHours"
                                value={form.productiveHours}
                                onChange={handleChange}
                                type="number"
                                required
                                variant="outlined"
                                helperText="Typical: 140–170 hours"
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
                    sx={{ mt: 3 }}
                    disabled={isCreating}
                    startIcon={isCreating ? <CircularProgress size={20} /> : <AddIcon />}
                    >
                    {isCreating ? 'Creating...' : 'Create Role'}
                    </Button>
                </Box>
            </CardContent>
        </Card>

        <Divider sx={{ my: 4 }} />

        {/* Roles List */}
        <Typography variant="h5" gutterBottom>
            Existing Roles
        </Typography>

        {list.length === 0 ? (
            <Alert severity="info">No roles created yet.</Alert>
        ) : (
            <TableContainer component={Paper} elevation={2}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                <TableRow sx={{ backgroundColor: 'grey.100' }}>
                    <TableCell>ID</TableCell>
                    <TableCell>Role Name</TableCell>
                    <TableCell align="right">Monthly Salary (₹)</TableCell>
                    <TableCell align="right">Productive Hours</TableCell>
                    <TableCell align="right">Cost per Hour (₹)</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {list.map((role: Role) => (
                    <TableRow key={role.id} hover>
                    <TableCell>{role.id}</TableCell>
                    <TableCell component="th" scope="row">
                        {role.name}
                    </TableCell>
                    <TableCell align="right">{role.monthly_salary.toLocaleString('en-IN')}</TableCell>
                    <TableCell align="right">{role.productive_hours}</TableCell>
                    <TableCell align="right">
                        <strong>{role.cost_per_hour}</strong>
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