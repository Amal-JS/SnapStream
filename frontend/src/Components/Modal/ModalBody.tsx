export const ModalBody: React.FC<React.HTMLAttributes<HTMLDivElement> > = ({ children }) => {
    return (
      <div className="modal-content-inner">
        {children}
      </div>
    );
  };
