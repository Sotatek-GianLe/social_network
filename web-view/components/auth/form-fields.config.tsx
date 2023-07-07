import { IField } from "../commons/Form";

export const fieldsLogin: IField[] = [
  {
    label: "Your email",
    name: "email",
    type: "text",
    placeHolder: "Your email",
    validation: "Must be required",
  },
  {
    label: "Your password",
    name: "password",
    type: "password",
    placeHolder: "Your password",
    validation: "Must be required",
  },
];

export const fieldsRegister: IField[] = [
  {
    label: "Your email",
    name: "email",
    type: "text",
    placeHolder: "Your email",
    validation: "Must be required",
  },
  {
    label: "Your password",
    name: "password",
    type: "password",
    placeHolder: "Your password",
    validation: "Must be required",
  },
  {
    label: "Your name",
    name: "userName",
    type: "text",
    placeHolder: "Your name",
    validation: "Must be required",
  }
];
