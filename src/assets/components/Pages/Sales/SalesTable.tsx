import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SalesTable = () => {
  const [sales, setSales] = useState([]);
  const [days, setDays] = useState("5");

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetchData();
  }, [days]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/sales?days=${days}`
      );
      setSales(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to Fetch Sales Data");
    }
  };

  const formatDate = (date: string) => {
    const newDate = new Date(date);
    return `${newDate.toLocaleDateString("en-GB")} ${newDate.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // This gives AM/PM format
    })}`;
  };

  return (
    <>
    <div className="bg-white h-full rounded-lg pt-2 px-2 space-y-2 space-x-2">
        <h1 className="text-2xl font-semibold text-left">
          Sales Table
        </h1>
      <button
        onClick={() =>
          window.open("http://localhost:3000/sales/daily/report", "_blank")
        }
        className="bg-green-600 px-4 py-2 text-white rounded-lg hover:bg-green-500"
      >
        Download Daily Report 📄
      </button>

      {/* Monthly Report Button */}
      <button
        onClick={() =>
          window.open(
            `http://localhost:3000/sales/monthly/report/${new Date().getMonth() + 1}`,
            "_blank"
          )
        }
        className="bg-blue-600 px-4 py-2 text-white rounded-lg hover:bg-blue-500"
      >
        Download Monthly Report 📅
      </button>

      {/* Yearly Report Button */}
      <button
        onClick={() =>
          window.open(`http://localhost:3000/sales/yearly/report/${currentYear}`, "_blank")
        }
        className="bg-red-600 px-4 py-2 text-white rounded-lg hover:bg-red-500"
      >
        Download Yearly Report 📆
      </button>
      <div className="flex justify-end my-3">
        <select
          onChange={(e) => setDays(e.target.value)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          <option value="5">Last 5 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="">All Sales</option> 
        </select>
      </div>

      <div className="h-[480px] overflow-y-scroll">
      <table className="table-auto w-full border-collapse border border-slate-500 ">
        <thead>
          <tr className="bg-slate-500 text-white">
            <th className="p-2 border border-slate-500">ID</th>
            <th className="p-2 border border-slate-500">Product Name</th>
            <th className="p-2 border border-slate-500">Quantity</th>
            <th className="p-2 border border-slate-500">Total Price</th>
            <th className="p-2 border border-slate-500">Sale Date</th>
          </tr>
        </thead>

        <tbody>
          {sales.length > 0 ? (
            sales.map((item: any, index: number) => (
              <tr key={item.id} className="even:bg-slate-100">
                <td className="p-2 border border-slate-500">{index + 1}</td>
                <td className="p-2 border border-slate-500">
                  {item.product_name}
                </td>
                <td className="p-2 border border-slate-500">
                  {item.sold_quantity}
                </td>
                <td className="p-2 border border-slate-500">
                  Rs. {item.total_price}
                </td>
                <td className="p-2 border border-slate-500">
                  {formatDate(item.sale_date)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-3">
                No Data Available 😢
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
    </>
  );
};

export default SalesTable;
