import {
  CurrencyEuroIcon,
  MapIcon,
  PhoneIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";

export const services = [
  {
    name: "Imprimir",
    description: "Sube tus archivos para imprimir",
    href: "/morales-copy/imprimir",
    icon: PrinterIcon,
  },
  {
    name: "Presupuestos",
    description: "Consulta tu presupuesto de impresión personalizado",
    href: "morales-copy/presupuestos",
    icon: CurrencyEuroIcon,
  },
];

export const callsToAction = [
  { name: "Localiza nuestra tienda", href: "#", icon: MapIcon },
  { name: "Contacta con nosotros", href: "#", icon: PhoneIcon },
];
