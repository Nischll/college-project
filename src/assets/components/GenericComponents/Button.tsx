

const Button = ({buttonName, handleClick}) => {

  const handleUpdate = () => {
    
  };

  return (  
    <>
    <button onClick={handleClick} className="h-[30px] px-3 bg-[#1366D9] rounded font-normal text-[14px] text-white hover:bg-blue-700 active:bg-blue-800">{buttonName}</button>
    </>
  );
}
 
export default Button;