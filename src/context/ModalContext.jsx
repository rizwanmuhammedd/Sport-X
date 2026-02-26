import { createContext, useContext, useState } from "react";
import { useEffect } from "react";


const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
    confirmText: "OK",
    onConfirm: null,
  });

  const openModal = ({ title, message, confirmText = "OK", onConfirm }) => {
    setModal({
      open: true,
      title,
      message,
      confirmText,
      onConfirm,
    });
  };

  const closeModal = () => {
    setModal(prev => ({ ...prev, open: false }));
  };
  useEffect(() => {
  const handler = (e) => {
    openModal({
      title: e.detail.title,
      message: e.detail.message,
      onConfirm: () => {
        if (e.detail.redirect) {
          window.location.href = e.detail.redirect;
        }
      },
    });
  };

  window.addEventListener("show-modal", handler);

  return () => window.removeEventListener("show-modal", handler);
}, []);


  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {/* 🔥 GLOBAL MODAL UI */}
      {modal.open && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-gray-900 text-white p-6 rounded-xl w-[90%] max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-3">{modal.title}</h2>
            <p className="text-gray-300 mb-6">{modal.message}</p>

            <button
              onClick={() => {
                modal.onConfirm?.();
                closeModal();
              }}
              className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg font-semibold"
            >
              {modal.confirmText}
            </button>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};
