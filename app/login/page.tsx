"use client";
import React, { useState } from "react";
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
import { API_BASE_PATH, adminLogin } from "@/lib/apiPath";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Table from "app/component/Table";
import { TypeList } from "@/lib/constant";
import SelectField from "app/component/HouseFormComponent/SelectField";


const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
    type: 1,

  });
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    const formData = {
      path: adminLogin,
      name: login?.email,
      password: login?.password,
    };

    await axios
      .post(API_BASE_PATH + adminLogin, formData, {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
      .then(
        (response) => {
          if (response.data.responseCode === 100001) {
            Swal.fire({
              icon: 'success',
              title: 'success',
              showConfirmButton: false,
              timer: 1000
            }).then((result) => {
              if (result.isDismissed) {
                /* Read more about handling dismissals below */
                localStorage.setItem("token", response.data.responseData[0].user_id);
                localStorage.setItem("type", JSON.stringify(login.type));
                router.push("/dashBoard");
              }
            })

          } else {
            Swal.fire({
              icon: 'error',
              title: 'Invalid user',
              showConfirmButton: true,
             
            })
          }
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: `${error}`,
            showConfirmButton: true,
           
          })
        }
      );
  };

  return (
    <>

      <CardContainer>

        <CardHeader>Login</CardHeader>
        <h4>Admin Panel</h4>
        <FormContainer onSubmit={handleSubmit}>
        <SelectField
        initialValue={login.type}
name={"type"}
type={"select"}
label={""}
onChange={(e: { target: { value: any; }; }) =>{console.log(e.target.value);
 setLogin({ ...login, type: e.target.value })}}

options={TypeList}
/>
          <FormField>
            <FormFieldIcon>
              <MdIcons.MdEmail />
            </FormFieldIcon>
            <FormFieldInput
              type="text"
              required
              placeholder="Email"
              name="email"
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
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
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
            />
          </FormField>


          <SubmitButton type="submit">LOGIN</SubmitButton>

        </FormContainer>
        {login.type==2 && <LinkContainer>
          Don&#x27;t have account?
          <Link href={"/signUp"}>
            <LinkText>Signup </LinkText>
          </Link>
        </LinkContainer>}
       
      </CardContainer>
    </>
  );
};

export default Login;

