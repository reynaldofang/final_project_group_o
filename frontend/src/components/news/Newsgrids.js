import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const NewsGrid = () => {
  const [latestNewsData, setLatestNewsData] = useState([]);
  const [allNewsData, setAllNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await axios.get("/news/latest");
        if (response.data && Array.isArray(response.data.news)) {
          setLatestNewsData(response.data.news);
        } else {
          console.error("Invalid data structure:", response.data);
          setError(
            "Invalid data structure. Please check the console for more details."
          );
        }
      } catch (error) {
        console.error("Error fetching latest news data:", error.message);
        setError(
          "Error fetching latest news data. Please check the console for more details."
        );
      }
    };

    const fetchAllNews = async () => {
      try {
        const response = await axios.get("/news");
        if (response.data && Array.isArray(response.data.news)) {
          setAllNewsData(response.data.news);
        } else {
          console.error("Invalid data structure:", response.data);
          setError(
            "Invalid data structure. Please check the console for more details."
          );
        }
      } catch (error) {
        console.error("Error fetching all news data:", error.message);
        setError(
          "Error fetching all news data. Please check the console for more details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
    fetchAllNews();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {/* Latest News Section */}
      <section className="container mx-auto mt-8">
        <h2 className="text-3xl font-bold mb-4">Latest News</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestNewsData.map((newsItem) => (
            <div
              key={newsItem._id} // Assuming _id is a unique identifier for each news item
              className="bg-white p-6 rounded-lg shadow-md flex transition duration-300 hover:shadow-xl"
            >
              <Link to={`/news/${newsItem._id}`}>
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

      {/* All News Section */}
      <section className="container mx-auto mb-vh-20 mt-8">
        <h2 className="text-3xl font-bold mb-4">All News</h2>
        <div className="grid grid-cols-1 gap-6">
          {allNewsData.map((newsItem) => (
            <div
              key={newsItem._id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <Link to={`/news/${newsItem._id}`}>
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
