import axios from "axios";
import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";

const AnimalForm = ({ setShowModal, getAnimal, editData = "" }) => {
  const user = JSON.parse(localStorage.getItem("user")) || null;

  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    location: "",
    age: 0,
    type: "",
    file: "",
  });
  const [image, setImage] = useState(null);
  const [err, setError] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const getAnimal = async () => {
      try {
        if (editData === "") return;
        const res = await axios.get(`/animal/` + editData, {
          headers: {
            token: "Bearer " + user.token,
          },
        });
        setInputs(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAnimal();
  }, [editData]);

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name is required!";
    }
    if (!values.description) {
      errors.description = "Description is required";
    }
    if (!values.location) {
      errors.location = "Location is required";
    }
    if (!values.age) {
      errors.age = "Age is required";
    }
    if (!values.type) {
      errors.type = "Type is required";
    }
    return errors;
  };

  const upload = async () => {
    if (!image) {
      return "";
    }
    try {
      const formData = new FormData();
      formData.append("file", image);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imgUrl = await upload();

    try {
      const errorVal = validate(inputs);
      if (Object.keys(errorVal).length !== 0) {
        setError(errorVal);
        return;
      }
      setShowModal(false);
      const config = {
        headers: {
          "Content-Type": "application/json",
          token: "Bearer " + user.token,
        },
      };

      const { data } = await axios.post(
        "/animal",
        {
          name: inputs.name,
          description: inputs.description,
          location: inputs.location,
          age: inputs.age,
          type: inputs.type,
          file: image ? imgUrl : "",
        },
        config
      );
      if (!data.errors) {
        toast.success(data.success.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        getAnimal();
        // window.location.reload(false);
      } else {
        setShowModal(true);
        toast.error(data.errors.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      const errorVal = validate(inputs);
      if (Object.keys(errorVal).length !== 0) {
        setError(errorVal);
        return;
      }
      setShowModal(false);
      const config = {
        headers: {
          "content-type": "application/json",
          token: "Bearer " + user.token,
        },
      };
      const { data } = await axios.put(
        `/animal/` + editData,
        {
          name: inputs.name,
          description: inputs.description,
          location: inputs.location,
          age: inputs.age,
          type: inputs.type,
          file: image ? imgUrl : inputs.file,
        },
        config
      );
      if (!data.errors) {
        toast.success(data.success.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        getAnimal();
        // window.location.reload(false);
      } else {
        setShowModal(true);
        toast.error(data.errors.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-9">
        {/* <!-- Contact Form --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <div className="flex w-full	justify-between">
              <h3 className="font-medium text-black dark:text-white">
                {editData ? " Update Animal" : "Add New Animal"}
              </h3>
              <button className="text-xl" onClick={() => setShowModal(false)}>
                X
              </button>
            </div>
          </div>
          <form action="#">
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Name <span className="text-meta-1">*</span>
                </label>
                <input
                  value={inputs.name}
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  onChange={handleChange}
                />
                {err?.name ? (
                  <p className="text-[#FF0000]">{err.name}</p>
                ) : (
                  <p>
                    <br />
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Description <span className="text-meta-1">*</span>
                </label>
                <textarea
                  value={inputs.description}
                  rows="3"
                  placeholder="Enter Description"
                  name="description"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  onChange={handleChange}
                />
                {err?.description ? (
                  <p className="text-[#FF0000]">{err.description}</p>
                ) : (
                  <p>
                    <br />
                  </p>
                )}
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Location <span className="text-meta-1">*</span>
                </label>
                <input
                  value={inputs.location}
                  type="text"
                  placeholder="Enter Location"
                  name="location"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  onChange={handleChange}
                />
                {err?.location ? (
                  <p className="text-[#FF0000]">{err.location}</p>
                ) : (
                  <p>
                    <br />
                  </p>
                )}
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Age <span className="text-meta-1">*</span>
                </label>
                <input
                  value={inputs.age}
                  type="number"
                  placeholder="Select Age"
                  name="age"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  onChange={handleChange}
                />
                {err?.age ? (
                  <p className="text-[#FF0000]">{err.age}</p>
                ) : (
                  <p>
                    <br />
                  </p>
                )}
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-black dark:text-white">
                  Attach file
                </label>
                <input
                  type="file"
                  name="file"
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Type <span className="text-meta-1">*</span>
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    value={inputs.type}
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    name="type"
                    onChange={handleChange}
                  >
                    <option value="">Select Animal Type</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                  </select>
                  <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                    <svg
                      className="fill-current"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill=""
                        ></path>
                      </g>
                    </svg>
                  </span>
                  {err?.type ? (
                    <p className="text-[#FF0000]">{err.type}</p>
                  ) : (
                    <p>
                      <br />
                    </p>
                  )}
                </div>
              </div>
              <button
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                onClick={!editData ? handleSubmit : handleUpdateSubmit}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AnimalForm;
