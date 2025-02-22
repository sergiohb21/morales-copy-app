import React, { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { addFileItem, isOptionsPrintModalOpen } from "../../stores/filesStore";
import type { TFilesStore } from "../../stores/files-store.types";
import { EDIT_OPTIONS } from "./constans";

type OptionsModalProps = {
  file: TFilesStore;
};

const OptionsModal: React.FC<OptionsModalProps> = ({ file }) => {
  const [formData, setFormData] = useState<TFilesStore>({ ...file });
  const [isModified, setIsModified] = useState(false);
  const $isModalOpen = useStore(isOptionsPrintModalOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") isOptionsPrintModalOpen.set(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "copies" ? Number(value) : value,
    }));
    setIsModified(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: newName } = e.target as HTMLInputElement;
    const currentValue = formData.name;

    if (typeof currentValue === "string") {
      const [baseName, extension] = currentValue.trim().split(".");
      setFormData((prev) => ({
        ...prev,
        name: extension ? `${newName.trim()}.${extension}` : newName.trim(),
      }));
      setIsModified(true);
    }
  };

  const handleSubmit = () => {
    addFileItem(formData);
    isOptionsPrintModalOpen.set(false);
  };

  return (
    $isModalOpen && (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
        <div
          role="dialog"
          aria-labelledby="modal-title"
          className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full"
        >
          <h2
            id="modal-title"
            className="text-2xl font-bold text-gray-800 text-center"
          >
            Opciones de Impresión
          </h2>

          <div className="mt-4 space-y-4">
            {EDIT_OPTIONS.map(({ label, name, type, min, options }) => {
              const value = formData[name as keyof TFilesStore];

              return (
                <div key={name} className="flex flex-col">
                  <label htmlFor={name} className="text-gray-700 font-medium">
                    {label}
                  </label>

                  {type === "text" && name === "name" ? (
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <input
                        type="text"
                        id={name}
                        name={name}
                        value={
                          typeof value === "string" ? value.split(".")[0] : ""
                        }
                        onChange={handleNameChange}
                        className="w-full p-2 outline-none bg-transparent"
                        autoFocus
                      />
                      <span className="px-2 bg-gray-100 text-gray-600 text-sm rounded-r-md">
                        {typeof value === "string" && value.includes(".")
                          ? `.${value.split(".")[1]}`
                          : ""}
                      </span>
                    </div>
                  ) : type === "number" ? (
                    <input
                      type="number"
                      id={name}
                      name={name}
                      value={value as number}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      min={min}
                    />
                  ) : (
                    <select
                      id={name}
                      name={name}
                      value={value as string}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      {options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => isOptionsPrintModalOpen.set(false)}
              className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className={`px-6 py-2 rounded-md transition ${
                isModified
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-400 text-gray-800 cursor-not-allowed"
              }`}
              disabled={!isModified}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default OptionsModal;
