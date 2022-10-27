import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { useGetUsersQuery } from "../../features/users/usersApiSlice";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import useAuth from "../../hooks/useAuth";
import FullWidthTabs from "./tabpanels/FullWidthTabs";

const Welcome = () => {
  // const { username, isManager, isAdmin } = useAuth();

  const token = useSelector(selectCurrentToken);

  if (token) {
    var decoded = jwt_decode(token);
  }

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[decoded?.UserInfo.id],
    }),
  });

  // const date = new Date()
  // const today = new Intl.DateTimeFormat('tr-TR', { dateStyle: 'full', timeStyle: 'short' }).format(date)

  const content = (
    <section className="h-full">
      <div className="bg-gradient-to-t from-gray-300 pt-4">
        <div className="grid grid-cols-2">
          <div className="w-20 h-20 place-self-end">
            <img
              className={`w-full h-full object-center object-cover rounded-full border-2 border-white`}
              src={user?.image}
              alt=""
            />
          </div>

          <div className="pl-12 flex items-center gap-x-4 ">
            <span className="flex flex-col items-center">
              <span className="font-bold">{user?.followers?.length}</span>
              <span className="text-gray-600">takipçi</span>
            </span>
            <span className="flex flex-col items-center">
              <span className="font-bold">{user?.followings?.length}</span>
              <span className="text-gray-600">takip</span>
            </span>
          </div>
        </div>
        <div className="font-bold text-gray-600 text-center pr-24 py-1">
          <span className="">{user?.name}</span>
        </div>
      </div>
      <div className="pt-2 pl-1">
      <Swiper spaceBetween={1} slidesPerView={5}>
        <SwiperSlide>
          <img
            className="p-[2px] w-16 h-16 rounded-full border-2 border-purple-400 "
            src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="p-[2px] w-16 h-16 rounded-full border-2 border-red-400 "
            src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="p-[2px] w-16 h-16 rounded-full border-2 border-purple-400 "
            src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="p-[2px] w-16 h-16 rounded-full border-2 border-blue-400 "
            src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="p-[2px] w-16 h-16 rounded-full border-2 border-green-400 "
            src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="p-[2px] w-16 h-16 rounded-full border-2 border-purple-400 "
            src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="p-[2px] w-16 h-16 rounded-full border-2 border-yellow-400 "
            src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="p-[2px] w-16 h-16 rounded-full border-2 border-purple-400 "
            src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="p-[2px] w-16 h-16 rounded-full border-2 border-purple-400 "
            src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="p-[2px] w-16 h-16 rounded-full border-2 border-purple-400 "
            src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
      </div>
      <div className="w-full">
        <FullWidthTabs />
      </div>
      {/* {(isManager || isAdmin) && <p><Link to="/dash/users">kullanıcı ayarları</Link></p>} */}

      {/* {(isManager || isAdmin) && <p><Link to="/dash/users/new">yeni kullanıcı ekle</Link></p>} */}
    </section>
  );

  return content;
};
export default Welcome;
