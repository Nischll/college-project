

const TrashButton = ({buttonName}) => {

  const handleDelete = () => {
    
  };

  return (  
    <>
    <button className="h-[30px] px-3 bg-red-600 rounded font-normal text-[14px] text-white hover:bg-red-700 active:bg-red-800">{buttonName}</button>
    </>
  );
}
 
export default TrashButton;