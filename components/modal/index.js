import React, { Fragment } from "react";
import ReactModal from "react-modal";
import classNames from "classnames";
import PropTypes from "prop-types";

import { getElement } from "nwiadmin/services/app";
import { addPrefixToClassNames } from "nwiadmin/utility";

import styles from "./styles.scss";

ReactModal.setAppElement(document.body);

const Modal = ({ children, title, type, isOpen }) => {
  const contentClass = classNames(
    addPrefixToClassNames(styles, "content", type)
  );

  const scrollClasses = classNames(
    styles.scroll,
    title ? styles.scrollHasTitle : null
  );

  const TitleElement = /* getElement('Modal__title') ? getElement('Modal__title') :*/ children => (
    <Fragment>{children}</Fragment>
  );

  return (
    <ReactModal
      isOpen={isOpen}
      portalClassName={styles.root}
      overlayClassName={styles.overlay}
      className={contentClass}
      contentLabel="Modal"
    >
      {Boolean(title) && (
        <div className={styles.title}>{TitleElement(title)}</div>
      )}
      <div className={scrollClasses}>{children}</div>
    </ReactModal>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  type: PropTypes.string,
  title: PropTypes.string
};

Modal.defaultProps = {
  onRequestClose: () => null,
  location: null,
  type: undefined, // Undefined instead of null, to make sure 'addPrefixToClassNames' defaults properly
  title: null
};

export default Modal;
