import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import { FaSave } from "react-icons/fa";

import { toast } from "react-toastify";

const API = "http://localhost:5000/api/v1";

const EditIDCard = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    register,

    handleSubmit,

    reset,

    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  // ========================
  // GET ID CARD DATA
  // ========================

  const getIDCard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${API}/idcards/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const card = res.data.data;

      reset({
        employee: card.employee?._id,

        cardNumber: card.cardNumber,

        employeeCode: card.employeeCode,

        department: card.department,

        designation: card.designation,

        bloodGroup: card.bloodGroup,

        issueDate: card.issueDate?.substring(0, 10),

        expiryDate: card.expiryDate?.substring(0, 10),

        status: card.status,
      });
    } catch (error) {
      toast.error("ID Card Load Failed");
    }
  };

  useEffect(() => {
    getIDCard();
  }, []);

  // ========================
  // UPDATE
  // ========================

  const submitHandler = async (data) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.put(
        `${API}/idcards/${id}`,

        data,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("ID Card Updated Successfully");

      navigate("/idcard");
    } catch (error) {
      console.log(error);

      toast.error("Update Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
min-h-screen
bg-gray-100
p-6
"
    >
      <div
        className="
max-w-5xl
mx-auto
bg-white
rounded-xl
shadow-lg
p-8
"
      >
        <h1
          className="
text-2xl
font-bold
mb-6
"
        >
          Edit Employee ID Card
        </h1>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="
grid
grid-cols-1
md:grid-cols-2
gap-6
"
        >
          <input
            className="
border
rounded-lg
p-3
"
            placeholder="Card Number"
            {...register(
              "cardNumber",

              {
                required: true,
              },
            )}
          />

          <input
            className="
border
rounded-lg
p-3
"
            placeholder="Employee Code"
            {...register(
              "employeeCode",

              {
                required: true,
              },
            )}
          />

          <input
            className="
border
rounded-lg
p-3
"
            placeholder="Department"
            {...register(
              "department",

              {
                required: true,
              },
            )}
          />

          <input
            className="
border
rounded-lg
p-3
"
            placeholder="Designation"
            {...register(
              "designation",

              {
                required: true,
              },
            )}
          />

          <select
            className="
border
rounded-lg
p-3
"
            {...register(
              "bloodGroup",

              {
                required: true,
              },
            )}
          >
            <option>Select Blood Group</option>

            <option>A+</option>

            <option>A-</option>

            <option>B+</option>

            <option>B-</option>

            <option>O+</option>

            <option>O-</option>

            <option>AB+</option>

            <option>AB-</option>
          </select>

          <input
            type="date"
            className="
border
rounded-lg
p-3
"
            {...register("issueDate")}
          />

          <input
            type="date"
            className="
border
rounded-lg
p-3
"
            {...register("expiryDate")}
          />

          <select
            className="
border
rounded-lg
p-3
"
            {...register("status")}
          >
            <option>Active</option>

            <option>Inactive</option>

            <option>Blocked</option>
          </select>

          <div
            className="
md:col-span-2
flex
justify-end
"
          >
            <button
              disabled={loading}
              className="
bg-blue-600
text-white
px-6
py-3
rounded-lg
flex
items-center
gap-2
"
            >
              <FaSave />

              {loading ? "Updating..." : "Update ID Card"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditIDCard;
