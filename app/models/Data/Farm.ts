import create from "zustand";
import {persist} from 'zustand/middleware'

export interface Farm {
    name: string,
    owner: string,
    address: string,
    logo: string,
    totalLand: number,
    machinery: {one: string, two: string, three: string, four: string}
    setFarmName: (event) => void
    setFarmOwner: (event) => void
    setFarmAddress: (event) => void
    setFarmLogo: (event) => void
    setFarmTotalLand: (event) => void
    setFarmMachinery: (num, value) => void
}

