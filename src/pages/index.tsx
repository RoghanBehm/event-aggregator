import { GetServerSideProps } from 'next';
import * as React from "react"
import { useIsTruncated } from '../lib/useIsTruncated';
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Toggle } from "@/components/ui/toggle"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import { useRef } from 'react';
import { useState } from 'react';
 

/* import { Balancer } from 'react-wrap-balancer' */


interface Image {
  ratio: string;
  url: string;
  width: number;
  height: number;
  fallback: boolean;
}

interface Event {
  name: string;
  dates: {
    start: {
      localDate: string;
    };
  };
  url: string;
  images: Image[];
}

interface HomeProps {
  events: Event[];
}


/*Ticketmaster API */
export const getServerSideProps: GetServerSideProps = async () => {
  const city = 'Brisbane';  // Temp hardcoded value
  const response = await fetch(`http://localhost:3000/api/ticketmaster?city=${encodeURIComponent(city)}`);

  if (!response.ok) {
    return { props: { events: [] } };  // Handle error case
  }

  const data = await response.json();
  return {
    props: {
      events: data._embedded?.events || [],
    },
  };
};




const Home: React.FC<HomeProps> = ({ events }) => {
  return (
    <div className="ticketmaster-cont">
      <h1>Ticketmaster Events</h1>
      <div className="ticketmaster-events">
        {events.length > 0 ? (
          events.map((event, index) => <EventCard key={index} event={event} />)
        ) : (
          <p>No events found for the selected city.</p>
        )}
      </div>
    </div>
  );
};

const EventCard: React.FC<{ event: Event }> = ({ event }) => {

  const [isClassRemoved, setIsClassRemoved] = useState(false);

  const handleToggleClick = () => {
    setIsClassRemoved(prev => !prev); // Toggle state (bool)
  };

  const titleRef = useRef<HTMLHeadingElement>(null);
  const isTruncated = useIsTruncated(titleRef); // Hook to check if the text is truncated

  return (
    <Card className="event w-[350px] h-auto">
    <CardHeader>
      {/* Applying the ref to the DOM element through CardTitle */}
      <div className="top-row relative">
        <CardTitle ref={titleRef}  className={`ticketmaster-title ${!isClassRemoved ? 'line-clamp-1' : ''}`}>
          {event.name}
        </CardTitle>

        {/* Conditionally render toggle if text is truncated */}
        {isTruncated && (
          <Toggle 
            aria-label="Toggle bold" 
            className="absolute right-0 top-1/2 transform -translate-y-1/2" 
            onClick={handleToggleClick}
            data-state={isClassRemoved ? "on" : "off"}
          >
            <ChevronDownIcon className="h-4 w-4" />
          </Toggle>
        )}
      </div>

        
        <CardDescription>
          {event.dates.start.localDate}


        </CardDescription>
        
      </CardHeader>
      <CardContent>
        <img
          src={event.images[0].url}
          alt={event.name}
          className="object-cover w-full h-48"
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={event.url} className={buttonVariants({ variant: 'outline' })}>
          View Event
        </Link>
        <Link href={event.url} className={buttonVariants({ variant: 'secondary' })}>
          More Details
        </Link>
      </CardFooter>
    </Card>
  );
};





export default Home;
