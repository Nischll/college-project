import AdminTable from "./AdminTable";
import UsersTable from "./UsersTable";

const ManageStaff = () => {

 
  return (  
    <>
    {/* <header className="bg-white h-[140px] rounded-lg py-2 px-2">
    staff management
    </header> */}
    <main className="h-full flex flex-col gap-3">
      <section className="h-2/6 flex flex-col bg-white rounded-lg py-2 px-2">
      <h1 className="h-[30px] font-medium text-[20px] leading-[30px] text-[#383E49] w-[163px]">Admins Table</h1>
        <AdminTable/>
      </section>

      <section className="h-[calc(100%-33.33%)] flex flex-col bg-white rounded-lg pt-2 px-2">
        <h1 className="h-[30px] font-medium text-[20px] leading-[30px] text-[#383E49] w-[163px]">Users Table</h1>
        <UsersTable/>
      </section>
    </main>
    </>
  );
}
 
export default ManageStaff;