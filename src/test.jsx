// import {Fragment, useEffect, useState} from "react";
// import Container from "react-bootstrap/Container";
// import './test.css'
// const Test=()=>{
//     const[toggleButton,setToggleButton]=useState(false)
//     const[containerSize,setContainerSize]=useState('medium')
//     const[selectedButton,setSelectedButton]=useState('')
//     const[smallButton,setSmallButton]=useState('small')
//     const[largButton,setLargButton]=useState('large')
//     const sizes=[
//         {
//         size:'small',
//         id:'sml'
//         },
//         {
//             size:'large',
//             id:'lge'
//         }]
//
//
//     const handleSize=()=> {
//         setToggleButton(!toggleButton)
//     }
//
//     const handleSizeChangeToSmall=(event)=> {
//         event.preventDefault()
//         if (event.target.value !== 'small') {
//             setSmallButton('small')
//             setContainerSize('medium')
//         }
//         if(event.target.value !== 'large'){
//             setLargButton('large')
//             setContainerSize('medium')
//         }
//         if (event.target.value === 'small') {
//             setContainerSize('small')
//             setSmallButton('medium')
//
//         }
//         if (event.target.value === 'large') {
//             setContainerSize('large')
//             setLargButton('medium')
//         }
//
//     }
//     const handleSizeChangeToLarge=(event)=>{
//         const sizeNameLarge=event.target
//         setContainerSize(sizeNameLarge)
//         setSelectedButton(sizeNameLarge)
//     }
//     return(
//         <Fragment>
//             <h1>this is test</h1>
//             <div className='container-style'>
//                 <Container className={containerSize}>
//                     <div>
//                         <button onClick={handleSize}>Change widget size</button>
//                     </div>
//                     {toggleButton&&
//                         <div>
//
//
//                             <button onClick={handleSizeChangeToSmall} value={smallButton} >
//                                 {smallButton}
//                             </button>
//                             <button onClick={handleSizeChangeToSmall} value={largButton} >
//                                 {largButton}
//                             </button>
//
//
//
//
//
//
//
//                         </div>
//                     }
//                 </Container>
//             </div>
//
//
//
//
//
//
//
//
//
//
//         </Fragment>
//
//     )
// }
//
// export default Test;