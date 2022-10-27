import React, { useEffect, useState } from "react";
import { useAddNewUserMutation } from "../../users/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import axios from "axios";

axios.defaults.withCredentials = true;
const Register = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  // console.log("asdsad",countries.name.common)
  const defaultValues = {
    name: "",
    email: "",
    username: "",
    password: "",
    birthday: null,
    country: null,
    accept: false,
  };

  const getCountries = async () => {
    const { data } = await axios("https://restcountries.com/v2/all");
    // console.log(data)
    setCountries(data);
  };

  useEffect(() => {
    getCountries();
  }, []);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    setFormData(data);
    setShowMessage(true);
    console.log(data);
    addNewUser(data); 
    reset();
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => {
          setShowMessage(false);
          navigate("/login");
        }}
      />
    </div>
  );
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      {/* <Divider /> */}
      {/* <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul> */}
    </React.Fragment>
  );

  const selectedCountryTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex gap-1">
          <img
            alt={option.name}
            src={`${option.flags.svg}`}
            onError={(e) =>
              (e.target.src =
                "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
            }
            className={`w-8 h-6`}
          />
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const countryOptionTemplate = (option) => {
    return (
      <div className="flex gap-1 w-8">
        <img
          alt={option.name}
          src={`${option.flags.svg}`}
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          className={`w-8 h-8 rounded-full`}
        />
        <div>{option.name}</div>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center">
      <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="top"
        footer={dialogFooter}
        showHeader={false}
        breakpoints={{ "960px": "80vw" }}
        style={{ width: "94vw" }}
      >
        <div className="flex justify-center flex-col pt-6 px-3">
          <div className="flex items-center gap-2">
            <i
              className="pi pi-check-circle"
              style={{ fontSize: "5rem", color: "var(--green-500)" }}
            ></i>
            <h5>Registration Successful!</h5>
          </div>
          <p
            className="text-justify"
            style={{ lineHeight: 1.5, textIndent: "1rem" }}
          >
            Your account is registered under name <b className="text-green-600">{formData.name}</b> ; it'll
            be valid next 30 days without activation. Please check{" "}
            <b className="text-green-600">{formData.email}</b> for activation instructions.
          </p>
        </div>
      </Dialog>

      <div className="flex justify-center items-center pt-12 mx-4">
        <div className="border p-2 py-4 rounded-xl shadow-lg bg-gray-100">
          <h5 className="text-center">Register</h5>
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
            <div className="mb-5">
              <span className="p-float-label">
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Name is required." }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      autoFocus
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="name"
                  className={classNames({ "p-error": errors.name })}
                >
                  Name
                </label>
              </span>
              {getFormErrorMessage("name")}
            </div>
            <div className="mb-5">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-envelope" />
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required.",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address. E.g. example@email.com",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="email"
                  className={classNames({ "p-error": !!errors.email })}
                >
                  Email
                </label>
              </span>
              {getFormErrorMessage("email")}
            </div>

            <div className="mb-5">
              <span className="p-float-label">
                <Controller
                  name="username"
                  control={control}
                  rules={{ required: "Username is required." }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="username"
                  className={classNames({ "p-error": errors.username })}
                >
                  Username
                </label>
              </span>
              {getFormErrorMessage("username")}
            </div>

            <div className="mb-5">
              <span className="p-float-label">
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Password is required." }}
                  render={({ field, fieldState }) => (
                    <Password
                      id={field.name}
                      {...field}
                      toggleMask
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                      header={passwordHeader}
                      footer={passwordFooter}
                    />
                  )}
                />
                <label
                  htmlFor="password"
                  className={classNames({ "p-error": errors.password })}
                >
                  Password
                </label>
              </span>
              {getFormErrorMessage("password")}
            </div>
            <div className="grid grid-flow-col grid-cols-12 mb-2">
              <div className="field col-span-5">
                <span className="p-float-label">
                  <Controller
                    name="birthday"
                    control={control}
                    render={({ field }) => (
                      <Calendar
                        id={field.name}
                        value={field.value}
                        onChange={(e) => field.onChange(e.value)}
                        dateFormat="dd/mm/yy"
                        mask="99/99/9999"
                        showIcon
                      />
                    )}
                  />
                  <label htmlFor="birthday">Birthday</label>
                </span>
              </div>
              <div className="field col-span-7">
                <span className="p-float-label">
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <Dropdown
                        id={field.name}
                        value={field.value}
                        options={countries}
                        onChange={(e) => field.onChange(e.value)}
                        optionLabel="name"
                        filter
                        showClear
                        filterBy="name"
                        placeholder="Select a Country"
                        valueTemplate={selectedCountryTemplate}
                        itemTemplate={countryOptionTemplate}
                      />
                    )}
                  />
                  <label htmlFor="country">Country</label>
                </span>
              </div>
            </div>
            <div className="field-checkbox flex gap-2 items-center pb-4">
              <Controller
                name="accept"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <Checkbox
                    inputId={field.name}
                    onChange={(e) => field.onChange(e.checked)}
                    checked={field.value}
                    className={classNames({ "p-invalid": fieldState.invalid })}
                  />
                )}
              />
              <label
                htmlFor="accept"
                className={classNames({ "p-error": errors.accept })}
              >
                I agree to the terms and conditions
              </label>
            </div>

            <Button type="submit" label="Submit" className="mt-2" />
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
