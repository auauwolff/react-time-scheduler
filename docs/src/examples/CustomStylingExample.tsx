import { useState } from 'react';
import { TimeScheduler } from '../../../src';
import type { BaseResource, BaseEvent } from '../../../src';
import { 
  Box, 
  Typography, 
  Paper, 
  Avatar, 
  Chip,
  Stack,
  LinearProgress,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface ExtendedResource extends BaseResource {
  role: string;
  avatar: string;
}

const resources: ExtendedResource[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    color: '#1976d2',
    role: 'Senior Developer',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Mike Chen',
    color: '#9c27b0',
    role: 'UI/UX Designer',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: '3',
    name: 'Emily Davis',
    color: '#f57c00',
    role: 'Project Manager',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
];

const events: BaseEvent[] = [
  {
    id: '1',
    resourceId: '1',
    title: 'Sprint Planning',
    start: new Date().toISOString(),
    end: new Date(new Date().setHours(new Date().getHours() + 2)).toISOString(),
  },
  {
    id: '2',
    resourceId: '2',
    title: 'Design Review',
    start: new Date(new Date().setHours(11)).toISOString(),
    end: new Date(new Date().setHours(13)).toISOString(),
  },
  {
    id: '3',
    resourceId: '3',
    title: 'Client Meeting',
    start: new Date(new Date().setHours(14)).toISOString(),
    end: new Date(new Date().setHours(16)).toISOString(),
  },
];

function CustomStylingExample() {
  const [currentDate] = useState(new Date());

  const calculateTotalHours = (resourceId: string) => {
    const resourceEvents = events.filter(e => e.resourceId === resourceId);
    const totalHours = resourceEvents.reduce((sum, event) => {
      const hours = (new Date(event.end).getTime() - new Date(event.start).getTime()) / (1000 * 60 * 60);
      return sum + hours;
    }, 0);
    return totalHours;
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Custom Styling Example
      </Typography>
      
      <Typography variant="body1" paragraph>
        This example demonstrates how to customize the appearance of the scheduler using render props.
      </Typography>

      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
        <TimeScheduler<ExtendedResource, BaseEvent>
          resources={resources}
          events={events}
          timeSchedulerDate={currentDate}
          onEventClick={(event, date) => console.log(event, date)}
          renderHeader={
            <Box sx={{ mb: 2, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>
                Team Schedule
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Weekly Sprint Overview
              </Typography>
            </Box>
          }
          resourcesHeader={
            <Stack direction="row" alignItems="center" spacing={1}>
              <PersonIcon fontSize="small" />
              <Typography variant="subtitle2">Team Members</Typography>
            </Stack>
          }
          renderResources={(resource) => (
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar 
                src={resource.avatar} 
                alt={resource.name}
                sx={{ width: 32, height: 32 }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2">{resource.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {resource.role}
                </Typography>
              </Box>
            </Stack>
          )}
          showSideBar={true}
          sideBarHeader={
            <Stack direction="row" alignItems="center" spacing={1}>
              <AccessTimeIcon fontSize="small" />
              <Typography variant="subtitle2">Hours</Typography>
            </Stack>
          }
          renderSideBar={(resource) => (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6">
                {calculateTotalHours(resource.id).toFixed(1)}h
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={(calculateTotalHours(resource.id) / 8) * 100} 
                sx={{ mt: 1 }}
              />
            </Box>
          )}
        />
      </Paper>

      <Typography variant="h6" gutterBottom>
        Key Features Demonstrated
      </Typography>
      
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Chip label="Custom Resource Rendering with Avatars" size="small" />
        <Chip label="Custom Headers" size="small" />
        <Chip label="Sidebar with Total Hours" size="small" />
        <Chip label="Progress Indicators" size="small" />
      </Stack>

      <Typography variant="h6" gutterBottom>
        Code
      </Typography>
      
      <pre style={{ fontSize: '0.875rem' }}>
{`<TimeScheduler
  resources={resources}
  events={events}
  timeSchedulerDate={currentDate}
  onEventClick={handleEventClick}
  renderResources={(resource) => (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar src={resource.avatar} />
      <Box>
        <Typography variant="subtitle2">{resource.name}</Typography>
        <Typography variant="caption">{resource.role}</Typography>
      </Box>
    </Stack>
  )}
  showSideBar={true}
  renderSideBar={(resource) => (
    <Box>
      <Typography variant="h6">
        {calculateTotalHours(resource.id)}h
      </Typography>
      <LinearProgress variant="determinate" value={...} />
    </Box>
  )}
/>`}
      </pre>
    </Box>
  );
}

export default CustomStylingExample;