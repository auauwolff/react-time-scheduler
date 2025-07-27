import { Box, Typography, Paper, Tabs, Tab, Alert } from '@mui/material';
import { useState } from 'react';

function Installation() {
  const [tab, setTab] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Getting Started
      </Typography>
      
      <Typography variant="body1" paragraph>
        React Time Scheduler is a flexible resource scheduling component that makes it easy to create
        beautiful scheduling interfaces for your React applications.
      </Typography>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Installation
      </Typography>

      <Paper variant="outlined" sx={{ mb: 3 }}>
        <Tabs value={tab} onChange={handleChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="npm" />
          <Tab label="yarn" />
          <Tab label="pnpm" />
        </Tabs>
        
        <Box sx={{ p: 2 }}>
          {tab === 0 && (
            <pre>npm install @auauwolff/react-time-scheduler</pre>
          )}
          {tab === 1 && (
            <pre>yarn add @auauwolff/react-time-scheduler</pre>
          )}
          {tab === 2 && (
            <pre>pnpm add @auauwolff/react-time-scheduler</pre>
          )}
        </Box>
      </Paper>

      <Alert severity="info" sx={{ mb: 3 }}>
        Note: This package is currently available as a private GitHub repository. 
        For public NPM installation, use: <code>npm install github:auauwolff/react-time-scheduler</code>
      </Alert>

      <Typography variant="h5" gutterBottom>
        Peer Dependencies
      </Typography>
      
      <Typography variant="body1" paragraph>
        Make sure you have the following peer dependencies installed:
      </Typography>

      <pre>
{`npm install react react-dom @mui/material @emotion/react @emotion/styled date-fns date-fns-tz`}
      </pre>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Basic Usage
      </Typography>

      <pre>
{`import { TimeScheduler } from '@auauwolff/react-time-scheduler';
import type { BaseResource, BaseEvent } from '@auauwolff/react-time-scheduler';

const resources: BaseResource[] = [
  {
    id: '1',
    name: 'John Doe',
    color: '#3788d8',
  },
];

const events: BaseEvent[] = [
  {
    id: 'event-1',
    resourceId: '1',
    title: 'Morning Shift',
    start: '2024-01-15T09:00:00',
    end: '2024-01-15T17:00:00',
  },
];

function App() {
  return (
    <TimeScheduler
      resources={resources}
      events={events}
      timeSchedulerDate={new Date()}
      onEventClick={(event, date) => console.log(event, date)}
    />
  );
}`}
      </pre>
    </Box>
  );
}

export default Installation;