"use client";

import DialogWrapper from "@/app/components/shared/DialogWrapper";
import Message from "@/app/components/shared/Message";
import callApi from "@/services/callApi";
import EnumInputList from "./EnumInputList";
import { setCategoryParent } from "@/store/slice/CategoryAdminSlice";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";

const validationSchema = yup.object({
  title: yup
    .string("Enter option title")
    .min(3, "option title should be of minimum 3 characters length")
    .required("option title is required"),
  key: yup
    .string("Enter option key")
    .min(3, "option key should be of minimum 3 characters length")
    .required("option key is required"),
  required: yup
    .string("Enter option required")
    .required("option required is required"),
  type: yup.string("Enter option type").required("option type is required"),
});

const AddOptionForm = ({ open, setOpen, selectedRow }) => {
  const [enumList, setEnumList] = useState([]);
  const [addEnumInput, setAddEnumInput] = useState("");
  const [message, setMessage] = useState({ message: null, type: null });
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      key: "",
      required: "",
      type: "",
      enum: enumList,
      category: selectedRow?._id || null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);

      try {
        const result = await callApi().post("/Option", values, {
          headers: {
            Accept: "application/json",
          },
        });
        if (result.status == 201) {
          setOpen(false);
          setMessage({ message: result.data.message, type: "success" });
        }
      } catch (error) {
        setMessage({
          message: error.response?.data?.message,
          type: "error",
        });
      }
    },
  });

  useEffect(() => {
    formik.setFieldValue("category", selectedRow?._id || null);
    formik.setFieldValue("enum", enumList || null);
  }, [selectedRow, enumList]);

  const dialogActions = (
    <Button variant="contained" type="submit">
      تایید
    </Button>
  );
  const typeList = [
    { id: 1, name: "number" },
    { id: 2, name: "string" },
    { id: 3, name: "array" },
    { id: 4, name: "boolean" },
  ];
  const addEnumHandler = () => {
    if (addEnumInput !== "") {
      setEnumList([
        ...enumList,
        {
          id: uuidv4(),
          name: addEnumInput,
        },
      ]);
      setAddEnumInput("");
    }
  };
  const addEnumInputChangeHandler = (event) => {
    setAddEnumInput(event.target.value);
  };
  return (
    <>
      <DialogWrapper
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={formik.handleSubmit}
        title={`ساخت آپشن جدید ${
          selectedRow ? `برای ${selectedRow?.name}` : ""
        }`}
        actions={dialogActions}
      >
        <div className="flex flex-col w-[380px]">
          <TextField
            id="title"
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            sx={{ marginTop: 3 }}
            id="key"
            name="key"
            label="Key"
            value={formik.values.key}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.key && Boolean(formik.errors.key)}
            helperText={formik.touched.key && formik.errors.key}
          />
          <FormControl fullWidth sx={{ marginTop: 3 }}>
            <InputLabel
              id="required-label"
              color={formik.touched.required ? "error" : "primary"}
            >
              Required
            </InputLabel>
            <Select
              id="required"
              labelId="required-label"
              label="required"
              name="required"
              value={formik.values.required}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.required && Boolean(formik.errors.required)}
            >
              <MenuItem value={true}>true</MenuItem>
              <MenuItem value={false}>false</MenuItem>
            </Select>
            <FormHelperText error>
              {formik.touched.required && formik.errors.required}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth sx={{ marginY: 3 }}>
            <InputLabel
              id="type-label"
              color={formik.touched.type ? "error" : "primary"}
            >
              Type
            </InputLabel>
            <Select
              id="type"
              labelId="type-label"
              label="Type"
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.type && Boolean(formik.errors.type)}
            >
              {typeList.map((item) => (
                <MenuItem key={item.id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error>
              {formik.touched.type && formik.errors.type}
            </FormHelperText>
          </FormControl>
          {formik.values.type == "array" && (
            <>
              <EnumInputList enumList={enumList} setEnumList={setEnumList} />
              <Stack direction="row">
                <Button
                  endIcon={<AddIcon />}
                  variant="text"
                  size="small"
                  color="primary"
                  onClick={addEnumHandler}
                >
                  add
                </Button>
                <TextField
                  fullWidth
                  id="addEnum"
                  name="addEnum"
                  label="Enum"
                  value={addEnumInput}
                  onChange={addEnumInputChangeHandler}
                />
              </Stack>
              {<input value={enumList} readOnly hidden />}
            </>
          )}
          {selectedRow && <input value={selectedRow._id} readOnly hidden />}
        </div>
      </DialogWrapper>
      {message.message && (
        <Message message={message.message} variant={message.type} />
      )}
    </>
  );
};

export default AddOptionForm;
