import { useState } from 'react';
import { TimeScheduler } from '../../../src';
import type { BaseResource, BaseEvent } from '../../../src';
import { Box, Typography, Button, Stack } from '@mui/material';
import { addWeeks, subWeeks } from 'date-fns';

// Sample data
const sampleResources: BaseResource[] = [
  {
    id: '1',
    name: 'John Doe',
    color: '#3788d8',
  },
  {
    id: '2',
    name: 'Jane Smith',
    color: '#f44336',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    color: '#4caf50',
  },
  {
    id: '4',
    name: 'Alice Williams',
    color: '#ff9800',
  },
];

const sampleEvents: BaseEvent[] = [
  {
    id: 'shift-1',
    resourceId: '1',
    title: 'Morning Shift',
    start: new Date().toISOString(),
    end: new Date(new Date().setHours(new Date().getHours() + 8)).toISOString(),
  },
  {
    id: 'shift-2',
    resourceId: '2',
    title: 'Afternoon Shift',
    start: new Date(new Date().setHours(12)).toISOString(),
    end: new Date(new Date().setHours(20)).toISOString(),
  },
  {
    id: 'shift-3',
    resourceId: '3',
    title: 'Night Shift',
    start: new Date(new Date().setHours(20)).toISOString(),
    end: new Date(new Date().setHours(28)).toISOString(),
  },
];

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<BaseEvent[]>(sampleEvents);

  const handleEventClick = (event: Partial<BaseEvent>, dateSlotSelected: Date) => {
    console.log('Event clicked:', event);
    console.log('Date slot:', dateSlotSelected);
    
    // If clicking on empty slot, create a new event
    if (!event.id) {
      const newEvent: BaseEvent = {
        id: `shift-${Date.now()}`,
        resourceId: event.resourceId!,
        title: 'New Shift',
        start: dateSlotSelected.toISOString(),
        end: new Date(dateSlotSelected.getTime() + 8 * 60 * 60 * 1000).toISOString(),
      };
      setEvents([...events, newEvent]);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom>
        React Time Scheduler Demo
      </Typography>
      
      <Stack direction="row" spacing={2} mb={3}>
        <Button 
          variant="outlined" 
          onClick={() => setCurrentDate(subWeeks(currentDate, 1))}
        >
          Previous Week
        </Button>
        
        <Button 
          variant="contained" 
          onClick={() => setCurrentDate(new Date())}
        >
          Today
        </Button>
        
        <Button 
          variant="outlined" 
          onClick={() => setCurrentDate(addWeeks(currentDate, 1))}
        >
          Next Week
        </Button>
      </Stack>

      <TimeScheduler
        resources={sampleResources}
        events={events}
        timeSchedulerDate={currentDate}
        onEventClick={handleEventClick}
        timezone="America/New_York"
        weekStartsOn={1}
        renderHeader={
          <Typography variant="h5" gutterBottom>
            Staff Schedule
          </Typography>
        }
      />
      
      <Box mt={3}>
        <Typography variant="body2" color="text.secondary">
          Click on any empty slot to create a new shift, or click on an existing shift to view details.
        </Typography>
      </Box>
    </Box>
  );
}

export default App;