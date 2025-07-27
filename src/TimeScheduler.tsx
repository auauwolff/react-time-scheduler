import { Paper, Typography, Box, LinearProgress } from "@mui/material";
import React, { JSX, RefObject } from "react";
import { addDays, format, isSameDay, startOfWeek } from "date-fns";
import { toZonedTime } from "date-fns-tz";

// Required interfaces for resources and events
export interface BaseResource {
  id: string;
  name: string;
  color: string;
  organizationId?: string;
}

export interface BaseEvent {
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

type DateFormats =
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
  | "EEEE dd/MM";

// Default configuration values
const DEFAULT_WEEK_STARTS_ON = 1; // Monday
const DEFAULT_ROW_HEIGHT = 60; // Height of each row in the scheduler
const DEFAULT_HEADER_HEIGHT = 30; // Height of the header row
const DEFAULT_COL_WIDTH = 213; // Width of each column in the scheduler
const DEFAULT_TIME_ZONE = "UTC"; // Default time zone

interface TimeSchedulerProps<
  TResource extends BaseResource = BaseResource,
  TEvent extends BaseEvent = BaseEvent
> {
  resources: TResource[] | undefined;
  events: TEvent[] | undefined;
  timeSchedulerDate: Date;
  timeSchedulerDateFormat?: DateFormats;
  onEventClick: (event: Partial<TEvent>, dateSlotSelected: Date) => void;
  renderHeader?: React.ReactNode;
  resourcesHeader?: React.ReactNode;
  renderResources?: (resource: TResource) => JSX.Element;
  showSideBar?: boolean;
  sideBarHeader?: React.ReactNode;
  renderSideBar?: (resource: TResource) => JSX.Element;
  showFooter?: boolean;
  renderFooterCells?: (
    day: { formattedDate: string; date: Date; isToday: boolean } | null
  ) => JSX.Element;
  sideBarFooter?: React.ReactNode;
  contentRef?: RefObject<HTMLDivElement | null>;

  // Configuration props with defaults
  timezone?: string;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  rowHeight?: number;
  colWidth?: number;
  headerHeight?: number;
}

const TimeScheduler = <
  TResource extends BaseResource = BaseResource,
  TEvent extends BaseEvent = BaseEvent
>({
  resources,
  events,
  timeSchedulerDate,
  timeSchedulerDateFormat = "EEEE dd/MM",
  onEventClick,
  renderHeader,
  resourcesHeader,
  renderResources,
  showSideBar,
  sideBarHeader,
  renderSideBar,
  showFooter,
  renderFooterCells,
  sideBarFooter,
  contentRef,

  // Configuration props with defaults
  timezone = DEFAULT_TIME_ZONE,
  weekStartsOn = DEFAULT_WEEK_STARTS_ON,
  rowHeight = DEFAULT_ROW_HEIGHT,
  colWidth = DEFAULT_COL_WIDTH,
  headerHeight = DEFAULT_HEADER_HEIGHT,
}: TimeSchedulerProps<TResource, TEvent>) => {
  // Convert all event dates to local time zone
  const localEvents = events?.map((event) => ({
    ...event,
    start: toZonedTime(new Date(event.start), timezone),
    end: toZonedTime(new Date(event.end), timezone),
  }));

  // Generate the days of the week based on the scheduler date
  const startOfCurrentWeek = startOfWeek(timeSchedulerDate, {
    weekStartsOn: weekStartsOn,
  });
  const timeSchedulerDays = Array.from({ length: 7 }, (_, i) => {
    if (!timeSchedulerDate) return null;

    const date = addDays(startOfCurrentWeek, i);
    const isToday = isSameDay(date, new Date());
    const formattedDate = format(date, timeSchedulerDateFormat);

    return {
      formattedDate,
      date,
      isToday,
    };
  });

  return (
    <Box>
      {!resources || !events ? (
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1100,
          }}
        >
          <LinearProgress color="primary" />
        </Box>
      ) : null}

      {/* Time Scheduler Container */}

      {/* Time Scheduler Header */}
      {renderHeader || (
        <Typography variant="h5" gutterBottom>
          Time Scheduler
        </Typography>
      )}

