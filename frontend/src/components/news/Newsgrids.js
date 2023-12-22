import React from "react";
import { Link } from "react-router-dom";

const NewsGrid = () => {
  const newsData = [
    {
      title: "Breaking News 1",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "Latest Update",
      content:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      imageUrl: "https://placekitten.com/100/100",
    },
  ];

  return (
    <>
      <section className="container mx-auto mt-8">
        <h2 className="text-3xl font-bold mb-4">Latest News</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsData.map((newsItem, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md flex transition duration-300 hover:shadow-xl"
            >
              <Link to={`/news/${index}`}>
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
