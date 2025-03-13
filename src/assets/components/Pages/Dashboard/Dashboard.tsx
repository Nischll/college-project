import OverallInventory from "../Inventory/OverallInventory";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const fetchDashboardData = async () => {
  const category = await axios.get("http://localhost:3000/product/category/count");
  const product = await axios.get("http://localhost:3000/product/count");
  const productAmount = await axios.get("http://localhost:3000/product/amount");
  const lowStocks = await axios.get("http://localhost:3000/product/stocks/low");
  const sales = await axios.get("http://localhost:3000/sales/summary/last7days");

  return {
    categories: category.data.no_of_category,
    products: product.data.no_of_product,
    totalAmount: productAmount.data.total_product_amount,
    lowStocks: lowStocks.data.total_low_stocks,
    salesTransactions: sales.data.no_of_sales_transaction,
    salesAmount: sales.data.total_sales_amount,
  };
};

const COLORS = ["#8884d8", "#82ca9d"];

const Dashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: fetchDashboardData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data!</div>;

  const summaryData = [
    { name: "Categories", value: data.categories },
    { name: "Products", value: data.products },
    { name: "Low Stocks", value: data.lowStocks },
    { name: "Sales Transactions", value: data.salesTransactions },
  ];

  const amountData = [
    { name: "Total Product Price (Rs.)", value: parseFloat(data.totalAmount) },
    { name: "Total Sales Price (Rs.)", value: parseFloat(data.salesAmount) },
  ];

  return (
    <>
      <OverallInventory />
      <main className="bg-white h-[calc(100vh-250px)] rounded-lg py-2 px-2 mt-3">
        <h2 className="h-[30px] font-medium text-[20px] leading-[30px] text-[#383E49]">Dashboard Summary</h2>

       <div className="flex justify-between items-center gap-2 h-[calc(100vh-320px)]">
       <div className="w-2/3 shadow-md px-4">
       <h3 className="text-center text-md font-semibold mb-4">Summary Statistics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={summaryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
       </div>

        <div className="w-2/6 shadow-md px-4">
        <h3 className="text-center text-md font-semibold mb-4">Amount Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={amountData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#82ca9d" label={({value }) => `Rs.${value}`}>
              {amountData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        </div>
       </div>
      </main>
    </>
  );
};

export default Dashboard;
