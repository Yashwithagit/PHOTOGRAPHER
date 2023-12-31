"use client";
import React, { ChangeEvent, useState } from "react";
import {
  CardContainer,
  CardHeader,
  FormContainer,
  FormField,
  FormFieldIcon,
  FormFieldInput,
  LinkContainer,
  LinkText,
  SubmitButton,
} from "@/styles/globalStyles";
import Link from "next/link";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { BsLink, BsGenderAmbiguous } from "react-icons/bs";
import { FaRegAddressCard } from "react-icons/fa";
import { API_BASE_PATH, addPhotographer } from "@/lib/apiPath";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { styled } from "styled-components";

interface signUpProps {
  email?: string;
  password?: string;
  confirm_password?: string;
  first_name?: string;
  last_name?: string;
  address?: string;
  image: File | null;
  website_link?: string;
  gender?: string;
}
const SignUp = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    address: "",
    website_link: "",
    gender: "",
    image: null,
  });
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null as any;

    setLogin({ ...login, image: selectedFile });
  };
  const router = useRouter();
  const formValidation = (data: signUpProps) => {
    if (data.password === data.confirm_password) {
      return true;
    } else {
      Swal.fire({
        icon: "warning",
        title: "info",
        text: "Password should match",
      });
      return false;
    }
  };

  const handleSubmit = async (event: any) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    if (formValidation(login)) {
      const formData = new FormData();

      formData.append("image", login?.image ? login?.image : "");
      formData.append("email", login?.email ? login?.email : "");
      formData.append("password", login?.password ? login?.password : "");
      formData.append("first_name", login?.first_name ? login?.first_name : "");
      formData.append("last_name", login?.last_name ? login?.last_name : "");
      formData.append("address", login?.address ? login?.address : "");
      formData.append(
        "website_link",
        login?.website_link ? login?.website_link : ""
      );
      formData.append("gender", login?.gender ? login?.gender : "");
      formData.append(
        "unique_id",
        String(Math.floor(Math.random() * (100 - 1 + 1)) + 1)
      );

      await axios
        .post(API_BASE_PATH + addPhotographer, formData, {
          headers: { "content-type": "application/x-www-form-urlencoded" },
        })
        .then(
          (response) => {
            if (response.data.responseCode === 100001) {
              Swal.fire({
                icon: "success",
                title: "success",
                showConfirmButton: false,
                timer: 1000,
              }).then((result) => {
                if (result.isDismissed) {
                  /* Read more about handling dismissals below */

                  router.push("/login");
                }
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "User Already exists",
                showConfirmButton: true,
              });
            }
          },
          (error) => {
            Swal.fire({
              icon: "error",
              title: `${error}`,
              showConfirmButton: true,
            });
          }
        );
    }
  };

  return (
    <>
      <CardContainer width="45%">
        <CardHeader>Sign UP</CardHeader>

        <FormContainer onSubmit={handleSubmit}>
          <FormFieldOuterContainer>
            <FormFieldContainer>
              <FormField>
                <FormFieldIcon>
                  <AiOutlineUser />
                </FormFieldIcon>
                <FormFieldInput
                  type="text"
                  required
                  placeholder="First Name"
                  name="first_name"
                  onChange={(e) =>
                    setLogin({ ...login, first_name: e.target.value })
                  }
                />
              </FormField>
              <FormField>
                <FormFieldIcon>
                  <AiOutlineUser />
                </FormFieldIcon>
                <FormFieldInput
                  type="text"
                  required
                  placeholder="Last Name"
                  name="last_name"
                  onChange={(e) =>
                    setLogin({ ...login, last_name: e.target.value })
                  }
                />
              </FormField>
              <FormField>
                <FormFieldIcon>
                  <BsGenderAmbiguous />
                </FormFieldIcon>
                <FormFieldInput
                  type="text"
                  required
                  placeholder="Gender"
                  name="gender"
                  onChange={(e) =>
                    setLogin({ ...login, gender: e.target.value })
                  }
                />
              </FormField>
              <FormField>
                <FormFieldIcon>
                  <FaRegAddressCard />
                </FormFieldIcon>
                <FormFieldInput
                  type="text"
                  required
                  placeholder="Address"
                  name="address"
                  onChange={(e) =>
                    setLogin({ ...login, address: e.target.value })
                  }
                />
              </FormField>
            </FormFieldContainer>
            <FormFieldContainer>
              <FormField>
                <FormFieldIcon>
                  <MdIcons.MdEmail />
                </FormFieldIcon>
                <FormFieldInput
                  type="email"
                  required
                  placeholder="Email"
                  name="email"
                  onChange={(e) =>
                    setLogin({ ...login, email: e.target.value })
                  }
                />
              </FormField>
              <FormField>
                <FormFieldIcon>
                  <RiIcons.RiLockPasswordFill />
                </FormFieldIcon>
                <FormFieldInput
                  type="password"
                  name="password"
                  required
                  placeholder="Password"
                  onChange={(e) =>
                    setLogin({ ...login, password: e.target.value })
                  }
                />
              </FormField>
              <FormField>
                <FormFieldIcon>
                  <RiIcons.RiLockPasswordFill />
                </FormFieldIcon>
                <FormFieldInput
                  type="password"
                  name="confirm_password"
                  required
                  placeholder="Confirm Password"
                  onChange={(e) =>
                    setLogin({ ...login, confirm_password: e.target.value })
                  }
                />
              </FormField>
              <FormField>
                <FormFieldIcon>
                  <BsLink />
                </FormFieldIcon>
                <FormFieldInput
                  type="url"
                  required
                  placeholder="Website Link"
                  name="website_link"
                  onChange={(e) =>
                    setLogin({ ...login, website_link: e.target.value })
                  }
                />
              </FormField>
            </FormFieldContainer>
          </FormFieldOuterContainer>
          <FormFieldOuterContainer>
            <FieldLabel>Upload Photo</FieldLabel>
            <FormFieldInput
              type="file"
              required
              placeholder="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange
              }
            />
          </FormFieldOuterContainer>
          <SubmitButton type="submit">SIGN UP</SubmitButton>
        </FormContainer>
        <LinkContainer>
          Already have account?
          <Link href={"/login"}>
            <LinkText>Login </LinkText>
          </Link>
        </LinkContainer>
      </CardContainer>
    </>
  );
};

export default SignUp;
const FormFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const FormFieldOuterContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const FieldLabel = styled.label`
  padding: 0.3rem 0rem;
  margin: auto 0.3rem;
  text-align: left;
  white-space: nowrap;
  width: 6rem;
`;
