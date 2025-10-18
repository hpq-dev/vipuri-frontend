import { UserIcon } from "@/utils/icons";
import { KeyIcon, EmailIcon } from "@/utils/icons/account";
import type React from "react";

export interface IFormInputField {
  id: string;
  title: string;
  placeholder: string;
  type: HTMLInputElement["type"];
  icon?: React.ElementType;
}

export type IFormInput =
  | IFormInputField
  | {
      id: string;
      row: true;
      fields: IFormInputField[];
    };

export interface IAccountForm {
  title: string;
  description: string;
  inputs: IFormInput[];
  button: string;
  note?: string;
}

export const accountForms: IAccountForm[] = [
  {
    title: "Login",
    description:
      "Welcome back! Enter the email and password associated with your account to continue. " +
      "If you forgot your credentials, please contact our support team.",
    inputs: [
      {
        id: "email",
        title: "Email address",
        placeholder: "you@example.com",
        type: "email",
        icon: EmailIcon,
      },
      {
        id: "password",
        title: "Password",
        placeholder: "••••••••",
        type: "password",
        icon: KeyIcon,
      },
    ],
    button: "Log in",
    note: "New here? Create your account in seconds.",
  },
];

export const registerSteps: IAccountForm[] = [
  {
    title: "Create account",
    description:
      "Start by choosing a secure email and password. " +
      "Your password must be at least 8 characters long and contain both letters and numbers.",
    inputs: [
      {
        id: "email",
        title: "Email address",
        placeholder: "you@example.com",
        type: "email",
        icon: EmailIcon,
      },
      {
        id: "password",
        title: "Password",
        placeholder: "At least 8 characters",
        type: "password",
        icon: KeyIcon,
      },
      {
        id: "repeatPassword",
        title: "Confirm password",
        placeholder: "Re-type your password",
        type: "password",
        icon: KeyIcon,
      },
    ],
    button: "Continue",
  },
  {
    title: "Personal details",
    description:
      "Provide your character's legal name, nationality and date of birth. " +
      "This information will be used for in-game identification and cannot be changed later.",
    inputs: [
      {
        id: "nameRow",
        row: true,
        fields: [
          {
            id: "firstName",
            title: "First name",
            placeholder: "e.g. Alexandru",
            type: "text",
            icon: UserIcon,
          },
          {
            id: "lastName",
            title: "Last name",
            placeholder: "e.g. Popescu",
            type: "text",
            icon: UserIcon,
          },
        ],
      },
      {
        id: "nationality",
        title: "Nationality",
        placeholder: "Select nationality",
        type: "select",
        icon: UserIcon,
      },
      {
        id: "birthDate",
        title: "Date of birth",
        placeholder: "DD.MM.YYYY",
        type: "date",
      },
    ],
    button: "Finish",
    note: "Double-check everything—after creation, these details are permanent.",
  },
];

export const nationalities = [
  { value: "romanian", label: "Romanian", releasedBy: "S.P.C.E.P" },
  { value: "italian", label: "Italian", releasedBy: "Ministero Dell`Interno" },
  { value: "spanish", label: "Spanish", releasedBy: "Reino De España" },
  { value: "mexican", label: "Mexican", releasedBy: "I.F.E." },
  { value: "moroccan", label: "Moroccan", releasedBy: "Royaume Du Maroc" },
  {
    value: "german",
    label: "German",
    releasedBy: "Bundesrepublik Deutschland",
  },
  { value: "american", label: "American", releasedBy: "Department of State" },
  { value: "french", label: "French", releasedBy: "République Française" },
  {
    value: "russian",
    label: "Russian",
    releasedBy: "M.I.A.R.F.",
  },
  { value: "colombian", label: "Colombian", releasedBy: "R.N.E.C" },
] as const;
