import {useParams} from "react-router-dom";

export function CropYear() {
    let urlParams = useParams()
    return (
        <div className="YearRange">
            <div style={{ display: 'flex', flex: '1', justifyContent: 'space-between'}}>
                <p>Cropping Year: {urlParams.yearStart}-{urlParams.yearEnd}</p>
            </div>
        </div>
    )
}

export function CropType() {
    let urlParams = useParams()
    return (
        <div className="CropType">
                <p>Crop: <div style={{display: 'inline', color: 'brown'}}>{urlParams.cropName}</div></p>
        </div>
    )
}