      {/* Main Scheduler container */}
      <Box ref={contentRef} sx={{ display: "flex", overflow: "hidden" }}>
        {/* Left fixed area (Resources) */}
        <Box sx={{ flexShrink: 0, minWidth: 160 }}>
          {/* Resources header */}
          <Box
            sx={{
              height: headerHeight,
              borderBottom: "1px solid #ddd",
              borderLeft: "1px solid #ddd",
              borderRight: "1px solid #ddd",
              borderTop: "1px solid #ddd",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              pl: 1,
              boxSizing: "border-box",
            }}
          >
            {resourcesHeader || <Typography>Resources</Typography>}
          </Box>

          {/* Resources rows */}
          {resources?.map((resource) => (
            <Box key={resource.id}>
              {renderResources ? (
                <Box
                  sx={{
                    px: 1,
                    borderBottom: "1px solid #ddd",
                    borderLeft: "1px solid #ddd",
                    borderRight: "1px solid #ddd",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: rowHeight,
                    boxSizing: "border-box",
                  }}
                >
                  {renderResources(resource)}
                </Box>
              ) : (
                <Box
                  sx={{
                    px: 1,
                    borderBottom: "1px solid #ddd",
                    borderLeft: "1px solid #ddd",
                    borderRight: "1px solid #ddd",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: resource.color,
                    height: rowHeight,
                    boxSizing: "border-box",
                  }}
                >
                  <Typography>{resource.name}</Typography>
                </Box>
              )}
            </Box>
          ))}

          {/* Footer row header - only visible if footer is enabled */}
          {showFooter && (
            <Box
              sx={{
                flexShrink: 0,
                height: headerHeight,
                borderBottom: "1px solid #ddd",
                borderLeft: "1px solid #ddd",
                borderRight: "1px solid #ddd",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                pl: 1,
                boxSizing: "border-box",
              }}
            >
              <Typography variant="body2">Wages</Typography>
            </Box>
          )}
        </Box>

        {/* Middle scrollable area (Days + Events + Footer) */}
        <Box sx={{ overflowX: "auto", overflowY: "hidden", width: "100%" }}>
          {/* Days header row */}
          <Box sx={{ display: "flex" }}>
            {timeSchedulerDays.map((day) => (
              <Box
                key={day?.formattedDate}
                sx={{
                  flex: 1,
                  minWidth: colWidth,
                  textAlign: "center",
                  borderTop: "1px solid #ddd",
                  borderBottom: "1px solid #ddd",
                  borderLeft: "1px solid #ddd",
                  "&:first-of-type": {
                    borderLeft: "none",
                  },
                  "&:last-child": {
                    borderRight: "1px solid #ddd",
                  },
                  height: headerHeight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxSizing: "border-box",
                }}
              >
                <Typography
                  variant="body1"
                  fontWeight={day?.isToday ? "bold" : "normal"}
                >
                  {day?.formattedDate}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Events Grid */}
          {resources?.map((resources) => (
            <Box sx={{ display: "flex" }} key={resources.id}>
              {timeSchedulerDays.map((day) => (
                <Box
                  key={`${resources.id}-${day?.formattedDate}`}
                  sx={{
                    flex: 1,
                    minWidth: colWidth,
                    borderBottom: "1px solid #ddd",
                    borderLeft: "1px solid #ddd",
                    "&:first-of-type": {
                      borderLeft: "none",
                    },
                    "&:last-child": {
                      borderRight: "1px solid #ddd",
                    },
                    height: rowHeight,
                    position: "relative",
                    boxSizing: "border-box",
                  }}
                >
                  {/* Entire cell clickable */}
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      bgcolor: "transparent",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Check if the cell is already occupied by an event
                      const eventSelected = localEvents?.find(
                        (event) =>
                          event.resourceId === resources.id &&
                          isSameDay(event.start, day?.date ?? new Date())
                      );

                      // If an event is found, parse it to the correct format
                      // and pass it to the onEventClick function
                      const parsedEventSelected: Partial<TEvent> = eventSelected
                        ? ({
                            ...eventSelected,
                            start: new Date(eventSelected.start).toISOString(),
                            end: new Date(eventSelected.end).toISOString(),
                          } as Partial<TEvent>)
                        : ({
                            resourceId: resources.id,
                            organizationId: resources.organizationId,
                            start: new Date(
                              day?.date ?? new Date()
                            ).toISOString(),
                            end: new Date(
                              day?.date ?? new Date()
                            ).toISOString(),
                            title: "",
                            breakMinutes: 30,
                          } as any as Partial<TEvent>);

                      const dateSlotSelected = day?.date ?? new Date();

                      onEventClick(parsedEventSelected, dateSlotSelected);
                    }}
                  >
                    {/* Render events for the specific resource and day */}
                    {localEvents
                      ?.filter(
                        (e) =>
                          e.resourceId === resources.id &&
                          isSameDay(e.start, day?.date ?? new Date())
                      )
                      .map((event) => (
                        <Paper
                          key={event.id}
                          sx={{
                            position: "absolute",
                            inset: 10,
                            bgcolor: resources.color,
                            p: 1,
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            color: "#fff",
                            "&:hover": {
                              boxShadow: 3,
                              transform: "scale(1.02)",
                              fontWeight: "bold",
                            },
                          }}
                        >
                          {event.title}
                        </Paper>
                      ))}
                  </Box>
                </Box>
              ))}
            </Box>
          ))}

