import { useState } from "react";
import { TimeScheduler } from "../../../src";
import type { BaseResource, BaseEvent } from "../../../src";
import { Box, Typography, Paper, Alert, Button, Stack } from "@mui/material";
import { addWeeks, subWeeks } from "date-fns";

const sampleResources: BaseResource[] = [
  {
    id: "1",
    name: "John Doe",
    color: "#3788d8",
  },
  {
    id: "2",
    name: "Jane Smith",
    color: "#f44336",
  },
  {
    id: "3",
    name: "Bob Johnson",
    color: "#4caf50",
  },
];

const sampleEvents: BaseEvent[] = [
  {
    id: "shift-1",
    resourceId: "1",
    title: "Morning Shift",
    start: new Date().toISOString(),
    end: new Date(new Date().setHours(new Date().getHours() + 8)).toISOString(),
  },
  {
    id: "shift-2",
    resourceId: "2",
    title: "Afternoon Shift",
    start: new Date(new Date().setHours(14)).toISOString(),
    end: new Date(new Date().setHours(22)).toISOString(),
  },
];

function BasicExample() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Partial<BaseEvent> | null>(
    null
  );

  const handleEventClick = (
    event: Partial<BaseEvent>,
    dateSlotSelected: Date
  ) => {
    setSelectedEvent(event);
    console.log("Event clicked:", event, "Date:", dateSlotSelected);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Basic Example
      </Typography>

      <Typography variant="body1" paragraph>
        This example shows the basic usage of the TimeScheduler component with
        minimal configuration.
      </Typography>

      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" spacing={2} mb={2}>
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
          events={sampleEvents}
          timeSchedulerDate={currentDate}
          onEventClick={handleEventClick}
        />
      </Paper>

      {selectedEvent && (
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="subtitle2">
            Selected: {selectedEvent.title || "Empty Slot"}
            {selectedEvent.id && ` (ID: ${selectedEvent.id})`}
          </Typography>
        </Alert>
      )}

      <Typography variant="h6" gutterBottom>
        Code
      </Typography>

      <pre>
        {`import { TimeScheduler } from '@auauwolff/react-time-scheduler';

const resources = [
  { id: '1', name: 'John Doe', color: '#3788d8' },
  { id: '2', name: 'Jane Smith', color: '#f44336' },
  { id: '3', name: 'Bob Johnson', color: '#4caf50' },
];

const events = [
  {
    id: 'shift-1',
    resourceId: '1',
    title: 'Morning Shift',
    start: '2024-01-15T09:00:00',
    end: '2024-01-15T17:00:00',
  },
];

<TimeScheduler
  resources={resources}
  events={events}
  timeSchedulerDate={new Date()}
  onEventClick={(event, date) => console.log(event, date)}
/>`}
      </pre>
    </Box>
  );
}

export default BasicExample;
