import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const NewsGrid = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/news");
        if (response.data && Array.isArray(response.data.news)) {
          setNewsData(response.data.news);
          setLoading(false);
        } else {
          console.error("Invalid data structure:", response.data);
          setError(
            "Invalid data structure. Please check the console for more details."
          );
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching news data:", error.message);
        setError(
          "Error fetching news data. Please check the console for more details."
        );
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!Array.isArray(newsData)) {
    console.error("Invalid data structure:", newsData);
    return (
      <p>
        Error: Invalid data structure. Please check the console for more
        details.
      </p>
    );
  }

  return (
    <>
      {/* Latest News Section */}
      <section className="container mx-auto mt-8">
        <h2 className="text-3xl font-bold mb-4">Latest News</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsData.map((newsItem, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md flex transition duration-300 hover:shadow-xl"
            >
              <Link to={`/news/${index}`}>
                {/* Displaying image if available */}
                {newsItem.imageUrl && (
                  <img
                    src={newsItem.imageUrl}
                    alt={newsItem.title}
                    className="mr-4 rounded-md"
                  />
                )}
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {newsItem.title}
                  </h3>
                  <p className="text-gray-700">{newsItem.content}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto mt-8">
        <h2 className="text-3xl font-bold mb-4">All News</h2>
        <div className="grid grid-cols-1 gap-6">
          {newsData.map((newsItem, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <Link to={`/news/${index}`}>
                <img
                  src={newsItem.imageUrl}
                  alt={newsItem.title}
                  className="mb-4 rounded-md"
                />
                <h3 className="text-xl font-semibold mb-2">{newsItem.title}</h3>
                <p className="text-gray-700">{newsItem.content}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default NewsGrid;
