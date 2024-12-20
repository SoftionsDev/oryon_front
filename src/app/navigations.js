
export const navigations = [

  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },

  { label: 'Administración', type: 'label' },

  {
    name: "Maestro de ventas",
    icon: "shop",
    path: '/dashboard/menuSale'
  },
  {
    name: "Comisiones",
    icon: "wallet",
    path: '/dashboard/commissionsList'
  },
  {
    name: "Equipo comercial",
    icon: "person",
    path: "/dashboard/comercial",
    children: [
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
    path: '/dashboard/rulesList',
  
    children: [
      {
        name: "Porcentajes y Equivalencias",
        path: "/dashboard/rulesCreate",
        icon: "keyboard_arrow_right"
      },
      {
        name: "Formulación",
        path: '/dashboard/rulesList',
        icon: "keyboard_arrow_right",
      }
    ]
  },

  // {
  //   name: "Indicadores",
  //   icon: "light",
  //   path: '/dashboard/indicatorSale',
  // },

  { label: 'Seguridad', type: 'label' },
  {
    name: 'Gestion Usuarios',
    icon: 'security',
    path: '/dashboard/default',
    children: [
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

