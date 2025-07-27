import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Paper,
  Chip,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeIcon from '@mui/icons-material/Code';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// Import examples
import BasicExample from './examples/BasicExample';
import CustomStylingExample from './examples/CustomStylingExample';
import InteractiveExample from './examples/InteractiveExample';
import AdvancedExample from './examples/AdvancedExample';
import Installation from './components/Installation';
import ApiReference from './components/ApiReference';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function App() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <CalendarMonthIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            React Time Scheduler
          </Typography>
          <Button 
            color="inherit" 
            startIcon={<CodeIcon />}
            href="https://www.npmjs.com/package/@auauwolff/react-time-scheduler"
            target="_blank"
          >
            NPM
          </Button>
          <IconButton
            color="inherit"
            href="https://github.com/auauwolff/react-time-scheduler"
            target="_blank"
            size="large"
          >
            <GitHubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom align="center">
            React Time Scheduler
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary">
            A flexible and customizable resource scheduling component for React
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 4 }}>
            <Chip label="TypeScript" color="primary" variant="outlined" />
            <Chip label="Material-UI" color="primary" variant="outlined" />
            <Chip label="Customizable" color="primary" variant="outlined" />
            <Chip label="Timezone Support" color="primary" variant="outlined" />
          </Box>
        </Box>

        <Paper elevation={0} sx={{ borderRadius: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Installation" icon={<CodeIcon />} iconPosition="start" />
            <Tab label="Basic Example" icon={<PlayArrowIcon />} iconPosition="start" />
            <Tab label="Custom Styling" />
            <Tab label="Interactive Demo" />
            <Tab label="Advanced Features" />
            <Tab label="API Reference" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Installation />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <BasicExample />
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <CustomStylingExample />
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <InteractiveExample />
          </TabPanel>

          <TabPanel value={tabValue} index={4}>
            <AdvancedExample />
          </TabPanel>

          <TabPanel value={tabValue} index={5}>
            <ApiReference />
          </TabPanel>
        </Paper>
      </Container>
    </Box>
  );
}

export default App;