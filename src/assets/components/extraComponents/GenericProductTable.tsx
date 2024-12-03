import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
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
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination: {
        pageIndex,
        pageSize: pageSize,
      },
    }
  });

  return (  
    <>
    <div className="flex flex-col h-[calc(100vh-296px)]">
      <main className="mt-2 relative flex flex-wrap justify-center w-full h-full overflow-y-scroll">
        <table className='relative w-full h-fit'>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className=' border-b border-gray-500 w-inherit'>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className='text-[17px] leading-[20px] text-gray-800 text-left font-medium h-[35px] bg-slate-200 px-[15px] py-[12px] bg-white'>
                    <div className="flex gap-2">
                    <div className='cursor-pointer'>
                      {flexRender(
                      header.column.columnDef.header, 
                      header.getContext()
                      )}
                    </div>

                      {/* FITER */}
                    {header.column.getCanFilter() && (
                      <div className='flex justify-center items-center'>
                        <input
                          type="text"
                          value={header.column.getFilterValue() ?? ''}
                          onChange={e => header.column.setFilterValue(e.target.value)}
                          placeholder='search here'
                          className='h-[22px] w-[110px] border border-slate-400 font-medium text-[13px] rounded-md placeholder:text-sm placeholder:font-normal placeholder:text-left text-left px-[3px] focus:outline-none focus:border-gray-800 '
                        />
                      </div>
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
                <tr key={row.id} className="border-b-[0.5px] border-[#D0D3D9] bg-white">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="font-medium text-[15px] text-gray-700 text-left px-[15px] py-[12px]">
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
      <footer className='flex flex-wrap justify-between items-center mt-2'>
        <div className='flex justify-center item-center py-2 gap-2'>
          <button
            onClick={() => {
              table.setPageIndex(0);
              setPageIndex(0);
            }}
            className='flex items-center text-[#48505E] text-[15px] font-medium bg-white px-2 py-[3px] hover:bg-slate-200 active:bg-slate-300 border border-gray-400 rounded-md'>
            First Page
          </button>
          <button
            onClick={() => {
              setPageIndex(old => Math.max(old - 1, 0));
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
            className='flex item-center cursor-pointer font-medium text-[#48505E] bg-white px-2 hover:bg-slate-200 active:bg-slate-300 border border-gray-400 rounded-lg'>
            &lt;
          </button>
        </div>
        <span className="py-2 text-[15px] text-[#48505E] font-medium">Page {pageIndex + 1} of {Math.ceil(totalItems / pageSize)}</span>
        <div className='flex justify-center item-center py-2 gap-2'>
          <button
            onClick={() => {
              setPageIndex(old => old + 1);
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
            className='flex item-center cursor-pointer font-medium text-[#48505E] bg-white px-2 hover:bg-slate-200 active:bg-slate-300 border border-gray-400 rounded-lg'>
            &gt;
          </button>
          <button
            onClick={() => {
              table.setPageIndex(table.getPageCount() - 1);
              setPageIndex(table.getPageCount() - 1);
            }}
            className='flex items-center text-[#48505E] text-[15px] font-medium bg-white px-2 py-[3px] hover:bg-slate-200 active:bg-slate-300 border border-gray-400 rounded-md'>
            Last Page
          </button>
        </div>
      </footer>
    </div>
    </>
  );
}
 
export default GenericProductTable;