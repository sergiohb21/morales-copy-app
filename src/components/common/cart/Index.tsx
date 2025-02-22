import { useStore } from "@nanostores/react";
import {
  FilesStore,
  isOptionsPrintModalOpen,
  removeFileItem,
  resetFiles,
} from "../../../stores/filesStore";
import type { TFilesStore } from "../../../stores/files-store.types";

export default function CartModal() {
  const $isOptionsPrintModalOpen = useStore(isOptionsPrintModalOpen);
  const $filesItems = useStore(FilesStore);

  const handleClose = () => {
    isOptionsPrintModalOpen.set(!$isOptionsPrintModalOpen);
  };

  const handleRemoveFile = (id: string) => {
    removeFileItem(id);
  };

  const handleResetFiles = () => {
    resetFiles();
  };

  const handlePrint = () => {
    console.log("Imprimiendo archivos...");
  };

  return (
    $isOptionsPrintModalOpen && (
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center transition-opacity ${
          $isOptionsPrintModalOpen
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-white p-6 rounded-lg max-w-lg w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Carrito de Archivos</h2>
            <button
              onClick={handleClose}
              className="text-gray-600 hover:text-gray-800"
            >
              X
            </button>
          </div>

          <div className="mt-4">
            {Object.keys($filesItems).length === 0 ? (
              <p>No hay archivos añadidos.</p>
            ) : (
              <div>
                {Object.keys($filesItems).map((fileId) => {
                  const file: TFilesStore = $filesItems[fileId];

                  return (
                    <div
                      key={fileId}
                      className="flex justify-between items-center p-2 border-b"
                    >
                      <div>
                        <p className="font-semibold">{file.name}</p>
                        <p className="text-sm text-gray-500">{file.size} MB</p>
                      </div>
                      <button
                        onClick={() => handleRemoveFile(fileId)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Eliminar
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-between">
            <button
              onClick={handleResetFiles}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded"
            >
              Vaciar carrito
            </button>
            <button
              onClick={handlePrint}
              className="bg-indigo-600 text-white py-2 px-4 rounded"
            >
              Imprimir
            </button>
          </div>
        </div>
      </div>
    )
  );
}
