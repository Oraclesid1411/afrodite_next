'use client';

import { useSearchParams } from 'next/navigation';
import Create_franchise from '../../components/franchises/Create_franchise';

export default function CreerFranchisePage() {
  const searchParams = useSearchParams();
  const demande = searchParams.get('demande');

  return (

   <Create_franchise />
  );
}
