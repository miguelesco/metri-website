import React from "react";
import { Button, Timeline } from "flowbite-react";
import { HiArrowNarrowRight, HiCalendar } from "react-icons/hi";

interface TimelineItemProps {
    time: string;
    title: string;
    body: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ time, title, body }) => (
    <Timeline.Item >
        <Timeline.Point icon={HiCalendar} />
        <Timeline.Content>
            <Timeline.Time className="left-8 relative">{time}</Timeline.Time>
            <Timeline.Title>{title}</Timeline.Title>
            <Timeline.Body>{body}</Timeline.Body>
            <Button color="gray">
                Learn More
                <HiArrowNarrowRight className="ml-2 h-3 w-3" />
            </Button>
        </Timeline.Content>
    </Timeline.Item>
);

 const Component: React.FC = () => (
    <Timeline className="p-5">
        <TimelineItem
            time="February 2022"
            title="Application UI code in Tailwind CSS"
            body="Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages."
        />
        <TimelineItem
            time="March 2022"
            title="Marketing UI design in Figma"
            body="All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project."
        />
        <TimelineItem
            time="April 2022"
            title="E-Commerce UI code in Tailwind CSS"
            body="Get started with dozens of web components and interactive elements built on top of Tailwind CSS."
        />
    </Timeline>
);

export default Component;