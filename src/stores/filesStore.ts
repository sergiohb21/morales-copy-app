import { atom, map } from "nanostores";
import type { TFilesStore } from "./files-store.types";

export const isOptionsPrintModalOpen = atom(false);
export const isCartModalOpen = atom(false);
export const FilesStore = map<Record<string, TFilesStore>>({});

export function addFileItem({
  id,
  name,
  typeFormat,
  size,
  printFormat,
  copies,
  color,
  slidesPerPage,
  duplex,
  orientation,
}: TFilesStore) {
  const existingEntry = FilesStore.get()[id];
  if (existingEntry) {
    FilesStore.setKey(id, {
      ...existingEntry,
      name,
      typeFormat,
      size,
      printFormat,
      copies,
      color,
      slidesPerPage,
      duplex,
      orientation,
    });
  } else {
    FilesStore.setKey(id, {
      id,
      name,
      typeFormat,
      size,
      printFormat,
      copies,
      color,
      slidesPerPage,
      duplex,
      orientation,
    });
  }
}

export function removeFileItem(id: string) {
  const currentFiles = FilesStore.get();
  const updatedFiles = { ...currentFiles };
  delete updatedFiles[id];

  FilesStore.set(updatedFiles);
}

export function resetFiles() {
  FilesStore.set({});
}
