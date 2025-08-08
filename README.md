# React Time Scheduler

A flexible and customizable React scheduler component for resource-based time management. Perfect for employee scheduling, appointment booking, resource allocation, and more.

![React Time Scheduler Demo](./docs/demo.png)

## Features

- 📅 Week-based view with customizable start day
- 👥 Resource-based scheduling (employees, rooms, equipment, etc.)
- 🎨 Fully customizable appearance with Material-UI
- 📱 Responsive design
- 🌍 Timezone support
- 🔧 TypeScript support
- ⚡ Lightweight and performant

## Installation

```bash
npm install react-time-scheduler
# or
yarn add react-time-scheduler
# or
pnpm add react-time-scheduler
```

### Peer Dependencies

Make sure you have the following peer dependencies installed:

```bash
npm install react react-dom @mui/material @mui/icons-material @emotion/react @emotion/styled date-fns date-fns-tz
```

## Quick Start

```tsx
import { TimeScheduler } from 'react-time-scheduler';
import type { BaseResource, BaseEvent } from 'react-time-scheduler';

// Define your resources (e.g., employees)
const resources: BaseResource[] = [
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
];

// Define your events (e.g., shifts)
const events: BaseEvent[] = [
  {
    id: 'shift-1',
    resourceId: '1',
    title: 'Morning Shift',
    start: '2024-01-15T09:00:00',
    end: '2024-01-15T17:00:00',
  },
];

function App() {
  const handleEventClick = (event: Partial<BaseEvent>, date: Date) => {
    console.log('Event clicked:', event, 'on date:', date);
  };

  return (
    <TimeScheduler
      resources={resources}
      events={events}
      timeSchedulerDate={new Date()}
      onEventClick={handleEventClick}
    />
  );
}
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `resources` | `TResource[]` | Yes | - | Array of resources to display |
| `events` | `TEvent[]` | Yes | - | Array of events/shifts to display |
| `timeSchedulerDate` | `Date` | Yes | - | The date to display (week will be calculated from this) |
| `onEventClick` | `(event: Partial<TEvent>, date: Date) => void` | Yes | - | Callback when an event or empty slot is clicked |
| `timezone` | `string` | No | `'UTC'` | Timezone for displaying dates |
| `weekStartsOn` | `0-6` | No | `1` (Monday) | Day the week starts on |
| `timeSchedulerDateFormat` | `DateFormats` | No | `'EEEE dd/MM'` | Format for day headers |
| `rowHeight` | `number` | No | `60` | Height of each resource row |
| `colWidth` | `number` | No | `213` | Width of each day column |
| `headerHeight` | `number` | No | `30` | Height of header rows |
| `renderHeader` | `ReactNode` | No | - | Custom header component |
| `renderResources` | `(resource: TResource) => JSX.Element` | No | - | Custom resource renderer |
| `showSideBar` | `boolean` | No | `false` | Show sidebar |
| `renderSideBar` | `(resource: TResource) => JSX.Element` | No | - | Custom sidebar content |
| `showFooter` | `boolean` | No | `false` | Show footer |
| `renderFooterCells` | `(day) => JSX.Element` | No | - | Custom footer cells |
| `showNotesBadge` | `boolean` | No | `true` | Show badge indicator on events with notes |

## Data Types

### BaseResource

```typescript
interface BaseResource {
  id: string;
  name: string;
  color: string;
  organizationId?: string;
}
```

### BaseEvent

```typescript
interface BaseEvent {
  id: string;
  resourceId: string;
  organizationId?: string;
  start: string | Date;
  end: string | Date;
  title: string;
  breakMinutes?: number;
  isUnavailable?: boolean;
  notes?: string;
}
```

## Advanced Usage

### Custom Resource Rendering

```tsx
<TimeScheduler
  resources={resources}
  events={events}
  timeSchedulerDate={selectedDate}
  onEventClick={handleEventClick}
  renderResources={(resource) => (
    <Box display="flex" alignItems="center" gap={1}>
      <Avatar src={resource.avatar} />
      <Typography>{resource.name}</Typography>
      <Chip label={resource.role} size="small" />
    </Box>
  )}
/>
```

### With Sidebar and Footer

```tsx
<TimeScheduler
  resources={resources}
  events={events}
  timeSchedulerDate={selectedDate}
  onEventClick={handleEventClick}
  showSideBar={true}
  sideBarHeader={<Typography>Total Hours</Typography>}
  renderSideBar={(resource) => (
    <Typography>{calculateTotalHours(resource.id)}</Typography>
  )}
  showFooter={true}
  renderFooterCells={(day) => (
    <Typography>${calculateDailyCost(day.date)}</Typography>
  )}
/>
```

## Styling

The component uses Material-UI and can be themed using MUI's theming system:

```tsx
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

<ThemeProvider theme={theme}>
  <TimeScheduler {...props} />
</ThemeProvider>
```

## Documentation

📖 **[View Live Documentation](https://auauwolff.github.io/react-time-scheduler/)**

The documentation includes:

- Interactive examples
- API reference
- Live playground
- Advanced usage patterns

## Examples

Check out the [documentation site](https://auauwolff.github.io/react-time-scheduler/) for live examples:

- Basic usage
- Custom styling
- Interactive demo with CRUD operations
- Advanced features (cost calculations, custom types)

## Contributing

We love contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to get started.

### Quick Start for Contributors

```bash
# Fork and clone the repo
git clone https://github.com/YOUR_USERNAME/react-time-scheduler.git
cd react-time-scheduler

# Install dependencies
pnpm install

# Start development
pnpm run dev

# Run documentation locally
pnpm run docs:dev
```

### Ways to Contribute

- 🐛 [Report bugs](https://github.com/auauwolff/react-time-scheduler/issues/new?template=bug_report.md)
- 💡 [Request features](https://github.com/auauwolff/react-time-scheduler/issues/new?template=feature_request.md)
- 📝 Improve documentation
- 🔧 Submit pull requests

## Support

- 📧 Contact: [your-email@example.com]
- 💬 [Open an issue](https://github.com/auauwolff/react-time-scheduler/issues)
- 📖 [Read the docs](https://github.com/auauwolff/react-time-scheduler#readme)

## Contributors

Thanks to all our contributors!

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

MIT © auauwolff
