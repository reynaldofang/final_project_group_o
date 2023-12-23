import React, { useEffect, useState } from "react";
import axios from "axios";

const NutritionInfo = () => {
  const [nutritionData, setNutritionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/nutrition");

        if (response.data && Array.isArray(response.data.data)) {
          setNutritionData(response.data.data);
          setLoading(false);
        } else {
          console.error("Invalid data structure:", response.data);
          setError(
            "Invalid data structure. Please check the console for more details."
          );
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching nutrition data:", error.message);
        setError(
          "Error fetching nutrition data. Please check the console for more details."
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

  if (!Array.isArray(nutritionData)) {
    console.error("Invalid data structure:", nutritionData);
    return (
      <p>
        Error: Invalid data structure. Please check the console for more
        details.
      </p>
    );
  }

  return (
    <div className="container mx-auto mt-12 mb-12 p-8 rounded-md shadow-lg bg-gray-800 text-white">
      <h2 className="text-3xl font-bold mb-4 text-center">Informasi Gizi</h2>

      <table className="w-full border-collapse border border-gray-600 bg-white text-gray-800">
        <thead className="bg-gray-600 text-white">
          <tr>
            <th className="py-2 px-4 border">Umur</th>
            <th className="py-2 px-4 border">Enegeri</th>
            <th className="py-2 px-4 border">Protein</th>
            <th className="py-2 px-4 border">Lemak</th>
            <th className="py-2 px-4 border">Karbohidrat</th>
            <th className="py-2 px-4 border">Fiber</th>
            <th className="py-2 px-4 border">Air</th>
          </tr>
        </thead>
        <tbody>
          {nutritionData.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              <td className="py-2 px-4 border">{item.umur}</td>
              <td className="py-2 px-4 border">{item.energi}</td>
              <td className="py-2 px-4 border">{item.protein}</td>
              <td className="py-2 px-4 border">{item.lemak}</td>
              <td className="py-2 px-4 border">{item.karbohidrat}</td>
              <td className="py-2 px-4 border">{item.serat}</td>
              <td className="py-2 px-4 border">{item.air}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NutritionInfo;
