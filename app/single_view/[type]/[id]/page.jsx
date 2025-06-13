'use client';

import { use } from 'react';
import React from 'react';
import SingleView from '../../../../components/models/SingleView'; // ton composant d'affichage
import { notFound } from 'next/navigation';
// import { useParams , usePathname  } from "next/navigation";

export default function SingleViewPage({ params }) {
 
const resolvedParams = use(params); // déstructure proprement la Promise
const { type, id } = resolvedParams;

  console.log(id)
  console.log(type)
  console.log("params" )
  console.log(params )
  // Tu peux ici filtrer selon le type pour charger la bonne source
  if (!["1", "2", "3"].includes(type)) {
    notFound(); // gestion 404
  }

  return (
    <div className="container bgt_container">
      <SingleView type={type} id={id} />
    </div>
  );
}
