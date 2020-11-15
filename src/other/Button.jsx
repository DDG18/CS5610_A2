// import React, {useContext} from 'react';
// import {Context} from "./Context";
// import Input from './App'
//
// export default function Button() {
//     const context = useContext(Context)
//     let isOn = context.state.user.isOn;
//
//
//     const handleIsOn = e => {
//         // let newIsOn = []
//         //  if (isOn[0] === 1){
//         //      newIsOn.push(0)
//         //  }else {
//         //      newIsOn.push(1)
//         //  }
//         isOn[0] = isOn[0] === 1 ? 0 : 1
//         context.dispatch({type: 'isOn', value: isOn})
//         console.log("after: " + isOn)
//     }
//
//
//     return (
//         <>
//             <Input onClick={}/>
//             <button style={{
//                 position: "fixed",
//                 top: "20%",
//                 left: "20%",
//                 marginTop: 30
//             }}
//                     onClick={() => handleIsOn()
//                     }>
//                 {isOn[0]===1 ? "pause" : "start"}
//             </button>
//         </Input>
//     );
// }
