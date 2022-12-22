import { Field, FieldProps, useField } from "formik";
import { FC } from "react";
import Select, { OnChangeValue, Options } from "react-select";
import Option from "~/models/Data/Option";

interface FormikSelectProps extends FieldProps {
  options: Options<Option>;
  isMulti?: boolean;
  label: string;
}

const FormikSelect = ({
  field,
  form,
  options,
  isMulti = false,
  label,
}: FormikSelectProps) => {
  const [_, meta] = useField(field.name);
  const onChange = (option: OnChangeValue<Option | Option[], boolean>) => {
    form.setFieldValue(
      field.name,
      isMulti
        ? (option as Option[]).map((item: Option) => item.value)
        : (option as Option).value
    );
  };
  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter((option) => field.value.indexOf(option.value) >= 0)
        : options.find((option) => option.value === field.value);
    } else {
      return isMulti ? [] : ("" as any);
    }
  };
  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      <Select
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            maxWidth: "max-content",
          }),
        }}
        name={field.name}
        value={getValue()}
        onChange={onChange}
        options={options}
        isMulti={isMulti}
      />
      {meta?.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

interface FormikSelectWrapperProps {
  isMulti?: boolean;
  options: Options<Option>;
  label?: string;
  name: string;
}

const SelectFormikWrapper: FC<FormikSelectWrapperProps> = (props) => {
  return (
    <Field
      isMulti={props.isMulti}
      name={props.name}
      component={FormikSelect}
      options={props.options}
      label={props.label}
    />
  );
};
export default SelectFormikWrapper;
