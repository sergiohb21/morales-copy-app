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
    href: `${import.meta.env.BASE_URL}/imprimir`,
    icon: PrinterIcon,
  },
  {
    name: "Presupuestos",
    description: "Consulta tu presupuesto de impresión personalizado",
    href: `${import.meta.env.BASE_URL}/presupuestos`,
    icon: CurrencyEuroIcon,
  },
];

export const callsToAction = [
  {
    name: "Localiza nuestra tienda",
    href: `${import.meta.env.BASE_URL}/#`,
    icon: MapIcon,
  },
  {
    name: "Contacta con nosotros",
    href: `${import.meta.env.BASE_URL}/#`,
    icon: PhoneIcon,
  },
];
