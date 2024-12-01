import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useState } from "react";


const GenericProductTable = ({getData, columns, pageSize}) => {
  const [data, setData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    async function dataFetch() {
      try{
      const fetchData = await getData();
      // console.log(fetchData)
      setData(fetchData);
      setTotalItems(fetchData.length);
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
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageIndex,
        pageSize: pageSize,
      },
    }
  });

  return (  
    <>
    <div className="flex flex-col h-[calc(100vh-73px)] bg-green-300">
      <main className="mt-2 relative flex flex-wrap justify-center  w-full">
        <table className='relative w-full px-2 py-2 border-x-2 border-indigo-800 overflow-y-scroll'>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className=' border-y-2 border-indigo-800 w-inherit'>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className='text-lg text-left font-semibold h-[35px] bg-slate-200 px-[15px] py-[10px] border-x-2 border-indigo-400'>
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
                    <td key={cell.id} className="text-left px-[15px] py-[8px] border-x-2 border-indigo-400">
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

      {/* PAGINATION */}
      <footer className='flex flex-wrap justify-between item-center text-center mx-6 my-4'>
        <div className='flex justify-center item-center p-[2px]'>
          <button
            onClick={() => {
              table.setPageIndex(0);
              setPageIndex(0);
            }}
            className='flex justify-center item-center text-base m-[6px] py-[5px] px-[6px] bg-slate-600 hover:bg-slate-500 active:bg-slate-700'>
            First Page
          </button>
          <button
            onClick={() => {
              setPageIndex(old => Math.max(old - 1, 0));
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
            className='flex justify-center item-center m-[6px] py-[1px] px-[6px] p-[4px] cursor-pointer bg-slate-600 hover:bg-slate-500 active:bg-slate-700'>
            &lt;
          </button>
        </div>
        <span>Page {pageIndex + 1} of {Math.ceil(totalItems / pageSize)}</span>
        <div className='flex justify-center item-center p-[2px]'>
          <button
            onClick={() => {
              setPageIndex(old => old + 1);
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
            className='flex justify-center item-center m-[6px] py-[1px] px-[6px] p-[4px] bg-green-600 hover:bg-green-700 active:bg-green-800 cursor-pointer'>
            &gt;
          </button>
          <button
            onClick={() => {
              table.setPageIndex(table.getPageCount() - 1);
              setPageIndex(table.getPageCount() - 1);
            }}
            className='flex justify-center item-center text-base m-[6px] py-[5px] px-[6px] bg-green-600 hover:bg-green-700 active:bg-green-800'>
            Last Page
          </button>
        </div>
      </footer>
    </div>
    </>
  );
}
 
export default GenericProductTable;