import { useAuth } from "../store/store";

const Home = () => {
    const {user}= useAuth();
  return (
    <>
      <div className="container align-items-center h-100 w-50">
        <h1>{user.username}</h1>
        <h3>Welcome to our website!</h3>
      </div>
    </>
  );
};

export default Home;
