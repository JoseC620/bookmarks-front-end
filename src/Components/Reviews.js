import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Review from "./Review";
import ReviewForm from "./ReviewForm";


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

    const handleAdd = (newReview) => {
        axios 
        .post(`${API}/reviews`, newReview)
        .then((response) => {
            setReviews([response.data, ...reviews])
        },
        (error) => console.error(error)
        )
        .catch((e) => console.warn("catch", e))
    }

    const handleDelete = (id) => {
        axios
        .delete(`${API}/reviews/${id}`)
        .then((response) => {
            const copyReviewArray = [...reviews];
            const indexDeletedReview = copyReviewArray.findIndex((review) => {
            return review.id === id
        })
        copyReviewArray.splice(indexDeletedReview, 1)
        setReviews(copyReviewArray)
        },
            (error) => console.error(error)
        )
        .catch((error) => {
            console.warn(error)
        })
    }


    return (
        <section className="Reviews">
            <h2>Reviews</h2>
            <ReviewForm handleSubmit={handleAdd}>
            <h3>Add a New Review</h3>
            </ReviewForm>
            {
            reviews.map((review) => ( <Review key={review.id} review={review} handleDelete={handleDelete}/> )
            )
            }
        </section>
    )


};