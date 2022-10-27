
const UserBadgeItem = ({ user, handleFunction, admin }) => {
  
  return (
    <div
      className="flex items-center gap-1 p-1 rounded-lg m-1 mb-2 cursor-pointer bg-purple-500 text-white "
      onClick={handleFunction}
    >
      <img src={user.image} alt="" className="w-7 h-7 rounded-full object-center object-cover" />
      {user.name}
      {admin?._id === user?._id && <span className="text-xs pl-1 text-black">(Admin)</span>}
      <button className="px-1 text-red-900">x</button>
    </div>
  );
};

export default UserBadgeItem;
