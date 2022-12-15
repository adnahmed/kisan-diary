import create from "zustand";
import {persist} from "zustand/middleware";

export interface Value<id = string> {
    id: id
}

export interface CRUDValueStore<T extends Value, id = string> {
    values: T[]
    add: (value: T) => void
    edit: (id: id, newValue: T) => void
    delete: (id: id) => void
}

export function createStore<T extends Value, id = string>(name: string) {
    return create<CRUDValueStore<T, id>>()(persist((set) => ({
        values: [],
        add: (value) => set(state => {
            return {
                ...state,
                values: [
                    ...state.values,
                    value
                ]
            }
        }),
        edit: (id, newValue) => set(state => {
            return {
                ...state,
                values: state.values.map(value => {
                    if (value.id === id) {
                        return newValue
                    } else return value
                })
            }
        }),
        delete: (id) => set(state => {
            return {
                ...state,
                values: state.values.filter(value => value.id !== id)
            }
        }),
    })))
}