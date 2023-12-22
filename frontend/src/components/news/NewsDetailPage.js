// NewsDetailPage.js
import React from "react";
import { useParams } from "react-router-dom";

const NewsDetailPage = () => {
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

  const { id } = useParams();
  const selectedNews = newsData.find((item, index) => index.toString() === id);

  if (!selectedNews) {
    return <p>News not found.</p>;
  }

  const { title, content, imageUrl } = selectedNews;

  return (
    <section className="container mx-auto mt-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        {imageUrl && (
          <img src={imageUrl} alt={title} className="mb-4 rounded-md" />
        )}
        <h2 className="text-4xl font-bold mb-4">{title}</h2>
        <p className="text-gray-700 text-lg mb-4">{content}</p>
        <div className="flex items-center">
          <div className="mr-4">
            <span className="text-gray-600">Share:</span>
          </div>
          <div>
            <span className="text-gray-600">Published on:</span>
            <span className="ml-2">December 21, 2023</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsDetailPage;
