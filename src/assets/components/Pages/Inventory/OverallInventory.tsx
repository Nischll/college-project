import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const OverallInventory = () => {

  const fetchCategoryCount = async () => {
    const response = await axios.get('http://localhost:3000/product/category/count');
    return response.data.no_of_category;
  };
  const fetchTotalProduct = async () => {
    const response = await axios.get('http://localhost:3000/product/count');
    return response.data.no_of_product;
  };
  const fetchTotalProductAmount = async () => {
    const response = await axios.get('http://localhost:3000/product/amount');
    return response.data.total_product_amount;
  };
  const fetchTotalLowStocks = async () => {
    const response = await axios.get('http://localhost:3000/product/stocks/low');
    return response.data.total_low_stocks;
  };
  const fetchTotalSales = async () => {
    const response = await axios.get('http://localhost:3000/sales/summary/last7days');
    return response.data;
  };
  


  const { data: totalCategories} = useQuery({
    queryKey: ['categoryCount'],
    queryFn: fetchCategoryCount,
  });
  const { data: totalProducts} = useQuery({
    queryKey: ['productCount'],
    queryFn: fetchTotalProduct,
  });
  const { data: totalProductsAmount} = useQuery({
    queryKey: ['productAmount'],
    queryFn: fetchTotalProductAmount,
  });
  const { data: totalLowStocks} = useQuery({
    queryKey: ['lowStocks'],
    queryFn: fetchTotalLowStocks,
  });
  const { data: totalSales } = useQuery({
    queryKey: ['salesSummary'],
    queryFn: fetchTotalSales,
  });

  
  return (
    <>
    <header className="bg-white h-[140px] rounded-lg py-2 px-2">
      <h1 className="h-[30px] font-medium text-[20px] leading-[30px] text-[#383E49] w-[163px]">Overall Inventory</h1>
      <div className="grid grid-cols-10 mt-2 h-[85px]">
        <section className="col-span-1 flex flex-col gap-[12px] h-fit">
          <h1 className="font-semibold h-[22px] text-[16px] text-[#1570EF] leading-[24px]">Categories</h1>
          <span className="h-[16px] leading-[20px] font-semibold text-[16px] text-[#5D6679]">{totalCategories}</span>
          {/* <span className="h-[16px] font-normal text-[14px] leading-5 text-[#858D9D]">Last 7 days</span> */}
        </section>
        <section className="col-start-3 col-end-5 flex flex-col gap-[12px] h-fit">
          <h1 className="font-semibold h-[22px] text-[16px] text-[#E19133] leading-[24px]">Total Products</h1>
          <div className=" flex flex-col h-[56px] gap-[12px]">
            <div className="flex justify-between">
              <span className="h-[16px] leading-[20px] font-semibold text-[16px] text-[#5D6679]">{totalProducts}</span>
              <span className="h-[16px] leading-[20px] font-semibold text-[16px] text-[#5D6679]">Rs.{totalProductsAmount}</span>
            </div>
            <div className="flex justify-end">
              {/* <span className="h-[16px] font-normal text-[14px] leading-5 text-[#858D9D]">Last 7 days</span> */}
              <span className="h-[16px] font-normal text-[14px] leading-5 text-[#858D9D]">Stock</span>
            </div>
          </div>
        </section>
        <section className="col-start-6 col-end-8 flex flex-col gap-[12px]">
          <h1 className="font-semibold h-[22px] text-[16px] text-[#845EBC] leading-[24px]">Total Sales</h1>
          <div className=" flex flex-col h-[56px] gap-[12px]">
            <div className="flex justify-between">
              <span className="h-[16px] leading-[20px] font-semibold text-[16px] text-[#5D6679]">{totalSales?.no_of_sales_transaction}</span>
              <span className="h-[16px] leading-[20px] font-semibold text-[16px] text-[#5D6679]">Rs.{totalSales?.total_sales_amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="h-[16px] font-normal text-[14px] leading-5 text-[#858D9D]">Last 7 days</span>
              <span className="h-[16px] font-normal text-[14px] leading-5 text-[#858D9D]">Sales</span>
            </div>
          </div>
        </section>
        <section className="col-start-9 col-end-11 flex flex-col gap-[12px]">
          <h1 className="font-semibold h-[22px] text-[16px] text-[#F36960] leading-[24px]">Low Stocks/Out of Stocks</h1>
          <div className=" flex flex-col h-[56px] gap-[12px]">
            <div className="flex justify-between">
              <span className="h-[16px] leading-[20px] font-semibold text-[16px] text-[#5D6679]">{totalLowStocks}</span>
              {/* <span className="h-[16px] leading-[20px] font-semibold text-[16px] text-[#5D6679]"></span> */}
            </div>
            <div className="flex justify-between">
              <span className="h-[16px] font-normal text-[14px] leading-5 text-[#858D9D]">Quantity less than 10</span>
              {/* <span className="h-[16px] font-normal text-[14px] leading-5 text-[#858D9D]">Not in stock</span> */}
            </div>
          </div>
        </section>
      </div>
    </header>
    </>
  )
}

export default OverallInventory;