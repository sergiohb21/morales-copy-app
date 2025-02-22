export const EDIT_OPTIONS = [
  { label: "Copias", name: "copies", type: "number", min: 1 },
  { label: "Nombre", name: "name", type: "text" },
  {
    label: "Formato de impresión",
    name: "printFormat",
    type: "select",
    options: ["A4", "A5", "A6", "Letter", "A3", "A2", "A1", "A0"],
  },
  {
    label: "Color",
    name: "color",
    type: "select",
    options: ["Blanco y Negro", "Color"],
  },
  {
    label: "Páginas por hoja",
    name: "slidesPerPage",
    type: "select",
    options: [1, 2, 4, 6, 8],
  },
  {
    label: "Doble cara",
    name: "duplex",
    type: "select",
    options: ["Una cara", "Doble cara"],
  },
  {
    label: "Orientación",
    name: "orientation",
    type: "select",
    options: ["Vertical", "Horizontal"],
  },
];
