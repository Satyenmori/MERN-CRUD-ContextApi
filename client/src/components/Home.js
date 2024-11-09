// Home.js
import { useAuth } from "../store/store";

const Home = () => {
  const { user, userContent, contentLoading } = useAuth();

  if (contentLoading) return <p>Loading content...</p>;

  return (
    <>
      <div className="container align-items-center h-100 w-50 m-5">
        <h1>{user.username}</h1>
        <h3>Welcome to our website!</h3>
      </div>
      <div
        style={{ display: "flex", gap: "20px", justifyContent: "space-around" }}
      >
        <div style={{ border: "1px solid black", padding: "20px" }}>
          <h1>Links</h1>
          <ul>
            {userContent?.links.map((link) => (
              <li key={link._id}>
                <strong>Title:</strong> {link.title}
                <br />
                <strong>URL:</strong>{" "}
                <a
                  href={`https://${link.linkurl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.linkurl}
                </a>
                <br />
              </li>
            ))}
          </ul>
        </div>
        <div style={{ border: "1px solid black", padding: "20px" }}>
          <h1>Document</h1>
          <ul>
            {userContent?.doc.map((docs) => (
              <li key={docs._id}>
                <strong>Title:</strong> {docs.doctitle}
                <br />
                <strong>URL:</strong>{" "}
                <a
                  href={`https://${docs.docurl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {docs.docurl}
                </a>
                <br />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
