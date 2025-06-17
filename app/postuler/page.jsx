'use client';

import { useSearchParams } from 'next/navigation';
// import PostulerModels from '../../components/postuler/Postuler_models';
import PostulerModels from "../../components/postuler/postuler_models.jsx"


export default function PostulerPage() {
  const searchParams = useSearchParams();
  const demande = searchParams.get('demande');

  return (
    <PostulerModels demande = {demande} />
  );
}
