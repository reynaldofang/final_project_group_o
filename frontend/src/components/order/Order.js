import React from "react";

const partnersData = [
  {
    id: 1,
    name: "Delicious Bites",
    logoUrl:
      "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/restaurant-logo-design-%281%29-template-b9bd726f6bee3380567f1c9b63a8c99b_screen.jpg?ts=1658842438",
  },
  { id: 2, name: "Tasty Treats", logoUrl: "/images/tasty_treats_logo.png" },
  { id: 3, name: "Savory Eats", logoUrl: "/images/savory_eats_logo.png" },
];

const testimonialsData = [
  {
    id: 1,
    content:
      "We love ordering from this restaurant! The food is always delicious, and the delivery is fast. Highly recommended!",
    author: "John Doe",
    role: "Regular Customer",
    avatarUrl: "https://mm.feb.uncen.ac.id/wp-content/uploads/2016/01/tutor-8.jpg", 
  },
  {
    id: 2,
    content:
      "Amazing service! The variety of dishes is great, and the taste is consistently fantastic. We've placed numerous orders and have never been disappointed.",
    author: "Jane Smith",
    role: "Food Enthusiast",
    avatarUrl: "https://static.dezeen.com/uploads/2022/04/jane-nglefield-dezeen-portrait_dezeen_2364_col_0-411x411.jpg", // Ganti dengan URL avatar yang sesuai
  },
  {
    id: 3,
    content:
      "Our go-to place for a quick and tasty meal. The online ordering system is user-friendly, and the staff is friendly and efficient. Will continue ordering from here!",
    author: "Bob Johnson",
    role: "Loyal Customer",
    avatarUrl: "https://cdn.comparably.com/24749373/u/73230/ceo_v1.jpg", 
  },
];

const menuData = [
  {
    id: 1,
    name: "Special Burger",
    description: "Delicious burger with special sauce.",
    price: "$10.99",
  },
  {
    id: 2,
    name: "Pasta Carbonara",
    description: "Creamy pasta with bacon and parmesan.",
    price: "$12.99",
  },
  {
    id: 3,
    name: "Vegetarian Pizza",
    description: "Fresh vegetables on a crispy crust.",
    price: "$14.99",
  },
];

const Order = () => {
  return (
    <div>
      {}
      <div className="bg-gray-100 py-8 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4">Our Partners</h2>
          <div className="flex justify-center space-x-8">
            {partnersData.map((partner) => (
              <div key={partner.id} className="flex items-center">
                <img
                  src={partner.logoUrl}
                  alt={`Logo of ${partner.name}`}
                  className="w-32 h-32 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="container mx-auto mt-8 mb-12 p-8 border border-gray-300 rounded">
        <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <p className="text-gray-700 mb-4">{testimonial.content}</p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatarUrl}
                  alt={`Avatar of ${testimonial.author}`}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className="text-lg font-bold">{testimonial.author}</div>
                  <div className="text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Food Menu */}
      <div className="container mx-auto mt-48 mb-12 p-8 border border-gray-300 rounded">
        <h2 className="text-3xl font-bold mb-4">Our Menu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuData.map((menuItem) => (
            <div
              key={menuItem.id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold mb-2">{menuItem.name}</h3>
              <p className="text-gray-700 mb-4">{menuItem.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{menuItem.price}</span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
