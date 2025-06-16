'use client';

import { useSearchParams } from 'next/navigation';
import CreerbusinessCompte from '../../components/business/CreerbusinessCompte';

export default function CreerCompteBusinessPage() {
  const searchParams = useSearchParams();
  const demande = searchParams.get('demande');

  return (
    <CreerbusinessCompte />
  );
}
