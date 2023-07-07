import { yupResolver } from "@hookform/resolvers/yup";
import { forwardRef, Ref } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { MessageError } from "../commons/MessageError";

export interface IFormProps {
  fields: IField[];
  action?: (data: any) => void;
  actionName?: string;
  actionType?: "submit" | "reset";
  resolver : yup.ObjectShape;
}

export interface IField {
  label: string;
  type: string;
  name: string;
  placeHolder?: string;
  validation?: string;
  
}

export type FormDataLogin = {
  email: string;
  password: string;
  userName: string;
  // googleId?: string;
  // facebookId?: string;
  // imageUrl?: string;
};



const Form = forwardRef(
  (
    { fields, action, actionName, actionType,resolver }: IFormProps,
    ref: Ref<HTMLFormElement>
  ) => {
    const schema = yup.object().shape(resolver);
    const {
      handleSubmit,
      register,
      formState: { errors },
    } = useForm<FormDataLogin>({
      resolver: yupResolver(schema),
    });

    return (
      <>
        <form
          ref={ref}
          onSubmit={action && handleSubmit((data) => action(data))}
          autoComplete="off"
          className="space-y-4"
        >
          {!!fields.length &&
            fields.map((item: IField) => {
              return (
                <div key={item.name}>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {item.label}
                  </label>
                  <input
                  
                    type={item.type}
                    {...register(item.name as keyof FormDataLogin, { required: item.validation })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={item.placeHolder}
                  />
                  {errors[item.name as keyof FormDataLogin ]?.message && <>
                  <MessageError message={errors[item.name as keyof FormDataLogin ]?.message} />
                  </>}
                </div>
              );
            })}
          {action && (
            <button
              type={actionType}
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-centerw-full text-white bg-cyan-300 hover:bg-cyan-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              {actionName}
            </button>
          )}
        </form>
      </>
    );
  }
);

export default Form;
