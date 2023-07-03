import { Image, Modal } from "react-bootstrap";
import React from "react";

function DocViewer(props) {
  return (
    <Modal
      size="lg"
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Image src={props.lien} fluid />
      {/* <iframe
        title={"test"}
        src={props.lien}
        style={{ height: "75vh", width: "70vw" }}
        frameborder="0"
      ></iframe> */}
    </Modal>
  );
}

export default DocViewer;
