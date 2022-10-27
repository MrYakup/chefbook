import React from 'react'
import { useFormik } from "formik";
import FormSchema from './Validations'

export default function Form() {
  const {handleSubmit,handleChange, handleBlur,values,errors,touched} = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      enquiry: "",
      message: "",
    },
    onSubmit: (values) => {
      console.log(values);
      
    },
    validationSchema: FormSchema
  });

  return (
        <div className="w-full px-4 sm:grid sm:items-center md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <div className="hidden rounded-2xl lg:block lg:h-full">
            <img className="w-full h-full rounded-2xl object-cover object-center " src="/photos/contactimg.svg" alt="" />
          </div>
          <div className="md:col-span-2 xl:pr-2 ">
            <form onSubmit={handleSubmit} action="#" method="POST" >
              <div className="shadow-md overflow-hidden sm:rounded-md ">
                <div className="py-5 px-2 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="name"
                        className="inline-block text-sm pr-2 font-medium text-gray-700"
                      >
                        NAME
                      </label>
                      { errors.name && touched.name && (<div className="absolute inline-block text-red-500 text-sm bg-red-50 rounded-md px-1 shadow-md" >{errors.name}</div>)}
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="given-name"
                        placeholder="Enter your name..."
                        className="mt-1 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-lg indent-3"
                      />
                      
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="email"
                        className="inline-block text-sm pr-2 font-medium text-gray-700"
                      >
                        EMAIL ADDRESS
                      </label>
                      { errors.email && touched.email && (<div className="absolute inline-block text-red-500 text-sm bg-red-50 rounded-md px-1 shadow-md" >{errors.email}</div>)}
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        name="email"
                        id="email"
                        autoComplete="email"
                        placeholder="Your email address..."
                        className="mt-1 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-lg indent-3"
                      />
                    
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="subject"
                        className="inline-block text-sm pr-2 font-medium text-gray-700"
                      >
                        SUBJECT
                      </label>
                      { errors.subject && touched.subject && (<div className="absolute inline-block text-red-500 text-sm bg-red-50 rounded-md px-1 shadow-md" >{errors.subject}</div>)}
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        name="subject"
                        id="subject"
                        autoComplete="subject"
                        placeholder="Enter subject..."
                        className="mt-1 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-lg indent-3"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="enquiry"
                        className="inline-block text-sm pr-2 font-medium text-gray-700"
                      >
                        ENQUIRY TYPE
                      </label>
                      { errors.enquiry && touched.enquiry && (<div className="absolute inline-block text-red-500 text-sm bg-red-50 rounded-md px-1 shadow-md" >{errors.enquiry}</div>)}
                      <select
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="enquiry"
                        name="enquiry"
                        autoComplete="enquiry"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>Advertising</option>
                        <option>Cooking</option>
                        <option>Blog</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="message"
                        className="inline-block text-sm pr-2 font-medium text-gray-700"
                      >
                        MESSAGES
                      </label>
                      { errors.message && touched.message && (<div className="absolute inline-block text-red-500 text-sm bg-red-50 rounded-md px-1 shadow-md" >{errors.message}</div>)}
                      <div className="mt-1">
                        <textarea
                          onChange={handleChange}
                          onBlur={handleBlur}
                          id="message"
                          name="message"
                          rows={3}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full h-36 sm:text-sm border border-gray-300 rounded-2xl indent-3"
                          placeholder="Enter your messages..."
                          defaultValue={""}
                        />
                      </div>
                      
                    </div>
                  </div>
                </div>
                <div className="flex justify-center px-4 py-3 bg-gray-50">
                  <button
                    type="submit"
                    className="w-11/12 py-3 px-12 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-black hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
  );
}
