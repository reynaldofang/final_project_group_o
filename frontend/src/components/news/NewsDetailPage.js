import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

const NewsDetailPage = () => {
  const [selectedNews, setSelectedNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/news");
        const newsArray = response.data.news;

        if (!/^\d+$/.test(id)) {
          setError("Invalid news Id");
          setLoading(false);
          return;
        }

        const foundNews = newsArray.find(
          (item, index) => index.toString() === id
        );

        if (foundNews) {
          setSelectedNews(foundNews);
        } else {
          setError("Invalid news Id");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching news data:", error.message);
        setError(
          "Error fetching news data. Please check the console for more details."
        );
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formatDateString = (dateString) => {
    const [datePart, timePart] = dateString.split(", ");
    const [day, month, year] = datePart.split("/");
    const [hour, minute, second] = timePart.split(".");
    const formattedDateString = `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
    const parsedDate = new Date(formattedDateString);
    return format(parsedDate, "dd/MM/yyyy, HH.mm.ss");
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
      <div className="bg-white p-6 rounded-lg shadow-md">
        {imageUrl && (
          <img src={imageUrl} alt={title} className="mb-4 rounded-md" />
        )}
        <h2 className="text-4xl font-bold mb-4">{title}</h2>
        <p className="text-gray-700 text-lg mb-4">{content}</p>
        <div className="flex items-center">
          <div>
            <span className="text-gray-600">Published on:</span>
            <span className="ml-2">{formatDateString(creationDate)}</span>
          </div>
          <div className="ml-4">
            <span className="text-gray-600">Author:</span>
            <span className="ml-2">{authorUsername}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsDetailPage;
