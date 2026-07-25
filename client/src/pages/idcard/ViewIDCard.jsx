import React, { useEffect, useRef, useState } from "react";

import axios from "axios";

import { useParams } from "react-router-dom";

import { FaUser, FaIdCard, FaPrint } from "react-icons/fa";

import { QRCodeCanvas } from "qrcode.react";

import { toast } from "react-toastify";

const API = "http://localhost:5000/api/v1";

const ViewIDCard = () => {
  const { id } = useParams();

  const printRef = useRef();

  const [card, setCard] = useState(null);

  const [loading, setLoading] = useState(true);

  // ========================
  // GET SINGLE ID CARD
  // ========================

  const fetchCard = async () => {
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

      setCard(res.data.data);
    } catch (error) {
      console.log(error);

      toast.error("ID Card Load Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCard();
  }, []);

  // ========================
  // PRINT
  // ========================

  const printCard = () => {
    const content = printRef.current.innerHTML;

    const win = window.open("", "", "width=800,height=700");

    win.document.write(`

<html>

<head>

<style>

body{

display:flex;
justify-content:center;
font-family:Arial;

}

</style>

</head>


<body>


${content}


</body>


</html>

`);

    win.document.close();

    win.print();
  };

  if (loading) {
    return (
      <div
        className="
p-10
text-center
"
      >
        Loading ID Card...
      </div>
    );
  }

  if (!card) {
    return (
      <div
        className="
p-10
text-center
"
      >
        ID Card Not Found
      </div>
    );
  }

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
max-w-xl
mx-auto
bg-white
shadow-lg
rounded-xl
p-6
"
      >
        <div
          className="
flex
justify-between
items-center
mb-6
"
        >
          <h1
            className="
text-2xl
font-bold
flex
gap-2
items-center
"
          >
            <FaIdCard />
            ID Card
          </h1>

          <button
            onClick={printCard}
            className="
bg-green-600
text-white
px-5
py-3
rounded-lg
flex
gap-2
items-center
"
          >
            <FaPrint />
            Print
          </button>
        </div>

        <div
          ref={printRef}
          className="
flex
justify-center
"
        >
          <div
            className="
w-[350px]
bg-white
rounded-2xl
shadow-xl
border
overflow-hidden
"
          >
            {/* HEADER */}

            <div
              className="
bg-blue-700
text-white
text-center
p-5
"
            >
              <h2
                className="
text-2xl
font-bold
"
              >
                OLECTRA
              </h2>

              <p>Employee Identity Card</p>
            </div>

            {/* PHOTO */}

            <div
              className="
flex
justify-center
mt-6
"
            >
              <div
                className="
w-28
h-28
bg-gray-200
rounded-full
flex
items-center
justify-center
border-4
border-blue-600
"
              >
                <FaUser size={45} />
              </div>
            </div>

            {/* NAME */}

            <div
              className="
text-center
mt-4
"
            >
              <h2
                className="
font-bold
text-xl
"
              >
                {card.employee?.name}
              </h2>

              <p
                className="
text-blue-600
font-semibold
"
              >
                {card.designation}
              </p>
            </div>

            {/* DETAILS */}

            <div
              className="
p-6
space-y-3
text-sm
"
            >
              <p>
                <b>Employee Code:</b> {card.employeeCode}
              </p>

              <p>
                <b>Department:</b> {card.department}
              </p>

              <p>
                <b>Blood Group:</b> {card.bloodGroup}
              </p>

              <p>
                <b>Expiry:</b> {new Date(card.expiryDate).toLocaleDateString()}
              </p>
            </div>

            {/* QR */}

            <div
              className="
flex
justify-center
pb-5
"
            >
              <QRCodeCanvas
                value={JSON.stringify({
                  name: card.employee?.name,

                  code: card.employeeCode,

                  card: card.cardNumber,
                })}
                size={90}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewIDCard;
