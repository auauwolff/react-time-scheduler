import { useState } from 'react';
import { TimeScheduler } from '../../../src';
import type { BaseResource, BaseEvent } from '../../../src';
import { 
  Box, 
  Typography, 
  Paper,
  Chip,
  Stack,
  Divider,
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

interface ExtendedResource extends BaseResource {
  hourlyRate: number;
  department: string;
}

interface ExtendedEvent extends BaseEvent {
  type: 'regular' | 'overtime' | 'holiday';
}

const resources: ExtendedResource[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    color: '#2196f3',
    hourlyRate: 45,
    department: 'Engineering',
  },
  {
    id: '2',
    name: 'Bob Smith',
    color: '#4caf50',
    hourlyRate: 40,
    department: 'Design',
  },
  {
    id: '3',
    name: 'Carol White',
    color: '#ff9800',
    hourlyRate: 50,
    department: 'Management',
  },
  {
    id: '4',
    name: 'David Brown',
    color: '#9c27b0',
    hourlyRate: 35,
    department: 'Support',
  },
];

const events: ExtendedEvent[] = [
  {
    id: '1',
    resourceId: '1',
    title: 'Regular Shift',
    start: new Date().toISOString(),
    end: new Date(new Date().setHours(new Date().getHours() + 8)).toISOString(),
    type: 'regular',
  },
  {
    id: '2',
    resourceId: '2',
    title: 'Overtime',
    start: new Date(new Date().setHours(18)).toISOString(),
    end: new Date(new Date().setHours(22)).toISOString(),
    type: 'overtime',
  },
  {
    id: '3',
    resourceId: '3',
    title: 'Holiday Coverage',
    start: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    end: new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(new Date().getHours() + 8)).toISOString(),
    type: 'holiday',
  },
];

function AdvancedExample() {
  const [currentDate] = useState(new Date());

  const calculateDailyCost = (day: Date) => {
    const dayEvents = events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === day.toDateString();
    });

    return dayEvents.reduce((total, event) => {
      const resource = resources.find(r => r.id === event.resourceId);
      if (!resource) return total;

      const hours = (new Date(event.end).getTime() - new Date(event.start).getTime()) / (1000 * 60 * 60);
      const rate = event.type === 'overtime' ? resource.hourlyRate * 1.5 
                 : event.type === 'holiday' ? resource.hourlyRate * 2
                 : resource.hourlyRate;
      
      return total + (hours * rate);
    }, 0);
  };

  const calculateWeeklyTotal = () => {
    let total = 0;
    for (let i = 0; i < 7; i++) {
      const day = new Date(currentDate);
      day.setDate(day.getDate() - day.getDay() + i + 1); // Week starts on Monday
      total += calculateDailyCost(day);
    }
    return total;
  };


  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Advanced Features Example
      </Typography>
      
      <Typography variant="body1" paragraph>
        This example demonstrates advanced features including custom event types, 
        cost calculations, and footer aggregations.
      </Typography>

      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
        <TimeScheduler<ExtendedResource, ExtendedEvent>
          resources={resources}
          events={events}
          timeSchedulerDate={currentDate}
          onEventClick={(event, date) => console.log(event, date)}
          renderHeader={
            <Box sx={{ mb: 2 }}>
              <Typography variant="h5" gutterBottom>
                Payroll Schedule
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Chip 
                  label="Regular" 
                  size="small" 
                  sx={{ bgcolor: '#2196f3', color: 'white' }}
                />
                <Chip 
                  label="Overtime (1.5x)" 
                  size="small" 
                  sx={{ bgcolor: '#ff9800', color: 'white' }}
                />
                <Chip 
                  label="Holiday (2x)" 
                  size="small" 
                  sx={{ bgcolor: '#f44336', color: 'white' }}
                />
              </Stack>
            </Box>
          }
          renderResources={(resource) => (
            <Box>
              <Typography variant="subtitle2">{resource.name}</Typography>
              <Stack direction="row" spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  {resource.department}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ${resource.hourlyRate}/hr
                </Typography>
              </Stack>
            </Box>
          )}
          showSideBar={true}
          sideBarHeader={
            <Typography variant="subtitle2">Weekly Hours</Typography>
          }
          renderSideBar={(resource) => {
            const weeklyHours = events
              .filter(e => e.resourceId === resource.id)
              .reduce((total, event) => {
                const hours = (new Date(event.end).getTime() - new Date(event.start).getTime()) / (1000 * 60 * 60);
                return total + hours;
              }, 0);

            return (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6">{weeklyHours}h</Typography>
                <Typography variant="caption" color="text.secondary">
                  ${(weeklyHours * resource.hourlyRate).toFixed(0)}
                </Typography>
              </Box>
            );
          }}
          showFooter={true}
          renderFooterCells={(day) => {
            if (!day) return <Box />;
            const cost = calculateDailyCost(day.date);
            return (
              <Stack alignItems="center">
                <AttachMoneyIcon fontSize="small" color="action" />
                <Typography variant="body2" fontWeight="medium">
                  ${cost.toFixed(0)}
                </Typography>
              </Stack>
            );
          }}
          sideBarFooter={
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle2">Total</Typography>
              <Typography variant="h6" color="primary">
                ${calculateWeeklyTotal().toFixed(0)}
              </Typography>
            </Box>
          }
        />
      </Paper>

      <Typography variant="h6" gutterBottom>
        Advanced Features Demonstrated
      </Typography>
      
      <Stack spacing={2}>
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Extended Data Types
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Resources include hourly rates and departments. Events have types (regular, overtime, holiday).
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Dynamic Calculations
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Weekly hours and costs are calculated based on event data and resource rates.
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Footer Aggregations
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Daily costs are shown in the footer with a weekly total in the sidebar footer.
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Conditional Styling
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Event colors change based on type (overtime events are orange, holiday events are red).
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        TypeScript Support
      </Typography>
      
      <pre style={{ fontSize: '0.875rem' }}>
{`interface ExtendedResource extends BaseResource {
  hourlyRate: number;
  department: string;
}

interface ExtendedEvent extends BaseEvent {
  type: 'regular' | 'overtime' | 'holiday';
}

<TimeScheduler<ExtendedResource, ExtendedEvent>
  resources={resources}
  events={events}
  // Full type safety with extended types
/>`}
      </pre>
    </Box>
  );
}

export default AdvancedExample;