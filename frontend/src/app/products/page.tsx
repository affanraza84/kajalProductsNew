"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import Link from "next/link";
import { motion } from "framer-motion";

const cakes = [
  {
    title: "Black Forest",
    description:
      "A rich chocolate sponge layered with whipped cream and cherries, topped with chocolate shavings.",
    image: "/images/cake80.webp",
    slug: "https://wa.me/message/AEY6Y2QPFKO7I1",
  },
  {
    title: "White Forest",
    description:
      "Vanilla sponge, whipped cream, white chocolate shavings, and cherries, perfectly indulgent",
    image: "/images/cake82.avif",
    slug: "https://wa.me/message/AEY6Y2QPFKO7I1",
  },
  {
    title: "Chocolate Truffle",
    description:
      "A decadent chocolate cake filled and coated with smooth chocolate ganache.",
    image: "/images/cake75.jpg",
    slug: "https://wa.me/message/AEY6Y2QPFKO7I1",
  },
  {
    title: "Strawberry Cake",
    description:
      "A delicate sponge cake layered with fresh strawberries, whipped cream, and a hint of sweetness. ",
    image: "/images/cake85.jpg",
    slug: "https://wa.me/message/AEY6Y2QPFKO7I1",
  },
  {
    title: "Red Velvet",
    description:
      "A soft, velvety red sponge with cocoa, buttermilk, and cream cheese frosting.",
    image: "/images/cake73.jpg",
    slug: "https://wa.me/message/AEY6Y2QPFKO7I1",
  },
  {
    title: "Chocolate Overloaded",
    description:
      "Rich chocolate layers, creamy ganache, and topped with chocolate shavings, chips, and bars.",
    image: "/images/cake86.jpg",
    slug: "https://wa.me/message/AEY6Y2QPFKO7I1",
  },
  {
    title: "Opera",
    description:
      "A French cake with layers of almond sponge, coffee buttercream, and chocolate ganache.",
    image: "/images/cake87.jpg",
    slug: "https://wa.me/message/AEY6Y2QPFKO7I1",
  },
  {
    title: "Japanese Chocolate",
    description:
      "Light, fluffy, moist, and airy with a delicate melt-in-your-mouth texture, made using meringue.",
    image: "/images/cake67.jpg",
    slug: "https://wa.me/message/AEY6Y2QPFKO7I1",
  },
  {
    title: "Pinata Cake",
    description:
      " A delightful treat with hidden candies or chocolates inside, creating a fun surprise.",
    image: "/images/cake88.jpg",
    slug: "https://wa.me/message/AEY6Y2QPFKO7I1",
  },
  {
    title: "Chocolate Mouse Cake",
    description:
      " A delicate and airy chocolate cake with layers of velvety mousse.",
    image: "/images/cake74.jpg",
    slug: "https://wa.me/message/AEY6Y2QPFKO7I1",
  },
  {
    title: "Mango Delight",
    description:
      "A summer favorite made with fresh mango puree and soft sponge layers.",
    image: "/images/cake89.jpg",
    slug: "https://wa.me/message/AEY6Y2QPFKO7I1",
  },
  {
    title: "Bride Cake",
    description:
      " A beautifully decorated, elegant cake, often white, symbolizing love and celebration at weddings. ",
    image: "/images/cake58.jpg",
    slug: "https://wa.me/message/AEY6Y2QPFKO7I1",
  },
  {
    title: "Fondant Cake",
    description:
      "A fondant cake features smooth, pliable icing, perfect for intricate decorations and special occasion designs.",
    image: "/images/cake66.jpg",
    slug: "https://wa.me/message/AEY6Y2QPFKO7I1",
  },
  {
    title: "Rasmalai Cake",
    description:
      " A fusion dessert combining soft vanilla sponge with creamy rasmalai flavors and cardamom.",
    image: "/images/cake90.jpg",
    slug: "https://wa.me/message/AEY6Y2QPFKO7I1",
  },
];
function Page() {
  return (
    <section id="cakes">
      <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white px-6 py-24 pt-36 md:pt-36 lg:pt-40">
        <motion.h1
          className="text-center text-4xl font-bold text-pink-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Baked Wonders
        </motion.h1>
        <div className="flex flex-wrap justify-center">
          {cakes.map((cake, index) => (
            <CardContainer key={index} className="inter-var m-4">
              <CardBody className="bg-pink-100 relative group/card shadow-lg rounded-2xl p-6 border border-pink-300 w-auto sm:w-[30rem] h-auto">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-pink-700"
                >
                  {cake.title}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-gray-600 text-sm max-w-sm mt-2"
                >
                  {cake.description}
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <Image
                    src={cake.image}
                    height={1000}
                    width={1000}
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt={cake.title}
                  />
                </CardItem>
                <div className="flex justify-between items-center mt-6">
                  <Link
                    href={cake.slug}
                    passHref
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CardItem
                      translateZ={20}
                      className="px-4 py-2 rounded-xl text-sm font-semibold text-pink-700 hover:underline"
                    >
                      Try now →
                    </CardItem>
                  </Link>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Page;
