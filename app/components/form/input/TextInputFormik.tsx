import { FieldHookConfig, useField } from "formik";
import { FC, forwardRef, Ref } from "react";

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

export default forwardRef<any, TextInputFormikPropType>((props, ref) => (
  <TextInputFromik {...props} forwadedRef={ref} />
));
