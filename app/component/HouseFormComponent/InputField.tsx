import { Field } from "houseform";
import React, { useEffect } from "react";
import styled from "styled-components";
import { z } from "zod";

type Props = {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  onChange?: Function;
  initialValue?: string;
  value?: string;
  onChangeValidate?: any;
  style?: any;
  width?: string;
  rows?: number;
  acceptType?: string;
};

const InputField: React.FC<Props> = ({
  name,
  type,
  label,
  placeholder,
  onChange = () => { },
  initialValue,
  value,
  onChangeValidate,
  style,
  width,
  rows,
  acceptType,
}) => {
  return (
    <Field<string>
      name={name}
      initialValue={initialValue}
      onChangeValidate={onChangeValidate}
    >
      {({ setValue, errors, props }) => (
        <>
          {value && setValue(value)}

          {type === "textArea" ? (
            <TextArea
              value={value}
              defaultValue={initialValue}
              name={name}
              rows={rows}
              onChange={(e: any) => {
                setValue(e.target.value);
                onChange(e);
              }}
              placeholder={placeholder}
              style={style}
            />
          ) : (
            <Input
              value={value}
              defaultValue={initialValue}
              name={name}
              type={type}
              width={width}
              onChange={(e: any) => {
                setValue(type === "file" ? e.target.files[0] : e.target.value);
                onChange(e);
              }}
              placeholder={placeholder}
              style={style}
              accept={acceptType}
            />
          )}
        </>
      )}
    </Field>
  );
};

export default InputField;
const Input = styled.input<Props>`
  padding: 0.7rem 0.8rem;
  border-radius: 0.5rem;
  width: ${(props) => (props.width ? props.width : "auto")};
  text-align: left;
  height: auto;
  border: 1px solid #999999;
  font-size: 0.8rem;
  background-color: #ffffff;
  -webkit-align-self: flex-start;
  -ms-flex-item-align: start;
  margin-left: 0.5rem;
  align-self: flex-start;
  outline: none;
  border: 1px solid #999999;
`;
const TextArea = styled.textarea`
  padding: 0.7rem 0.8rem;
  border-radius: 0.5rem;
  width: 20rem;
  text-align: left;
  height: auto;
  border: 1px solid #999999;
  font-size: 0.8rem;
  background-color: #ffffff;
  -webkit-align-self: flex-start;
  -ms-flex-item-align: start;
  margin-left: 0.5rem;
  align-self: flex-start;
  outline: none;
  border: 1px solid #999999;
`;
