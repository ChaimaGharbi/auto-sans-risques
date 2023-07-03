import { Modal } from "react-bootstrap";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Image } from "semantic-ui-react";

const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 1,
    paritialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    paritialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30,
  },
};

function ReviewCarousel(props) {
  const images = [];
  for (let i = 0; i < props.images.length; i++) {
    images.push(props.images[i].imageUrl);
  }

  return (
    <Modal
      size="md"
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Body>
      <Carousel ssr itemClass="image-item" responsive={responsive}>
          {images.slice(0, images.length).map((image, i) => {
            return (
              <Image
                key={i}
                draggable={false}
                style={{ height: "500px" }}
                className="w-full"
                src={image}
              />
            );
          })}
        </Carousel>
      </Modal.Body>
    </Modal>
  );
}

export default ReviewCarousel;
