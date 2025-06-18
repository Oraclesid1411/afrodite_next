// app/event/[id]/page.jsx
'use client';

import { useParams } from 'next/navigation';
// import EventDetail from '../../../components/EventDetail'; // adapte le chemin selon ton projet
import EventDetail from '../../../components/events/EventDetail';
const EventDetailPage = () => {
  const { id } = useParams(); // récupère l'ID de l'URL

  return (
    <div>
      <EventDetail eventId={id} />
    </div>
  );
};

export default EventDetailPage;
