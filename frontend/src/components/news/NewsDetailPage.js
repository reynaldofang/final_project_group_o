import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

const NewsDetailPage = () => {
  const [selectedNews, setSelectedNews] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [commentError, setCommentError] = useState("");

  const { _id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (_id && typeof _id === "string" && _id.trim() !== "") {
          const response = await axios.get(`/news/${_id}`);
          const { news, comment } = response.data;

          if (news) {
            setSelectedNews(news);
            setComments(comment);
          } else {
            setError("News not found");
          }
        } else {
          setError("Invalid news Id");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          "Error fetching data. Please check the console for more details."
        );
        setLoading(false);
      }
    };

    fetchData();
  }, [_id]);

  const formatDateString = (dateString) => {
    if (!dateString) {
      return "Date not available";
    }

    const [datePart, timePart] = dateString.split(", ");
    const [day, month, year] = datePart.split("/");
    const [hour, minute, second] = timePart.split(".");
    const formattedDateString = `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
    const parsedDate = new Date(formattedDateString);
    return format(parsedDate, "dd/MM/yyyy, HH.mm.ss");
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();

    if (!newComment.trim()) {
      setCommentError("Comment cannot be empty");
      return;
    }

    try {
      // Assume there's an API endpoint for adding comments
      const response = await axios.post(`/comments/${_id}`, {
        user: "CurrentUser", // Replace with the actual user data
        comment: newComment.trim(),
      });

      const updatedComments = [...comments, response.data];
      setComments(updatedComments);
      setNewComment("");
      setCommentError("");
    } catch (error) {
      console.error("Error adding comment:", error);
      setCommentError("Error adding comment. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!selectedNews) {
    return <p>News not found.</p>;
  }

  const { title, content, imageUrl, creationDate, authorUsername } =
    selectedNews;

  return (
    <section className="container mx-auto mt-8">
      {selectedNews ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={title || "Image"}
              className="mb-4 rounded-md w-full"
            />
          )}
          <h2 className="text-4xl font-bold mb-4">
            {title || "Title not available"}
          </h2>
          <p className="text-gray-700 text-lg mb-4">
            {content || "Content not available"}
          </p>
          <div className="flex items-center">
            <div>
              <span className="text-gray-600">Published on:</span>
              <span className="ml-2">
                {formatDateString(creationDate) || "Date not available"}
              </span>
            </div>
            <div className="ml-4">
              <span className="text-gray-600">Author:</span>
              <span className="ml-2">
                {authorUsername || "Author not available"}
              </span>
            </div>
          </div>

          {/* Display comments */}
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Comments</h3>
            {comments.length > 0 ? (
              <ul className="space-y-4">
                {comments.map((comment, index) => (
                  <li
                    key={index}
                    className="bg-gray-100 p-4 rounded-md shadow-md"
                  >
                    <p className="text-gray-800">
                      <strong>{comment.user}:</strong> {comment.comment}
                    </p>
                    <p className="text-gray-600">
                      Created at: {formatDateString(comment.createdAt)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No comments available.</p>
            )}
          </div>

          {/* Add comment form */}
          <div className="mt-8">
            <form onSubmit={handleSubmitComment}>
              <label className="block text-gray-700 text-xl mb-2">
                Add a Comment:
              </label>
              <textarea
                className="w-full p-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                rows="4"
                value={newComment}
                onChange={handleCommentChange}
              ></textarea>
              {commentError && (
                <p className="text-red-500 mt-2">{commentError}</p>
              )}
              <button
                type="submit"
                className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Add Comment
              </button>
            </form>
          </div>
        </div>
      ) : (
        <p>No data available for this news item.</p>
      )}
    </section>
  );
};

export default NewsDetailPage;
