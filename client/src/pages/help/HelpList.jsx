import { useEffect, useState } from "react";

import { getHelp, deleteHelp } from "../../api/helpApi";

import { FiHelpCircle, FiTrash2, FiPlus } from "react-icons/fi";

import { Link } from "react-router-dom";

import { toast } from "react-toastify";

export default function HelpList() {
  const [help, setHelp] = useState([]);

  const load = async () => {
    try {
      const res = await getHelp();

      setHelp(res.data.data || []);
    } catch {
      toast.error("Load Failed");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    if (!window.confirm("Delete Help Topic?")) return;

    await deleteHelp(id);

    toast.success("Deleted");

    load();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <FiHelpCircle size={28} />

          <h1 className="text-3xl font-bold">Help Center</h1>
        </div>

        <Link
          to="/help/create"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg flex gap-2 items-center"
        >
          <FiPlus />
          Add Help
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {help.map((item) => (
          <div key={item._id} className="bg-white rounded-xl shadow p-6">
            <h2 className="font-bold text-xl">{item.title}</h2>

            <p className="text-blue-600 mt-2">{item.category}</p>

            <p className="mt-4 text-gray-600">{item.description}</p>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => remove(item._id)}
                className="bg-red-600 text-white p-2 rounded"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
