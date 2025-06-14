import React from 'react'

import All_hotesses from '../../../components/models/All_hotesses'

// import All_hotesses from './Hotesses/All_hotesses'
import All_afrodite from '../../../components/models/All_afrodites'


function Modeles() {
  return (
    <>
    {/* <Header_menu data ={{ link : 'mannequin' }}/> */}
    {/* <Header_menu data ={{ link : 'mannequins' }} /> */}
  
<div className="container bgt_container">
<All_afrodite data ={{ link : 'hotesses' }}/>

<div className="">
      <All_hotesses />          
</div>
</div>
  
       

{/* <FixedMenu/> */}
</>
  )
}

export default Modeles