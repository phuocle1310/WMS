import React from "react";
import cx from "clsx";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import ParallaxSlide from "@mui-treasury/components/slide/parallax";
import IconButton from "@material-ui/core/IconButton";
//css
import ParallaxCarouselStyles from "./ParallaxCarouselStyles";

const ParallaxCarousel = (props) => {
  const classes = ParallaxCarouselStyles();

  // eslint-disable-next-line react/prop-types
  const renderElements = ({ index, onChangeIndex }) => (
    <>
      <IconButton
        className={cx(classes.arrow, classes.arrowLeft)}
        disabled={index === 0}
        onClick={() => onChangeIndex(index - 1)}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        className={cx(classes.arrow, classes.arrowRight)}
        disabled={index === props.data.length - 1}
        onClick={() => onChangeIndex(index + 1)}
      >
        <KeyboardArrowRight />
      </IconButton>
    </>
  );
  const renderChildren = ({ injectStyle, fineIndex }) =>
    props.data.map(({ id, image }, i) => (
      <div key={id} className={classes.slide}>
        <div className={classes.imageContainer}>
          <img className={classes.image} src={image} alt={"slide"} />
        </div>
      </div>
    ));
  return (
    <div className={classes.root}>
      <ParallaxSlide renderElements={renderElements}>
        {renderChildren}
      </ParallaxSlide>
    </div>
  );
};

export default ParallaxCarousel;