import { GetServerSideProps } from 'next';
import * as React from "react"
 
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from 'next/link';
 

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
    <div className='ticketmaster-cont'>
      <h1>Ticketmaster Events</h1>
      <div className="ticketmaster-events">
        {events.length > 0 ? (
            events.map((event, index) => (
            <div className="event" key={index}>
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className='line-clamp-1'>{event.name}</CardTitle>
        <CardDescription>{event.dates.start.localDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <img 
          src={event.images[0].url}
          alt={event.name}
          className="object-cover w-full h-48"
         />
      </CardContent>
      <CardFooter className="flex justify-between">
      <Link href={event.url} className={buttonVariants({ variant: "outline" })}>View Event</Link>
      <Link href={event.url} className={buttonVariants({ variant: "secondary" })}>More Details</Link>

      </CardFooter>
    </Card>
            </div>
            ))
        ) : (
            <p>No events found for the selected city.</p>
        )}
      </div>


  

    </div>
  );
};

export default Home;
