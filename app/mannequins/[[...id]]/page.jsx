import React from 'react'

import All_models from '../../../components/models/All_models'

import All_afrodite from '../../../components/models/All_afrodites'


function Modeles() {
  return (
    <>
    {/* <Header_menu data ={{ link : 'mannequin' }}/> */}
    {/* <Header_menu data ={{ link : 'mannequins' }} /> */}
  
<div className="container bgt_container">
<All_afrodite data ={{ link : 'mannequins' }}/>

<div className="">
      <All_models />          
</div>
</div>
  
       

{/* <FixedMenu/> */}
</>
  )
}

export default Modeles