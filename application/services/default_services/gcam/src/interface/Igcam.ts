export interface Igcamresource {

    resource_name: string,
    resource_type: string,
    roles: [],
    components:[],
    created_at: Date
}

export interface Iscreen {

    resources: string,
    role: string,
    created_at: Date
}