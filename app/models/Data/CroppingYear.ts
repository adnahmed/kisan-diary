export class CroppingYear extends Number {
    constructor (val) {
        super()
        if (val < 800 || val > 3000) throw new Error("Cropping Year out of range.")
        super(val)
    }
}
