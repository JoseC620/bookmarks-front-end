import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Reviews from "./Reviews";
import Review from "./Review";
const API = process.env.REACT_APP_API_URL;

function BookmarkDetails() {
  const [bookmark, setBookmark] = useState([]);
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    axios
    .get(`${API}/bookmarks/${id}`)
    .then((response) =>
      setBookmark(response.data)
    )
    .catch((error) => console.warn("catch", error))
  }, [id])

  const deleteBookmark = () => {
    axios.delete(`${API}/bookmarks/${id}`)
    .then(() => {
      navigate(`/bookmarks`)
    },
    (error) => console.error(error)
    )
    .catch((e) => console.warn("catch", e))
  }

  const handleDelete = () => {
    deleteBookmark()
  }

  return (
    <article>
      <h3>{bookmark.is_favorite ? <span>⭐️</span> : null} {bookmark.name}</h3>
      <h5>
        <span>
          <a href={bookmark.url}>{bookmark.name}</a>
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {bookmark.url}
      </h5>
      <h6>{bookmark.category}</h6>
      <p>{bookmark.description}</p>

      <div className="showNavigation">

        <div>
          <Link to={`/bookmarks`}>
          <button>Back</button>
          </Link>
        </div>

        <div>
          <Link to={`/bookmarks/${id}/edit`}>
          <button>Edit</button>
          </Link>
        </div>

        <div>
          <button onClick={handleDelete}>Delete</button>
        </div>

      </div>


      <Reviews />

    </article>
  )
}

export default BookmarkDetails;
