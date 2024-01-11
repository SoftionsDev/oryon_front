export const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'

export const ROLES = {
    Admin: 1,
    Manager: 2,
    Colaborador: 3
};

export const GOALS_TYPES = {
    Diaria: 'D',
    Mensual: 'M',
    Anual: 'A'
}

export const POSITIONS = {
    MANAGER: 'Gerente',
    DIRECTOR: 'Director',
    ADVISER: 'Asesor',
    ASSISTANT: 'Asistente',
}
