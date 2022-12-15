export interface Land {
    type: string | 'total'
    quantity?: LandQuantity
}

interface LandQuantity {
    value: number
    unit: LandUnit
}

export enum LandUnit {
    acres="Acres",
}

