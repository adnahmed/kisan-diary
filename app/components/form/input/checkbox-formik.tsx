import { FC } from 'react';
import './CheckboxFormik.scss';
import {FieldHookConfig, useField} from "formik";

const CheckboxFormik: FC<FieldHookConfig<string> & { label?: string }> = (props) => {
    const [field, meta] = useField({...props, type: 'checkbox'});
    return (
        <div>
            <label className='checkbox-input'>
                <input type='checkbox' {...field} name={props.name}/>
                {props.children}
            </label>
            {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
        </div>
    )
}

export default CheckboxFormik;