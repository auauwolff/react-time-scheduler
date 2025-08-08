import { useState } from 'react';
import { TimeScheduler } from '../../../src';
import type { BaseResource, BaseEvent } from '../../../src';
import { 
  Box, 
  Typography, 
  Paper,
  Switch,
  FormControlLabel,
  Alert,
  Stack,
  Chip
} from '@mui/material';

const resources: BaseResource[] = [
  {
    id: '1',
    name: 'Meeting Room A',
    color: '#2196f3',
  },
  {
    id: '2',
    name: 'Meeting Room B',
    color: '#4caf50',
  },
  {
    id: '3',
    name: 'Conference Hall',
    color: '#ff9800',
  },
];

const events: BaseEvent[] = [
  {
    id: '1',
    resourceId: '1',
    title: 'Team Standup',
    start: new Date().toISOString(),
    end: new Date(new Date().setHours(new Date().getHours() + 1)).toISOString(),
    notes: 'Daily sync meeting. Review sprint progress and blockers.',
  },
  {
    id: '2',
    resourceId: '1',
    title: 'Client Meeting',
    start: new Date(new Date().setHours(new Date().getHours() + 2)).toISOString(),
    end: new Date(new Date().setHours(new Date().getHours() + 3)).toISOString(),
    notes: 'Q4 planning discussion. Prepare slides and budget proposal.',
  },
  {
    id: '3',
    resourceId: '2',
    title: 'Training Session',
    start: new Date().toISOString(),
    end: new Date(new Date().setHours(new Date().getHours() + 2)).toISOString(),
    // No notes - no badge will show
  },
  {
    id: '4',
    resourceId: '3',
    title: 'All Hands Meeting',
    start: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    end: new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(new Date().getHours() + 2)).toISOString(),
    notes: 'Company-wide update. CEO will present new initiatives. Mandatory attendance.',
  },
  {
    id: '5',
    resourceId: '2',
    title: 'Design Review',
    start: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
    end: new Date(new Date(new Date().setDate(new Date().getDate() + 2)).setHours(new Date().getHours() + 1)).toISOString(),
    notes: 'Review mockups for new dashboard features.',
  },
];

function NotesBadgeExample() {
  const [showNotesBadge, setShowNotesBadge] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Partial<BaseEvent> | null>(null);

  const handleEventClick = (event: Partial<BaseEvent>) => {
    setSelectedEvent(event);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Notes Badge Example
      </Typography>

      <Typography variant="body1" paragraph>
        Events can have notes attached to them. Enable the notes badge to see a visual indicator 
        when an event has notes. This helps users quickly identify which events have additional 
        information without having to click on each one.
      </Typography>

      <Alert severity="info" sx={{ mb: 2 }}>
        <Typography variant="body2">
          Events with the note icon have additional notes. Click on any event to see its details below.
        </Typography>
      </Alert>

      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
        <FormControlLabel
          control={
            <Switch
              checked={showNotesBadge}
              onChange={(e) => setShowNotesBadge(e.target.checked)}
            />
          }
          label="Show Notes Badge"
          sx={{ mb: 2 }}
        />

        <TimeScheduler
          resources={resources}
          events={events}
          timeSchedulerDate={new Date()}
          onEventClick={handleEventClick}
          showNotesBadge={showNotesBadge}
        />
      </Paper>

      {selectedEvent && (
        <Alert 
          severity={selectedEvent.notes ? "success" : "info"} 
          sx={{ mb: 3 }}
        >
          <Stack spacing={1}>
            <Typography variant="subtitle2">
              <strong>Selected Event:</strong> {selectedEvent.title || 'Empty Slot'}
            </Typography>
            {selectedEvent.notes && (
              <Box>
                <Typography variant="subtitle2">
                  <strong>Notes:</strong>
                </Typography>
                <Typography variant="body2">
                  {selectedEvent.notes}
                </Typography>
              </Box>
            )}
            {!selectedEvent.notes && selectedEvent.id && (
              <Typography variant="body2" color="text.secondary">
                This event has no notes attached.
              </Typography>
            )}
          </Stack>
        </Alert>
      )}

      <Typography variant="h6" gutterBottom>
        Features Demonstrated
      </Typography>
      
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Chip label="Visual indicator for events with notes" size="small" />
        <Chip label="Toggle notes badge on/off" size="small" />
        <Chip label="Mix of events with and without notes" size="small" />
      </Stack>

      <Typography variant="h6" gutterBottom>
        Code Example
      </Typography>

      <pre>
{`import { TimeScheduler } from '@auauwolff/react-time-scheduler';

const events = [
  {
    id: '1',
    resourceId: '1',
    title: 'Team Meeting',
    start: '2024-01-15T09:00:00',
    end: '2024-01-15T10:00:00',
    notes: 'Discuss Q1 goals and project timeline', // This will show badge
  },
  {
    id: '2',
    resourceId: '2',
    title: 'Training',
    start: '2024-01-15T14:00:00',
    end: '2024-01-15T16:00:00',
    // No notes - no badge will show
  },
];

<TimeScheduler
  resources={resources}
  events={events}
  timeSchedulerDate={new Date()}
  onEventClick={handleEventClick}
  showNotesBadge={true} // Enabled by default, set to false to disable
/>`}
      </pre>
    </Box>
  );
}

export default NotesBadgeExample;