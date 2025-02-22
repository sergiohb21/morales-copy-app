import React, { useState } from "react";
import {
  addFileItem,
  FilesStore,
  isOptionsPrintModalOpen,
  removeFileItem,
} from "../../stores/filesStore";
import { useStore } from "@nanostores/react";
import OptionsModal from "./OptionsModal";
import type { TFilesStore } from "../../stores/files-store.types";

export default function InitFileUploader() {
  const [selectedFile, setSelectedFile] = useState<TFilesStore | null>(null);
  const $filesItems = useStore(FilesStore);
  const $isOptionsPrintModalOpen = useStore(isOptionsPrintModalOpen);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (!target.files || target.files.length === 0) return;

    const newFile = target.files[target.files.length - 1];

    addFileItem({
      id: crypto.randomUUID(),
      name: newFile.name,
      typeFormat: newFile.type,
      size: newFile.size,
      printFormat: "A4",
      copies: 1,
      color: "black_and_white",
      slidesPerPage: 1,
      duplex: "none",
      orientation: "portrait",
    });
  };

  const handleRemoveFile = (id: string) => {
    removeFileItem(id);
  };

  const handleModalToggle = (file: TFilesStore) => {
    setSelectedFile(file);
    isOptionsPrintModalOpen.set(!$isOptionsPrintModalOpen);
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-md shadow-lg my-4">
      <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-gray-400 focus:outline-none">
        <span className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <span className="font-medium text-gray-600">
            Arrastra y suelta tus archivos aquí o
            <span className="text-blue-600 underline">
              {" "}
              selecciona un archivo
            </span>
          </span>
        </span>
        <input
          onChange={handleFileChange}
          type="file"
          multiple
          className="hidden"
        />
      </label>

      {Object.values($filesItems).length > 0 && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                  Tipo
                </th>
                <th scope="col" className="px-6 py-3">
                  Tamaño
                </th>
                <th scope="col" className="px-6 py-3">
                  Opciones
                </th>
                <th scope="col" className="px-6 py-3">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.values($filesItems).map((file) => (
                <tr key={file.name} className="border-b bg-white">
                  <td className="px-6 py-4">{file.name}</td>
                  <td className="px-6 py-4">{file.typeFormat}</td>
                  <td className="px-6 py-4">
                    {(file.size / 1024).toFixed(2)} KB
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleModalToggle(file)}
                      className="font-medium text-blue-600 cursor-pointer hover:underline"
                    >
                      Editar
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleRemoveFile(file.id)}
                      className="font-medium text-red-600 cursor-pointer hover:underline"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {$isOptionsPrintModalOpen && selectedFile && (
        <OptionsModal file={selectedFile} />
      )}
    </div>
  );
}
