import { useEffect, useState } from "react";
import "../style/Card.css";
import { useAuth } from "../store/store";
import { Link, NavLink } from "react-router-dom";

const Cards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const { AuthorizationToken, isloggedin } = useAuth();

  const fetchUserCard = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5050/api/usercard", {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("card Data", data);
        setCards(data.data);
        console.log("state Cont Data", cards);
      } else {
        console.error("Error fetching user content");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isloggedin) {
      fetchUserCard();
    } else {
      setLoading(false);
    }
  }, [isloggedin]);

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <div className="c-main">
        <div className="c-btnflex">
          <div className="c-btndiv">
            <h1>+</h1>
            <Link to="/addcard">Add New Card</Link>
          </div>
        </div>

        <div className="c-cardmain">
          <div className="c-card">
            {cards.length === 0 ? (
              <p>No cards available</p>
            ) : (
              cards?.map((card) => (
                <div key={card._id}>
                  <h6>{card.name}</h6>
                  <p>{card.jobTitle}</p>
                  <p>{card.company}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
