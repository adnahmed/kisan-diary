import create from 'zustand'
import { Land, LandUnit } from './Land'
export const useLandStore = create<Land>((set) => ({
    type: '',
    fetch: () => 
        set((state) => ({type: 'total', quantity: { value: 20, unit: LandUnit.acres } }))
    
}))