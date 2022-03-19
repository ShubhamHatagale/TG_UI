import React, { useState, forwardRef, useImperativeHandle } from 'react'

const ChildComponent = forwardRef((props, ref) => {
    const [childName, changeChildName] = useState("Iamchild")
    useImperativeHandle(ref, () => ({
        callChildFunction() {
            changeChildName("New Value")
        }
    }))
    return (
        <div>
            Child Component {childName}
            <button onClick={() => props.callparentfunction()}>Call Parent Function</button>
        </div>
    )
})

export default ChildComponent
