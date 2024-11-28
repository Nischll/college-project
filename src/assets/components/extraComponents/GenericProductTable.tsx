import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useState } from "react";


const GenericProductTable = ({getData, columns}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function dataFetch() {
      try{
      const fetchData = await getData();
      // console.log(fetchData)
      setData(fetchData);
      }
      catch(error){
        console.error('error fetching');
      }
    }
    dataFetch();
  }, [data]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (  
    <>
    <main className="mt-2 w-full h-[400px] overflow-y-scroll">
    <table className='relative w-full px-2 py-2 border-x-2 border-indigo-800'>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id} className=' border-y-2 border-indigo-800 w-inherit'>
            {headerGroup.headers.map(header => (
              <th key={header.id} className='text-lg font-semibold h-[35px] bg-slate-200 py-[5px] border-x-2 border-indigo-400'>
                <div className='cursor-pointer'>
                  {flexRender(
                  header.column.columnDef.header, 
                  header.getContext()
                  )}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="text-center">No Data Available</td>
          </tr>
        ) : (
          table.getRowModel().rows.map(row => (
            <tr key={row.id} className="border-b-2 border-indigo-800 even:bg-[#D6EEEE]">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="text-center px-[30px] py-[10px] border-x-2 border-indigo-400">
                  {flexRender(
                  cell.column.columnDef.cell, 
                  cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
    </main>
    </>
  );
}
 
export default GenericProductTable;