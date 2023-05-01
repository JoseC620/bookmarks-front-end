import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Review from "./Review";


const API = process.env.REACT_APP_API_URL;

export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios
        .get(`${API}/reviews?bookmarkId=${id}`)
        .then((response) => {
            console.log(response.data)
            setReviews(response.data)})
        .catch((error) => console.warn(error))
    }, [id]);


    return (
        <section className="Reviews">
            {
            reviews.map((review) => ( <Review key={review.id} review={review} /> )
            )
            }
        </section>
    )


};