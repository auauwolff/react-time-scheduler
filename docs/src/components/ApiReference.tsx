import { 
  Box, 
  Typography, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Divider,
} from '@mui/material';

function ApiReference() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        API Reference
      </Typography>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        TimeScheduler Props
      </Typography>

      <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Prop</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Required</TableCell>
              <TableCell>Default</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell><code>resources</code></TableCell>
              <TableCell><code>TResource[]</code></TableCell>
              <TableCell><Chip label="Yes" size="small" color="error" /></TableCell>
              <TableCell>-</TableCell>
              <TableCell>Array of resources to display</TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell><code>events</code></TableCell>
              <TableCell><code>TEvent[]</code></TableCell>
              <TableCell><Chip label="Yes" size="small" color="error" /></TableCell>
              <TableCell>-</TableCell>
              <TableCell>Array of events/shifts to display</TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell><code>timeSchedulerDate</code></TableCell>
              <TableCell><code>Date</code></TableCell>
              <TableCell><Chip label="Yes" size="small" color="error" /></TableCell>
              <TableCell>-</TableCell>
              <TableCell>The date to display (week calculated from this)</TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell><code>onEventClick</code></TableCell>
              <TableCell><code>(event: Partial&lt;TEvent&gt;, date: Date) =&gt; void</code></TableCell>
              <TableCell><Chip label="Yes" size="small" color="error" /></TableCell>
              <TableCell>-</TableCell>
              <TableCell>Callback when event or empty slot is clicked</TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell><code>timezone</code></TableCell>
              <TableCell><code>string</code></TableCell>
              <TableCell><Chip label="No" size="small" /></TableCell>
              <TableCell>'UTC'</TableCell>
              <TableCell>Timezone for displaying dates</TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell><code>weekStartsOn</code></TableCell>
              <TableCell><code>0-6</code></TableCell>
              <TableCell><Chip label="No" size="small" /></TableCell>
              <TableCell>1 (Monday)</TableCell>
              <TableCell>Day the week starts on</TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell><code>timeSchedulerDateFormat</code></TableCell>
              <TableCell><code>DateFormats</code></TableCell>
              <TableCell><Chip label="No" size="small" /></TableCell>
              <TableCell>'EEEE dd/MM'</TableCell>
              <TableCell>Format for day headers</TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell><code>rowHeight</code></TableCell>
              <TableCell><code>number</code></TableCell>
              <TableCell><Chip label="No" size="small" /></TableCell>
              <TableCell>60</TableCell>
              <TableCell>Height of each resource row (px)</TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell><code>colWidth</code></TableCell>
              <TableCell><code>number</code></TableCell>
              <TableCell><Chip label="No" size="small" /></TableCell>
              <TableCell>213</TableCell>
              <TableCell>Width of each day column (px)</TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell><code>headerHeight</code></TableCell>
              <TableCell><code>number</code></TableCell>
              <TableCell><Chip label="No" size="small" /></TableCell>
              <TableCell>30</TableCell>
              <TableCell>Height of header rows (px)</TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell><code>showNotesBadge</code></TableCell>
              <TableCell><code>boolean</code></TableCell>
              <TableCell><Chip label="No" size="small" /></TableCell>
              <TableCell>true</TableCell>
              <TableCell>Show badge indicator on events with notes</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom>
        Render Props
      </Typography>

      <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Prop</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell><code>renderHeader</code></TableCell>
              <TableCell><code>ReactNode</code></TableCell>
              <TableCell>Custom header component</TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell><code>resourcesHeader</code></TableCell>
              <TableCell><code>ReactNode</code></TableCell>
              <TableCell>Custom resources column header</TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell><code>renderResources</code></TableCell>
              <TableCell><code>(resource: TResource) =&gt; JSX.Element</code></TableCell>
              <TableCell>Custom resource renderer</TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell><code>showSideBar</code></TableCell>
              <TableCell><code>boolean</code></TableCell>
              <TableCell>Show sidebar column</TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell><code>sideBarHeader</code></TableCell>
              <TableCell><code>ReactNode</code></TableCell>
              <TableCell>Sidebar header content</TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell><code>renderSideBar</code></TableCell>
              <TableCell><code>(resource: TResource) =&gt; JSX.Element</code></TableCell>
              <TableCell>Custom sidebar content for each resource</TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell><code>showFooter</code></TableCell>
              <TableCell><code>boolean</code></TableCell>
              <TableCell>Show footer row</TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell><code>renderFooterCells</code></TableCell>
              <TableCell><code>(day: DayInfo | null) =&gt; JSX.Element</code></TableCell>
              <TableCell>Custom footer cells for each day</TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell><code>sideBarFooter</code></TableCell>
              <TableCell><code>ReactNode</code></TableCell>
              <TableCell>Sidebar footer content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom>
        Type Definitions
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        BaseResource
      </Typography>
      
      <pre>
{`interface BaseResource {
  id: string;
  name: string;
  color: string;
  organizationId?: string;
}`}
      </pre>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        BaseEvent
      </Typography>
      
      <pre>
{`interface BaseEvent {
  id: string;
  resourceId: string;
  organizationId?: string;
  start: string | Date;
  end: string | Date;
  title: string;
  breakMinutes?: number;
  isUnavailable?: boolean;
  notes?: string;
}`}
      </pre>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        DateFormats
      </Typography>
      
      <pre>
{`type DateFormats =
  | "dd/MM/yyyy"
  | "MM/dd/yyyy"
  | "yyyy/MM/dd"
  | "yyyy/dd/MM"
  | "dd/MM/yyyy HH:mm:ss"
  | "MM/dd/yyyy HH:mm:ss"
  | "yyyy/MM/dd HH:mm:ss"
  | "yyyy/dd/MM HH:mm:ss"
  | "dd/MM"
  | "MM/dd"
  | "yyyy/MM"
  | "yyyy/dd"
  | "dd/MM HH:mm:ss"
  | "MM/dd HH:mm:ss"
  | "yyyy/MM HH:mm:ss"
  | "yyyy/dd HH:mm:ss"
  | "EEEE dd/MM";`}
      </pre>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom>
        Generic Types
      </Typography>

      <Typography variant="body1" paragraph>
        The TimeScheduler component supports generic types for resources and events, 
        allowing you to extend the base interfaces with your own properties:
      </Typography>

      <pre>
{`// Define your extended types
interface MyResource extends BaseResource {
  department: string;
  skills: string[];
}

interface MyEvent extends BaseEvent {
  priority: 'low' | 'medium' | 'high';
  client: string;
}

// Use with TimeScheduler
<TimeScheduler<MyResource, MyEvent>
  resources={myResources}
  events={myEvents}
  // Full type safety with your custom properties
/>`}
      </pre>
    </Box>
  );
}

export default ApiReference;