import ReactDOM from "react-dom";


export const ModalConfirm = ({showModal, setShowModal, handleConfirmDelete, handleCancelDelete}) => {


  const handleOnClickAcceptDelete = () => {
    handleConfirmDelete();
    //setShowModal(false);
  };


  const handleOnClickCancelDelete = () => {
    handleCancelDelete ();
    //setShowModal(false);
  };


  return ReactDOM.createPortal(
    <>
      <div className={`modal ${showModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Desea Eliminar el Articulo?</p>
            <button className="delete" aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            <h2>Confirme Elminación de el Articulo</h2>
          </section>
          <footer className="modal-card-foot">
            <div className="buttons">
              <button onClick={handleOnClickAcceptDelete} className="button is-success">Aceptar</button>

              <button onClick={handleOnClickCancelDelete} className="button">Cancelar</button>

            </div>
          </footer>
        </div>
      </div>
    </>,
    document.getElementById("modal")
  );
};
