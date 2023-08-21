import { optionProps } from "@/lib/types";
import { Field, FieldArray, FieldArrayItem } from "houseform";
import React from "react";
import styled from "styled-components";

type Props = {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  onChange?: Function;
  initialValue?: any;
  options: Array<optionProps>;
};

const SelectField: React.FC<Props> = ({
  name,
  type,
  label,
  placeholder,
  onChange = () => { },
  options,
  initialValue
}) => {
 
  return (

    <Field<string> name={name} initialValue={initialValue}>
      {({ value, setValue, errors }) => (
      
        <>
          {value && setValue(value)}
          <Select
            defaultValue={initialValue}
            value={value}
            name={name}
            onChange={(e) => {
              setValue(e.target.value);
              onChange(e);
            }}
          >
            
            {options.map((option: any, index: number) => (
              <option key={index} value={option.value}>{option.label}</option>
            ))}
          </Select>
        </>
      )}
    </Field>
  );
};

export default SelectField;
const Select = styled.select`
  padding: 0.7rem 2.8rem;
  border-radius: 0.5rem;
  text-align: left;
  height: auto;
  border: 1px solid #999999;
  font-size: 0.8rem;
  background-color: #ffffff;
  -webkit-align-self: flex-start;
  -ms-flex-item-align: start;
  align-self: flex-start;
  outline: none;
  border: 1px solid #999999;
  margin-left: 0.5rem;
`;
