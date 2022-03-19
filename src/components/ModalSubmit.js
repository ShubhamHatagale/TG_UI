import React from 'react'
import Modal from "react-bootstrap/Modal";

function ModalSubmit(props) {
    return (
        <Modal
            size="sm"
            show={props.show}
            // onHide={() => setMadd(false)}
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Body >Form Submited Successful</Modal.Body>
        </Modal>
    )
}

export default ModalSubmit
