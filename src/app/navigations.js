
export const navigations = [

  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },

  { label: 'Administración', type: 'label' },


  {
    name: "Comisiones",
    icon: "wallet",

    children: [
      {
        name: "Submenu",
        path: "/dashboard/analytics",
        icon: "keyboard_arrow_right"
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
    path: "/dashboard/comercial",
    children: [
      {
        name: "Registrar Colaborador",
        path: "/dashboard/comercial",
        icon: "keyboard_arrow_right"
      },
      {
        name: "Colaboradores",
        path: '/dashboard/userComercial',
        icon: "keyboard_arrow_right",
      }
    ]
  },

  {
    name: "Puntos de venta",
    icon: "house",
    path: "/dashboard/stores",
    children: [
      {
        name: "Tiendas",
        path: "/dashboard/stores",
        icon: "keyboard_arrow_right"
      },
      {
        name: "Regiones",
        path: "/dashboard/stores/regions",
        icon: "keyboard_arrow_right"
      },
      {
        name: "Ciudades",
        path: "/dashboard/stores/cities",
        icon: "keyboard_arrow_right",
      }
    ]
  },
  {
    name: "Productos",
    icon: "article",
    path: '/dashboard/listProducts'
  },
  {
    name: "Motor de reglas (BRM)",
    icon: "perm_data_setting",
    path: '/dashboard/rulesCreate',
  
    children: [
      {
        name: "Crear Regla",
        path: "/dashboard/rulesCreate",
        icon: "keyboard_arrow_right"
      },
      {
        name: "Lista reglas",
        path: '/dashboard/rulesList',
        icon: "keyboard_arrow_right",
      }
    ]
  },

  {
    name: "Maestro de ventas",
    icon: "shop",
    path: '/dashboard/menuSale'
  },
  {
    name: "Indicadores",
    icon: "light",
    path: "/dashboard/indicatorSale",
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
    path: '/dashboard/default',
    children: [
      {
        name: 'Registrar usuario',
        icon: 'person_add',
        path: '/dashboard/createUser'
      },
      {
        name: 'Usuarios',
        icon: 'person',
        path: '/dashboard/listUser'
      }

    ]
  }

];

export const navigationsManager = [

  {
    name: 'Dashboard',
    path: '/dashboard/default',
    icon: 'dashboard'
  },
  {
    label: 'Administración',
    type: 'label'
  },
  {
    name: "Maestro de ventas",
    icon: "shop",
    path: '/dashboard/default'
  }
]

export const navigationsCollaborator = [

  {
    name: 'Dashboard',
    path: '/dashboard/default',
    icon: 'dashboard'
  },
  {
    label: 'Administración',
    type: 'label'
  },
  {
    name: "Indicadores",
    path: '/dashboard/default',
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

]

