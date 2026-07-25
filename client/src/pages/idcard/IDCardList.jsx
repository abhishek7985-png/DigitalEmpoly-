import React, { useEffect, useState } from "react";

import { getIDCards, deleteIDCard } from "../../api/idCardApi";
import { FaEye, FaEdit, FaTrash, FaSearch, FaIdCard } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const API = "http://localhost:5000/api/v1";

const IDCardList = () => {
  const navigate = useNavigate();

  const [cards, setCards] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  // =====================
  // GET ALL ID CARDS
  // =====================

  const fetchIDCards = async () => {
    try {
      setLoading(true);

      const res = await getIDCards();

      setCards(res.data.data || []);
    } catch (error) {
      console.log(error);

      toast.error("ID Cards Load Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIDCards();
  }, []);

  // =====================
  // DELETE CARD
  // =====================

  const deleteCard = async (id) => {
    if (!window.confirm("Delete this ID Card?")) return;

    try {
      await deleteIDCard(id);

      toast.success("ID Card Deleted");

      fetchIDCards();
    } catch (error) {
      console.log(error);

      toast.error("Delete Failed");
    }
  };
  const filteredCards = cards.filter((card) => {
    const name = card.employee?.name || "";

    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      card.cardNumber?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div
      className="
p-6
bg-gray-100
min-h-screen
"
    >
      <div
        className="
bg-white
rounded-xl
shadow-lg
p-6
"
      >
        {/* HEADER */}

        <div
          className="
flex
justify-between
items-center
mb-6
"
        >
          <div
            className="
flex
items-center
gap-3
"
          >
            <div
              className="
bg-blue-600
text-white
p-3
rounded-lg
"
            >
              <FaIdCard size={25} />
            </div>

            <div>
              <h1
                className="
text-2xl
font-bold
"
              >
                Employee ID Cards
              </h1>

              <p
                className="
text-gray-500
"
              >
                Manage employee identity cards
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/idcard/create")}
            className="
bg-blue-600
text-white
px-5
py-3
rounded-lg
"
          >
            Create ID Card
          </button>
        </div>

        {/* SEARCH */}

        <div
          className="
mb-5
relative
"
        >
          <FaSearch
            className="
absolute
left-3
top-4
text-gray-400
"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="
Search employee or card number
"
            className="
w-full
border
rounded-lg
p-3
pl-10
"
          />
        </div>

        {/* TABLE */}

        <div
          className="
overflow-x-auto
"
        >
          <table
            className="
w-full
border-collapse
"
          >
            <thead>
              <tr
                className="
bg-gray-100
"
              >
                <th
                  className="
p-3
text-left
"
                >
                  Employee
                </th>

                <th
                  className="
p-3
text-left
"
                >
                  Card Number
                </th>

                <th
                  className="
p-3
text-left
"
                >
                  Department
                </th>

                <th
                  className="
p-3
text-left
"
                >
                  Status
                </th>

                <th
                  className="
p-3
text-center
"
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredCards.map((card) => (
                <tr
                  key={card._id}
                  className="
border-b
hover:bg-gray-50
"
                >
                  <td
                    className="
p-3
"
                  >
                    {card.employee?.name || "-"}
                  </td>

                  <td
                    className="
p-3
"
                  >
                    {card.cardNumber}
                  </td>

                  <td
                    className="
p-3
"
                  >
                    {card.department}
                  </td>

                  <td
                    className="
p-3
"
                  >
                    <span
                      className="
px-3
py-1
rounded-full
text-sm
bg-green-100
text-green-700
"
                    >
                      {card.status}
                    </span>
                  </td>

                  <td
                    className="
p-3
flex
justify-center
gap-3
"
                  >
                    <button
                      onClick={() => navigate(`/idcard/view/${card._id}`)}
                      className="
text-blue-600
"
                    >
                      <FaEye />
                    </button>

                    <button
                      onClick={() => navigate(`/idcard/edit/${card._id}`)}
                      className="
text-yellow-600
"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => deleteCard(card._id)}
                      className="
text-red-600
"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IDCardList;
