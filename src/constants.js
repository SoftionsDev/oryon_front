export const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'

export const ROLES = {
    Admin: 1,
    Manager: 2,
    Colaborador: 3
};

export const GOALS_TYPES = {
    Mensual: 'M',
    Bimensual: 'BM',
    Trimestral: 'T',
    Semestral: 'S',
    Anual: 'A'
}

export const POSITIONS = {
    MANAGER: 'Gerente',
    DIRECTOR: 'Director',
    ADVISER: 'Asesor',
    ASSISTANT: 'Asistente',
}

export const COMMISSIONS_TYPES = {
    SALE: 'venta',
    DELIVERY: 'entrega',
    OTHER: 'otra'
}

export const SALES_TYPES = {
    SELF: 'propia',
    DELIVERY: 'entrega',
    REFERRED: 'referido',
    OTHER: 'otra'
}
