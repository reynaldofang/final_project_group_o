// NutritionInfo.js
import React from "react";

const NutritionInfo = () => {
  const nutritionData = {
    anak: {
      title: "Gizi Anak-anak",
      items: [
        {
          age: "4-8 tahun",
          energy: "1.200-1.800 kcal/hari",
          protein: "19-34 gram/hari",
          fat: "30-55 gram/hari",
          carbohydrates: "130-230 gram/hari",
          fiber: "25 gram/hari",
          water: "1.200-1.600 ml/hari",
        },
      ],
    },
    remaja: {
      title: "Gizi Remaja",
      items: [
        {
          age: "14-18 tahun",
          energy: "1.800-2.400 kcal/hari",
          protein: "46-62 gram/hari",
          fat: "70-98 gram/hari",
          carbohydrates: "130-200 gram/hari",
          fiber: "28-34 gram/hari",
          water: "2.100-3.000 ml/hari",
        },
      ],
    },
    dewasa: {
      title: "Gizi Dewasa",
      items: [
        {
          age: "19-30 tahun",
          energy: "1.800-2.400 kcal/hari",
          protein: "46-56 gram/hari",
          fat: "70-83 gram/hari",
          carbohydrates: "130-210 gram/hari",
          fiber: "25-38 gram/hari",
          water: "3.000 ml/hari",
        },
      ],
    },
  };

  return (
    <div className="container mx-auto mt-12 mb-12 p-8 border border-gray-300 rounded">
      <h2 className="text-3xl font-bold mb-4">Informasi Nutrisi</h2>

      <div className="mt-8">
        {Object.keys(nutritionData).map((category) => (
          <div key={category} className="mb-8">
            <h3 className="text-xl font-semibold mb-4">
              {nutritionData[category].title}
            </h3>

            <table className="w-full border border-gray-300">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-2 px-4 border">Usia</th>
                  <th className="py-2 px-4 border">Energi</th>
                  <th className="py-2 px-4 border">Protein</th>
                  <th className="py-2 px-4 border">Lemak</th>
                  <th className="py-2 px-4 border">Karbohidrat</th>
                  <th className="py-2 px-4 border">Serat</th>
                  <th className="py-2 px-4 border">Air</th>
                </tr>
              </thead>
              <tbody>
                {nutritionData[category].items.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : ""}
                  >
                    <td className="py-2 px-4 border">{item.age}</td>
                    <td className="py-2 px-4 border">{item.energy}</td>
                    <td className="py-2 px-4 border">{item.protein}</td>
                    <td className="py-2 px-4 border">{item.fat}</td>
                    <td className="py-2 px-4 border">{item.carbohydrates}</td>
                    <td className="py-2 px-4 border">{item.fiber}</td>
                    <td className="py-2 px-4 border">{item.water}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionInfo;
