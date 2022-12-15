import create from "zustand";
import {persist, subscribeWithSelector} from "zustand/middleware";
import {Farm} from "./Farm";
export const useFarmStore = create<Farm>()(persist(subscribeWithSelector((set) => ({
        name: '',
        owner: '',
        address: '',
        logo: '',
        totalLand: 0,
        machinery: {one: '', two: '', three: '', four: ''},
        setFarmName: (event) => set((state) => ({ ...state, name: event.target.value})),
        setFarmOwner: (event) => set(state => ({...state, owner: event.target.value})),
        setFarmAddress: (event) => set((state) => ({...state, address: event.target.value})),
        setFarmLogo: (path) => set(state => ({...state, logo: path})),
        setFarmTotalLand: (event) => set(state => ({ ...state, totalLand: event.target.value })),
        setFarmMachinery: (num, value) => set(state => ({...state, machinery: {...state.machinery, num: value}}))
    }),
)))
