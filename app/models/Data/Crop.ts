export class Crop {
    id: string = ''
    fullName: string = ''
    landOccupied: number = 0
}
export class LandType {
    id: string = ''
    name: string = ''
}
export interface Crops {
    crops: Crop[]
}