"use client";

import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const variousCakesTestimonials = [
  {
    quote:
      "A fondant cake features smooth, pliable icing, ideal for intricate designs, making it perfect for weddings, birthdays, and special occasions. It's often layered with buttercream or ganache for smoothness and adhesion.",
    name: "Fondant Cake",
    title: "",
  },
  {
    quote:
      "A mousse cake is a rich dessert with airy mousse layered over soft cake. Made with whipped cream and flavors like chocolate or fruit, it offers a smooth, creamy texture perfect for any occasion.",
    name: "Mouse Cake",
    title: "",
  },
  {
    quote:
      "Butter toast is a timeless breakfast favorite made by toasting bread and spreading it with butter. Its crispy texture and rich, melted butter create a simple yet deliciously satisfying start to the day.",
    name: " Butter Toast",
    title: "",
  },
  {
    quote:
      "Red velvet cake is a rich, vibrant dessert with a subtle cocoa flavor, soft velvety texture, and slight tang from buttermilk and vinegar, topped with luscious cream cheese frosting for a perfect treat.",
    name: "Red Velvet Cake",
    title: "",
  },
  {
    quote:
      "Chocolate overloaded cake is a chocoholic's dream, featuring moist chocolate layers, creamy ganache, and a lavish topping of chocolate shavings, chips, curls, and candies for an irresistible, indulgent treat.",
    name: "Chocolate Overloaded Cake",
    title: "",
  },
  {
    quote:
      "A wedding cake is a cherished symbol of love and celebration, traditionally tiered and decorated with frosting, flowers, or toppers, evolving over time to reflect personal styles and unique preferences.",
    name: "Wedding Cake",
    title: "",
  },
  {
    quote:
      "A birthday cake is the heart of every celebration, symbolizing joy and sweet memories. Frosted, decorated, and topped with candles, it brings smiles, wishes, and a deliciously unforgettable moment of happiness.",
    name: "Birthday Cake",
    title: "",
  },
  {
    quote:
      "Japanese chocolate cake is light, airy, and delicately soft, with a fluffy chiffon-like texture. Made with meringue, milk, or oil, it's moist, tender, and melts in your mouth for a delightful experience.",
    name: "Japanese Chocolate Cake",
    title: "",
  },
];

function TestimonialCards() {
  return (
    <div className="h-auto min-h-[30rem] w-full bg-gradient-to-b from-pink-100 to-white relative flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-10">
  <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-pink-700">
    Explore our exquisite range of products
  </h2>

  <div className="w-full max-w-6xl">
    <InfiniteMovingCards
      items={variousCakesTestimonials}
      direction="right"
      speed="normal"
    />
  </div>
</div>

  );
}

export default TestimonialCards;
