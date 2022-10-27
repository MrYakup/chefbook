import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/public/Home";
import Contact from "./components/public/contact/Contact";
import Login from "./features/auth/login/Login";
import Register from "./features/auth/register/Register";
import DashLayout from "./components/dash/DashLayout";
import Welcome from "./components/dash/Welcome";
import UsersList from "./features/users/UsersList";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";

import BlogList from "./features/blogs/BlogList";
import BlogDetail from "./features/blogs/BlogDetail";
import EditBlog from "./features/blogs/EditBlog";
import NewBlogForm from "./features/blogs/NewBlogForm";

import PrivateProfile from "./components/profiles/PrivateProfile";
import BloggerProfile from "./components/profiles/BloggerProfile";

import RecipeList from "./features/recipes/RecipeList";
import RecipeDetail from "./features/recipes/RecipeDetail";
import NewRecipeForm from "./features/recipes/NewRecipeForm";

import PrivateChat from "./components/chatComponent/PrivateChat";
import ChatPage from "./components/chatComponent/componenets/ChatPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        {/* <Route index element={<Public />}/> */}
        <Route index element={<Home />} />
        <Route path="recipes/:id" element={<RecipeDetail />} />
        {/* <Route path="recipes">
          <Route index element={<RecipeList />} />
          <Route path=":id" element={<RecipeDetail />} />
        </Route> */}

        <Route path="contact" element={<Contact />} />

        <Route path="blogs">
          <Route index element={<BlogList />} />
          <Route path=":id" element={<BlogDetail />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />} >
          <Route path="profile" element={<PrivateProfile />}>
            <Route path="blogger/:id" element={<BloggerProfile />} />
          </Route>
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />} />

                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />
                  }
                >
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>

                <Route path="blogs">
                  <Route index element={<BlogList />} />
                  <Route path=":id" element={<EditBlog />} />
                  <Route path="new" element={<NewBlogForm />} />
                </Route>

                <Route path="recipes">
                  <Route index element={<RecipeList />} />
                  {/* <Route path=":id" element={<EditRecipe />} /> */}
                  <Route path="new" element={<NewRecipeForm />} />
                </Route>

                <Route path="chat" element={<PrivateChat />}>
                  <Route index element={<ChatPage />} />
                </Route>

              </Route>
              {/* End Dash */}
            </Route>
          </Route>
        </Route>
        {/* End Protected Routes */}
      </Route>
    </Routes>
  );
}

export default App;
