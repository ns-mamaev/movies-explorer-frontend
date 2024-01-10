import { useEffect, useRef, useState } from "react";

function withPopup(Component) {
  return function WithPopup(props) {
    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef(null);

    const onToggleOpen = () => {
      setIsOpen((v) => !v);
    };

    useEffect(() => {
      function handleOverlayClose(e) {
        if (popupRef.current && !popupRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      }

      if (isOpen) {
        document.body.addEventListener("click", handleOverlayClose);
      }
      return () =>
        document.body.removeEventListener("click", handleOverlayClose);
    }, [isOpen]);

    return (
      <Component
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        ref={popupRef}
        onToggleOpen={onToggleOpen}
        {...props}
      />
    );
  };
}

export default withPopup;
