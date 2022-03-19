import React, { useRef, useState } from 'react'
import ChildComponent from './ChildComponent';
const FunctionalComponent = (props) => {
    const [name, changeName] = useState("Naruto");

    const ChildRef = useRef();
    const updateState = () => {
        changeName("Sasuke");
    }
    return (
        <div>
            Parent Component : {name}
            <button onClick={() => ChildRef.current.callChildFunction()}>Update state</button>
            <ChildComponent ref={ChildRef} callparentfunction={() => updateState()} />
        </div>
    )
}

export default FunctionalComponent