          {/* Footer Cells for Each Day - only visible if footer is enabled */}
          {showFooter && (
            <Box sx={{ display: "flex" }}>
              {timeSchedulerDays.map((day) => (
                <Box
                  key={`footer-${day?.formattedDate}`}
                  sx={{
                    flex: 1,
                    minWidth: colWidth,
                    textAlign: "center",
                    borderBottom: "1px solid #ddd",
                    borderLeft: "1px solid #ddd",
                    "&:first-of-type": {
                      borderLeft: "none",
                    },
                    "&:last-child": {
                      borderRight: "1px solid #ddd",
                    },
                    height: headerHeight,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxSizing: "border-box",
                  }}
                >
                  {renderFooterCells ? (
                    renderFooterCells(day)
                  ) : (
                    <Typography variant="body2" fontWeight="medium">
                      {
                        localEvents?.filter((event) =>
                          isSameDay(event.start, day?.date ?? new Date())
                        ).length
                      }
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* Right fixed area (Sidebar) */}
        {showSideBar && (
          <Box sx={{ flexShrink: 0, minWidth: 160 }}>
            {/* Sidebar header */}
            <Box
              sx={{
                height: headerHeight,
                borderBottom: "1px solid #ddd",
                borderRight: "1px solid #ddd",
                borderTop: "1px solid #ddd",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                pl: 1,
                boxSizing: "border-box",
              }}
            >
              {sideBarHeader || <Typography>Side Bar Header</Typography>}
            </Box>

            {/* Sidebar rows */}
            {resources?.map((resource) => (
              <Box key={resource.id}>
                {renderSideBar ? (
                  <Box
                    sx={{
                      px: 1,
                      borderBottom: "1px solid #ddd",
                      borderRight: "1px solid #ddd",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      height: rowHeight,
                      boxSizing: "border-box",
                    }}
                  >
                    {renderSideBar(resource)}
                  </Box>
                ) : (
                  <Box
                    sx={{
                      px: 1,
                      borderBottom: "1px solid #ddd",
                      borderRight: "1px solid #ddd",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      color: resource.color,
                      height: rowHeight,
                      boxSizing: "border-box",
                    }}
                  >
                    <Typography>{resource.name}</Typography>
                  </Box>
                )}
              </Box>
            ))}

            {/* Footer sidebar total - only visible if footer is enabled */}
            {showFooter && (
              <Box
                sx={{
                  flexShrink: 0,
                  height: headerHeight,
                  borderBottom: "1px solid #ddd",
                  borderRight: "1px solid #ddd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                  pl: 1,
                  boxSizing: "border-box",
                }}
              >
                {sideBarFooter || (
                  <Typography variant="body2" fontWeight="bold">
                    Total
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TimeScheduler;
export type { TimeSchedulerProps };
