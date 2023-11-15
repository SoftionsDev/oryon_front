
export const navigations = [
  
  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },

  { label: 'Administración', type: 'label' },


  {
    name: "Ventas",
    icon: "local_grocery_store",
    path: "/dashboard/menu-sale",
  },
  {
    name: "Comisiones",
    icon: "wallet",

    children: [
      {
        name: "Submenu",
        path: "/dashboard/analytics",
        iconText: "A"
      },
      {
        name: "Submenu2",
        path: "/dashboard/sales",
        iconText: "S",
      }
    ]
  },
  {
    name: "Equipo comercial",
    icon: "person",

    children: [
      {
        name: "Submenu",
        path: "/dashboard/analytics",
        iconText: "A"
      },
      {
        name: "Submenu2",
        path: "/dashboard/sales",
        iconText: "S",
      }
    ]
  },
  {
    name: "Puntos de venta",
    icon: "house",
    path: "/dashboard/stores",
  },
  {
    name: "Productos",
    icon: "article",

    children: [
      {
        name: "Submenu",
        path: "/dashboard/analytics",
        iconText: "A"
      },
      {
        name: "Submenu2",
        path: "/dashboard/sales",
        iconText: "S",
      }
    ]
  },
  {
    name: "Maestro de ventas",
    icon: "shop",

    children: [
      {
        name: "Submenu",
        path: "/dashboard/analytics",
        iconText: "A"
      },
      {
        name: "Submenu2",
        path: "/dashboard/sales",
        iconText: "S",
      }
    ]
  },
  {
    name: "Indicadores",
    icon: "light",

    children: [
      {
        name: "Submenu",
        path: "/dashboard/analytics",
        iconText: "A"
      },
      {
        name: "Submenu2",
        path: "/dashboard/sales",
        iconText: "S",
      }
    ]
  },

  { label: 'Seguridad', type: 'label' },
  /*{
    name: 'Components',
    icon: 'favorite',
    badge: { value: '30+', color: 'secondary' },
    children: [
      { name: 'Auto Complete', path: '/material/autocomplete', iconText: 'A' },
      { name: 'Buttons', path: '/material/buttons', iconText: 'B' },
      { name: 'Checkbox', path: '/material/checkbox', iconText: 'C' },
      { name: 'Dialog', path: '/material/dialog', iconText: 'D' },
      { name: 'Expansion Panel', path: '/material/expansion-panel', iconText: 'E' },
      { name: 'Form', path: '/material/form', iconText: 'F' },
      { name: 'Icons', path: '/material/icons', iconText: 'I' },
      { name: 'Menu', path: '/material/menu', iconText: 'M' },
      { name: 'Progress', path: '/material/progress', iconText: 'P' },
      { name: 'Radio', path: '/material/radio', iconText: 'R' },
      { name: 'Switch', path: '/material/switch', iconText: 'S' },
      { name: 'Slider', path: '/material/slider', iconText: 'S' },
      { name: 'Snackbar', path: '/material/snackbar', iconText: 'S' },
      { name: 'Table', path: '/material/table', iconText: 'T' },
    ],
  },*/
  {
    name: 'Sesion/autenticacion',
    icon: 'security',
    children: [
      { name: 'Registrar usuario', iconText: 'SU', path: '/dashboard/new-user' },
      { name: 'Usuarios', iconText: 'FP', path: '/dashboard/list-user' },
      
    ],
  },

];


