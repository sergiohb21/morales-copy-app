export type TPrintFormat = "A4" | "A3" | "Letter" | "Legal";

export type TFileType = "pdf" | "docx" | "pptx" | "txt";

export type TColorMode = "black_and_white" | "color";

export type TDuplexMode = "none" | "short_edge" | "long_edge"; // Simplex o dúplex (corto/largo)

export type TOrientation = "portrait" | "landscape"; // Vertical u horizontal

export type TFilesStore = {
  id: string;
  name: string;
  typeFormat: string;
  size: number;
  printFormat: TPrintFormat;
  copies: number;
  color: TColorMode;
  slidesPerPage: number;
  duplex: TDuplexMode;
  orientation: TOrientation;
};

export type TItemDisplayInfo = Pick<
  FileStore,
  | "id"
  | "name"
  | "type"
  | "size"
  | "format"
  | "copies"
  | "color"
  | "slidesPerPage"
  | "duplex"
  | "orientation"
>;
