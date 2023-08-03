const env: string = "dev"
const devOptions = {
    communication: {
        host: 'localhost',
        port: 8001,
    },
    diagnosis: {
        host: 'localhost',
        port: 8002,
    },
    user_management: {
        host: 'localhost',
        port: 8003,
    }
}

const prodOptions = {
    communication: {
        host: 'communication',
        port: 8001,
    },
    diagnosis: {
        host: 'diagnosis',
        port: 8002,
    },
    user_management: {
        host: 'user_management',
        port: 8003,
    }
}
export const options = env === "dev" ? devOptions : prodOptions

export const routes = {
    communication: ["pack", 'contact', 'assistance', 'article', 'ads'],
    diagnosis: ['reservation', 'reclamation', 'rapport', 'avis', 'notification', 'stats'],
    user_management: ['payment', 'expert', 'client', 'auth', 'disponibilite', "models", "mark", "admin", "moderator"]
}