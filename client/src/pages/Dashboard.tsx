import { useEffect, useState } from 'react';
import { format } from 'date-fns';
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
  Chip,
} from '@mui/material';
import { getClientProfitsAction, useAppDispatch, useAppSelector } from '../Redux';

export default function Dashboard() {
  const [month, setMonth] = useState(format(new Date(), 'yyyy-MM'));
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.revenue)

  useEffect(() => {
    const fetchClientProfits = async () => {
        try {
            await dispatch(getClientProfitsAction({ yearMonth: month})).unwrap()
        } catch (err) {
            console.error("Error fetching Client Profits:", err);
        }
    }
    
    fetchClientProfits()
  }, [month])

  const getChipColor = (pct: number) => {
    if (pct < 10) return 'error';
    if (pct < 20) return 'warning';
    return 'success';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Client Profitability
        </Typography>

        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </Box>

      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.100' }}>
              <TableCell>Client</TableCell>
              <TableCell align="right">Revenue</TableCell>
              <TableCell align="right">Actual Hours</TableCell>
              <TableCell align="right">Delivery Cost</TableCell>
              <TableCell align="right">Margin %</TableCell>
              <TableCell align="right">Variance %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list?.map((item) => (
              <TableRow key={item.client_name} hover>
                <TableCell component="th" scope="row">
                  {item.client_name}
                </TableCell>
                <TableCell align="right">
                  ₹{item.revenue.toLocaleString('en-IN')}
                </TableCell>
                <TableCell align="right">{item.actual_hours.toFixed(1)}</TableCell>
                <TableCell align="right">
                  ₹{item.delivery_cost.toLocaleString('en-IN')}
                </TableCell>
                <TableCell align="right">
                  <Chip
                    label={`${item.margin_percent.toFixed(1)}%`}
                    color={getChipColor(item.margin_percent) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  {item.variance_percent !== null
                    ? `${item.variance_percent.toFixed(1)}%`
                    : '—'}
                </TableCell>
              </TableRow>
            ))}
            {list?.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                  No data available for this month
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}