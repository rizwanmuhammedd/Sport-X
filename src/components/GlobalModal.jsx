import { useModal } from "../context/ModalContext";

const GlobalModal = () => {
  const { modal, confirm, cancel } = useModal();

  if (!modal.open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center">
      <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-gray-700 shadow-2xl animate-fadeIn">
        <h2 className="text-2xl font-bold text-white mb-4">
          {modal.title}
        </h2>

        <p className="text-gray-300 mb-8">
          {modal.message}
        </p>

        <div className="flex justify-end gap-4">
          {modal.cancelText && (
            <button
              onClick={cancel}
              className="px-5 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600"
            >
              {modal.cancelText}
            </button>
          )}

          <button
            onClick={confirm}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
          >
            {modal.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalModal;
