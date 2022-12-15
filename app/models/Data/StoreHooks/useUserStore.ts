import create from "zustand";
import {persist} from "zustand/middleware";
import {useFarmStore} from "./useFarmStore";

interface User {
    ownLand: number
    soilType: string
    leasedLand: number
    irrigationSources: { one: string, two: string }
    changeIrrigationSource: (sourceNum, value) => void
    setOwnLand: (event) => void
    setLeasedLand: (event) => void
    setSoilType: (event) => void
}

export default create<User>()(persist((set) => ({
    ownLand: 0,
    leasedLand: 0,
    soilType: '',
    irrigationSources: {one: '', two: ''},
    changeIrrigationSource: (sourceNum, value) => {
        set(state => {
            return {
                ...state,
                irrigationSources: { ...state.irrigationSources, sourceNum: value}
            }
        })
    },
    setOwnLand: (event) => (set(state => {
        const totalLand = useFarmStore.getState().totalLand
        const newOwnLand = event.target.value;
        if (newOwnLand > totalLand) throw new Error("You cannot own more than total land.")
        return {...state, ownLand: newOwnLand}
    })),
    setLeasedLand: (event) => (set(state => {
        return {...state, leasedLand: event.target.value}
    })),
    setSoilType: (event) => (set(state => {
        return {...state, soilType: event.target.value}
    })),
})))