import { GetServerSideProps } from 'next';

interface Event {
  name: string;
  dates: {
    start: {
      localDate: string;
    };
  };
  url: string;
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
    <div>
      <h1>Events in {events.length > 0 ? events[0].name : 'Your City'}</h1>
      {events.length > 0 ? (
        events.map((event, index) => (
          <div key={index}>
            <h2>{event.name}</h2>
            <p>{event.dates.start.localDate}</p>
            <a href={event.url} target="_blank" rel="noopener noreferrer">
              View Event
            </a>
          </div>
        ))
      ) : (
        <p>No events found for the selected city.</p>
      )}
    </div>
  );
};

export default Home;
