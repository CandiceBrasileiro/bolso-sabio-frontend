const ButtonCancel = ({ onClick, children }) => {
    return (
      <button
        type="button"
        onClick={onClick}
        className="py-2 px-14 bg-[#f50057] rounded text-white text-sm hover:bg-[#cd0049]"
      >
        {children}
      </button>
    );
  };
  
  export default ButtonCancel;
  