
const UserListItem = ({ handleFunction, user }) => {
 

  return (
    <div onClick={handleFunction} className="bg-[#80808041] w-[75vw] rounded-lg px-2 py-1 mb-2 flex items-center gap-2 cursor-pointer hover:bg-[#8080807c] hover:shadow-lg hover:scale-105 transition-all">
      <img className="cursor-pointer w-10 h-10 rounded-full object-center object-cover" src={user.image} alt=""/>
      <div>
        <p>{user.name}</p>
        <p>
          <b>Email : </b>
          {user.email}
        </p>
      </div>
    </div>
  );
};

export default UserListItem;
