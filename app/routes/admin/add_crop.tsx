import { FC, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form } from "@remix-run/react";
import TextInputFormik from "~/components/form/input/TextInputFormik";
import SelectFormik from "~/components/form/input/SelectFormik";

interface CropFormProps {
  cropId: string;
}

const CropFormValues = {
  cropName: "",
  suitableLandTypes: [],
  suitableRegions: [],
  suitableSeasons: [],
  pictures: [],
};
const LandTypes = [
  { value: "1", label: "Nehri" },
  { value: "2", label: "Sookhi" },
  { value: "3", label: "Behri" },
];

const CropForm: FC<CropFormProps> = ({ cropId }) => {
  const [images, setImages] = useState([]);
  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  const onSave = () => {};

  return (
    <div>
      <Formik
        initialValues={CropFormValues}
        validationSchema={{
          cropName: Yup.string(),
        }}
        onSubmit={(values, action) => {
          console.log(values);
        }}
      >
        <Form>
          <TextInputFormik name="cropName" label="Name" />
          <SelectFormik
            isMulti
            name="suitableLandTypes"
            options={LandTypes}
            label="Suitable Land Types"
          />
          <SelectFormik
            isMulti
            name="suitableRegions"
            options={ALL_REGIONS}
            label="Suitable Regions"
          />
          <SelectFormik
            isMulti
            name="suitableSeasons"
            options={ALL_SEASONS}
            label="Suitable Seasons"
          />
        </Form>
      </Formik>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        dataURLKey="data_url"
        maxNumber={10}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Add Pictures for Crop
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image["data_url"]} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
            <div>
              <button onClick={onSave}>Save</button>
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default CropForm;
