const sampleListings = [
  {
    title: "Beachfront Villa in Goa",
    description:
      "Wake up to views of the Arabian Sea in this relaxed beachfront villa with an open living space, private terrace, and easy access to the beach.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1200&q=80",
    },
    price: 4800,
    location: "Goa",
    country: "India",
    category: ["Trending", "Beaches", "Luxe"],
  },
  {
    title: "Himalayan Glass Cabin",
    description:
      "A peaceful mountain cabin surrounded by pine forests and panoramic Himalayan views, perfect for a quiet weekend away from the city.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
    },
    price: 4200,
    location: "Manali",
    country: "India",
    category: ["Trending", "Mountains"],
  },
  {
    title: "Royal Haveli Retreat",
    description:
      "Stay in a restored heritage haveli featuring traditional architecture, elegant courtyards, and a peaceful view of Jaipur's historic streets.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    },
    price: 5600,
    location: "Jaipur",
    country: "India",
    category: ["Iconic Cities", "Luxe", "Trending"],
  },
  {
    title: "Lakeview Heritage Villa",
    description:
      "A beautifully restored lakeside home with spacious rooms, traditional details, and a private terrace overlooking the waters of Udaipur.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
    },
    price: 6200,
    location: "Udaipur",
    country: "India",
    category: ["Iconic Cities", "Luxe"],
  },
  {
    title: "Riverside Escape in Rishikesh",
    description:
      "Unwind beside the Ganges in this comfortable riverside retreat, with mountain views, outdoor seating, and easy access to local trails.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
    },
    price: 3200,
    location: "Rishikesh",
    country: "India",
    category: ["Trending", "Camping"],
  },
  {
    title: "Kerala Backwater Villa",
    description:
      "Relax beside Kerala's tranquil backwaters in a modern tropical villa with lush gardens, spacious rooms, and a private pool.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&w=1200&q=80",
    },
    price: 5100,
    location: "Alleppey",
    country: "India",
    category: ["Trending", "Pools", "Luxe"],
  },
  {
    title: "Tropical Pool Villa in Bali",
    description:
      "A private tropical villa surrounded by greenery, featuring an infinity pool, open-air living area, and quick access to Bali's beaches.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    },
    price: 7200,
    location: "Bali",
    country: "Indonesia",
    category: ["Beaches", "Pools", "Luxe"],
  },
  {
    title: "Overwater Villa Retreat",
    description:
      "Spend your days above crystal-clear water in this private overwater villa with direct ocean access and uninterrupted sunset views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=80",
    },
    price: 12500,
    location: "Maldives",
    country: "Maldives",
    category: ["Beaches", "Luxe", "Trending"],
  },
  {
    title: "Alpine Chalet in the Swiss Alps",
    description:
      "A warm wooden chalet overlooking the Alps, offering a quiet mountain escape with scenic views and easy access to hiking trails.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&w=1200&q=80",
    },
    price: 9800,
    location: "Zermatt",
    country: "Switzerland",
    category: ["Mountains", "Luxe", "Trending"],
  },
  {
    title: "Modern City Apartment in Tokyo",
    description:
      "Stay in a stylish city apartment close to Tokyo's restaurants, shopping districts, and major train connections.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
    },
    price: 6800,
    location: "Tokyo",
    country: "Japan",
    category: ["Iconic Cities", "Trending"],
  },
  {
    title: "Desert Oasis Villa",
    description:
      "Experience a peaceful desert getaway in a contemporary villa with a private pool, outdoor lounge, and dramatic sunset views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80",
    },
    price: 8900,
    location: "Dubai",
    country: "United Arab Emirates",
    category: ["Luxe", "Pools", "Trending"],
  },
  {
    title: "Clifftop Villa in Santorini",
    description:
      "Enjoy sweeping Aegean Sea views from this bright island villa with a private terrace, plunge pool, and classic Santorini architecture.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
    },
    price: 10500,
    location: "Santorini",
    country: "Greece",
    category: ["Beaches", "Pools", "Luxe"],
  },
];

module.exports = { data: sampleListings };
