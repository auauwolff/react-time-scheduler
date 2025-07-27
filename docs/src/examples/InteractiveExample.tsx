import { useState } from 'react';
import { TimeScheduler } from '../../../src';
import type { BaseResource, BaseEvent } from '../../../src';
import { 
  Box, 
  Typography, 
  Paper,
  Button,
  Stack,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Switch,
  FormControlLabel,
  Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { addWeeks, subWeeks, format, addHours } from 'date-fns';

function InteractiveExample() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showSideBar, setShowSideBar] = useState(true);
  const [timezone, setTimezone] = useState('America/New_York');
  
  const [resources, setResources] = useState<BaseResource[]>([
    { id: '1', name: 'Resource 1', color: '#3788d8' },
    { id: '2', name: 'Resource 2', color: '#f44336' },
  ]);
  
  const [events, setEvents] = useState<BaseEvent[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Partial<BaseEvent> | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  // Form state
  const [eventTitle, setEventTitle] = useState('');
  const [eventResourceId, setEventResourceId] = useState('');
  const [eventDuration, setEventDuration] = useState(8);

  const handleEventClick = (event: Partial<BaseEvent>, date: Date) => {
    if (event.id) {
      // Existing event - edit mode
      setSelectedEvent(event);
      setEventTitle(event.title || '');
      setEventResourceId(event.resourceId || '');
      const duration = event.start && event.end
        ? (new Date(event.end).getTime() - new Date(event.start).getTime()) / (1000 * 60 * 60)
        : 8;
      setEventDuration(duration);
    } else {
      // New event
      setSelectedEvent(null);
      setEventTitle('');
      setEventResourceId(event.resourceId || '');
      setEventDuration(8);
    }
    setSelectedDate(date);
    setDialogOpen(true);
  };

  const handleSaveEvent = () => {
    if (!selectedDate || !eventResourceId || !eventTitle) return;

    const startDate = selectedDate;
    const endDate = addHours(startDate, eventDuration);

    if (selectedEvent?.id) {
      // Update existing event
      setEvents(events.map(e => 
        e.id === selectedEvent.id
          ? {
              ...e,
              title: eventTitle,
              resourceId: eventResourceId,
              start: startDate.toISOString(),
              end: endDate.toISOString(),
            }
          : e
      ));
      setSnackbar({ open: true, message: 'Event updated successfully!' });
    } else {
      // Create new event
      const newEvent: BaseEvent = {
        id: `event-${Date.now()}`,
        resourceId: eventResourceId,
        title: eventTitle,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      };
      setEvents([...events, newEvent]);
      setSnackbar({ open: true, message: 'Event created successfully!' });
    }

    setDialogOpen(false);
    resetForm();
  };

  const handleDeleteEvent = () => {
    if (selectedEvent?.id) {
      setEvents(events.filter(e => e.id !== selectedEvent.id));
      setSnackbar({ open: true, message: 'Event deleted successfully!' });
      setDialogOpen(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setEventTitle('');
    setEventResourceId('');
    setEventDuration(8);
    setSelectedEvent(null);
    setSelectedDate(null);
  };

  const addNewResource = () => {
    const newResource: BaseResource = {
      id: `resource-${Date.now()}`,
      name: `Resource ${resources.length + 1}`,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
    };
    setResources([...resources, newResource]);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Interactive Demo
      </Typography>
      
      <Typography variant="body1" paragraph>
        Try out the scheduler with full CRUD operations. Click on any cell to create or edit events.
      </Typography>

      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" spacing={2} mb={2} alignItems="center" flexWrap="wrap">
          <Button 
            variant="outlined"
            onClick={() => setCurrentDate(subWeeks(currentDate, 1))}
          >
            Previous
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
            Next
          </Button>

          <Box sx={{ flexGrow: 1 }} />

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Timezone</InputLabel>
            <Select
              value={timezone}
              label="Timezone"
              onChange={(e) => setTimezone(e.target.value)}
            >
              <MenuItem value="UTC">UTC</MenuItem>
              <MenuItem value="America/New_York">New York</MenuItem>
              <MenuItem value="Europe/London">London</MenuItem>
              <MenuItem value="Asia/Tokyo">Tokyo</MenuItem>
              <MenuItem value="Australia/Sydney">Sydney</MenuItem>
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Switch
                checked={showSideBar}
                onChange={(e) => setShowSideBar(e.target.checked)}
              />
            }
            label="Sidebar"
          />

          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={addNewResource}
          >
            Add Resource
          </Button>
        </Stack>

        <TimeScheduler
          resources={resources}
          events={events}
          timeSchedulerDate={currentDate}
          onEventClick={handleEventClick}
          timezone={timezone}
          showSideBar={showSideBar}
          sideBarHeader={
            <Typography variant="subtitle2">Total Events</Typography>
          }
          renderSideBar={(resource) => (
            <Typography variant="h6" align="center">
              {events.filter(e => e.resourceId === resource.id).length}
            </Typography>
          )}
        />
      </Paper>

      {/* Event Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedEvent?.id ? 'Edit Event' : 'Create Event'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Event Title"
              fullWidth
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              autoFocus
            />
            
            <FormControl fullWidth>
              <InputLabel>Resource</InputLabel>
              <Select
                value={eventResourceId}
                label="Resource"
                onChange={(e) => setEventResourceId(e.target.value)}
              >
                {resources.map(resource => (
                  <MenuItem key={resource.id} value={resource.id}>
                    {resource.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Duration (hours)"
              type="number"
              fullWidth
              value={eventDuration}
              onChange={(e) => setEventDuration(Number(e.target.value))}
              inputProps={{ min: 1, max: 24 }}
            />

            {selectedDate && (
              <Typography variant="body2" color="text.secondary">
                Date: {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              </Typography>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          {selectedEvent?.id && (
            <Button
              onClick={handleDeleteEvent}
              color="error"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleSaveEvent} 
            variant="contained"
            disabled={!eventTitle || !eventResourceId}
          >
            {selectedEvent?.id ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity="success" onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Typography variant="h6" gutterBottom>
        Features in this Demo
      </Typography>
      
      <Stack spacing={1}>
        <Chip label="Create events by clicking empty cells" size="small" />
        <Chip label="Edit events by clicking existing events" size="small" />
        <Chip label="Delete events" size="small" />
        <Chip label="Add new resources dynamically" size="small" />
        <Chip label="Change timezone" size="small" />
        <Chip label="Toggle sidebar" size="small" />
      </Stack>
    </Box>
  );
}

export default InteractiveExample;