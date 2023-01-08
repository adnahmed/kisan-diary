import type { FieldHookConfig } from "formik";
import { useField } from "formik";
import type { FC, Ref } from "react";
import { forwardRef } from "react";

type TextInputFormikPropType = FieldHookConfig<string> & {
  label?: string;
  forwadedRef?: Ref<any>;
};
const TextInputFromik: FC<TextInputFormikPropType> = (props) => {
  const [field, meta] = useField(props);
  const { label, type, placeholder } = props;
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        style={{
          border: "1px solid black",
        }}
        ref={props.forwadedRef}
        type={type}
        placeholder={placeholder}
        className="text-input"
        {...field}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};
const RefForwardedTextInputFormik = forwardRef<any, TextInputFormikPropType>(
  (props, ref) => <TextInputFromik {...props} forwadedRef={ref} />
);
RefForwardedTextInputFormik.displayName = "TextInputFormik";
export default RefForwardedTextInputFormik;
