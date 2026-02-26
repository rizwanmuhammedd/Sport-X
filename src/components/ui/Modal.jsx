const Modal = ({ open, title, message, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-xl border border-gray-700">
        <h2 className="text-lg font-semibold text-white mb-2">{title}</h2>
        <p className="text-gray-300 mb-6">{message}</p>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
