/**
 * Contenido editable del sitio — Vinicius Vera, Estudio Jurídico.
 * Cambia textos, servicios o el número de WhatsApp aquí; index.html los renderiza automáticamente.
 */
const SITE_CONTENT = {
  meta: {
    title: "Vinicius Vera | Abogado Civilista en Cochabamba, Bolivia",
    description:
      "Asesoría y representación legal en derecho civil en Cochabamba, Bolivia: contratos, sucesiones, derechos reales y cobro de deudas. Más de 5 años de experiencia.",
  },

  brand: {
    name: "Vinicius Vera",
    role: "Estudio Jurídico Civil",
    initials: "VV",
  },

  nav: [
    { label: "Inicio", href: "#inicio" },
    { label: "Sobre mí", href: "#equipo" },
    { label: "Servicios", href: "#servicios" },
    { label: "Ubicación", href: "#ubicacion" },
    { label: "Contacto", href: "#contacto" },
  ],

  // Reemplaza "number" por el número real (código de país sin +, sin espacios).
  whatsapp: {
    number: "59169504973",
    defaultMessage:
      "Hola, necesito asesoría legal en un tema civil. Mi consulta es sobre:",
  },

  hero: {
    eyebrow: "Asesoría en Derecho Civil en Cochabamba, Bolivia",
    title: "Su patrimonio y sus derechos, defendidos con solidez.",
    subtitle:
      "Representación legal especializada en derecho civil: contratos, propiedad, sucesiones y cobro de deudas. Cada caso se atiende con el rigor técnico y la dedicación personal que merece.",
    ctaPrimary: "Consulta directa por WhatsApp",
    ctaSecondary: "Ver áreas de práctica",
    stats: [
      { value: "+5", label: "Años de experiencia" },
      { value: "100%", label: "Enfoque en derecho civil" },
      { value: "UMSS", label: "Universidad Mayor de San Simón" },
    ],
  },

  team: {
    eyebrow: "Sobre mí",
    title: "Vinicius Vera",
    subtitle:
      "Abogado especializado en derecho civil, comprometido con la defensa técnica y personalizada de cada cliente.",
    // "photo": ruta a la foto del abogado (assets/img/equipo/nombre.jpg).
    // Basta con colocar el archivo en esa carpeta con ese nombre; si no existe,
    // la tarjeta muestra un círculo con las iniciales en su lugar. No hace
    // falta tocar ningún otro archivo del sitio.
    members: [
      {
        photo: "assets/img/equipo/vinicius-vera.jpg",
        initials: "VV",
        name: "Vinicius Vera",
        role: "Abogado especialista en Derecho Civil",
        bio:
          "Abogado egresado de la Universidad Mayor de San Simón (UMSS), con más de 5 años de experiencia dedicados exclusivamente al derecho civil en Cochabamba. Su ejercicio se centra en contratos, derechos reales, sucesiones y cobro de obligaciones, combinando la negociación extrajudicial con una litigación firme cuando el acuerdo no es posible.",
        credentials: [
          "Universidad Mayor de San Simón (UMSS)",
          "Colegio de Abogados de Cochabamba",
          "+5 años de experiencia en derecho civil",
        ],
      },
    ],
  },

  services: {
    eyebrow: "Áreas de práctica",
    title: "Servicios de derecho civil",
    subtitle:
      "Cobertura especializada en las principales materias del derecho civil boliviano, con atención directa y personalizada en cada caso.",
    // "image": ruta a una foto para la tarjeta (assets/img/servicios/...).
    // Si el archivo no existe, la tarjeta muestra el icono de respaldo automáticamente.
    items: [
      {
        icon: "documento",
        image: "assets/img/servicios/contratos.jpg",
        size: "lg",
        title: "Contratos Civiles y Comerciales",
        description:
          "Redacción, revisión y litigio por incumplimiento de contratos de compraventa, servicios y otros acuerdos civiles.",
      },
      {
        icon: "balanza",
        image: "assets/img/servicios/derechos-reales.jpg",
        size: "sm",
        title: "Derechos Reales y Usucapión",
        description:
          "Procesos de usucapión, reivindicación y acciones posesorias sobre bienes inmuebles.",
      },
      {
        icon: "escudo",
        image: "assets/img/servicios/sucesiones.jpg",
        size: "sm",
        title: "Sucesiones y Herencias",
        description:
          "Declaratorias de herederos, partición de bienes y trámites sucesorios completos.",
      },
      {
        icon: "candado",
        image: "assets/img/servicios/cobro-deudas.jpg",
        size: "lg",
        title: "Cobro de Deudas y Obligaciones",
        description:
          "Procesos ejecutivos y coactivos civiles para el cobro de deudas, pagarés y garantías.",
      },
      {
        icon: "familia",
        image: "assets/img/servicios/arrendamientos.jpg",
        size: "lg",
        title: "Arrendamientos y Desalojos",
        description:
          "Contratos de alquiler y anticrético, y procesos de desalojo por falta de pago o vencimiento.",
      },
      {
        icon: "maletin",
        image: "assets/img/servicios/responsabilidad-civil.jpg",
        size: "sm",
        title: "Responsabilidad Civil y Daños",
        description:
          "Reclamos por daños y perjuicios e indemnizaciones civiles derivadas de un hecho dañoso.",
      },
      {
        icon: "auto",
        image: "assets/img/servicios/transito-civil.jpg",
        size: "sm",
        title: "Accidentes de Tránsito (vía civil)",
        description:
          "Reclamos de indemnización civil por daños materiales y personales derivados de accidentes de tránsito.",
      },
      {
        icon: "reloj",
        image: "assets/img/servicios/medidas-cautelares.jpg",
        size: "lg",
        title: "Medidas Cautelares Civiles",
        description:
          "Embargos preventivos, anotaciones preventivas y otras medidas urgentes para proteger su patrimonio.",
      },
    ],
  },

  location: {
    eyebrow: "Ubicación",
    title: "Dónde encontrarnos",
    subtitle: "Haga clic en el mapa para abrir la ubicación en Google Maps.",
    // Cambia esta dirección por la dirección real del despacho (se usa para
    // mostrar el mapa y para armar el link de abajo si "mapsUrl" está vacío).
    address: "Cochabamba, Bolivia",
    // Pega aquí el link "Compartir" de Google Maps (botón Compartir > Copiar
    // enlace) para que el clic redirija exactamente a esa ubicación.
    // Déjalo vacío ("") para que se arme automáticamente desde "address".
    mapsUrl: "",
  },

  contactCta: {
    eyebrow: "Consulta personalizada",
    title: "¿Necesita asesoría en un tema civil?",
    subtitle:
      "Escriba directamente por WhatsApp. La primera comunicación es confidencial y se atiende con prioridad.",
    buttonLabel: "Escribir por WhatsApp",
  },

  footer: {
    location: "Cochabamba, Bolivia",
    scheduleLabel: "Atención con cita previa",
    whatsappLabel: "WhatsApp directo",
    copyright: "Vinicius Vera — Estudio Jurídico Civil. Todos los derechos reservados.",
  },
};
