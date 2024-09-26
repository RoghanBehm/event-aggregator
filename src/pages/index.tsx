import { GetServerSideProps } from 'next';

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
      <h1>Events in {events.length > 0 ? events[0].name : 'Your City'}</h1>
      <div className="ticketmaster-events">
        {events.length > 0 ? (
            events.map((event, index) => (
            <div className="event" key={index}>
                <h2 className='event-title'>{event.name}</h2>
                <p>{event.dates.start.localDate}</p>
                <a href={event.url} target="_blank" rel="noopener noreferrer">
                View Event
                </a>
                <img src={event.images[0].url} alt={event.name} />
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
