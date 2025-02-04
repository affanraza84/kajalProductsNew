'use client'
import Link from "next/link";
import productData from "../data/products.json";
import { BackgroundGradient } from "./ui/background-gradient";
import { motion } from "framer-motion";

interface Product {
    id: number;
    title: string;
    slug: string;
    description: string;
    price: number;
    ingredients: string;
    isFeatured: boolean;
}

function ProductsDetails() {
    const productsDetails = productData.products.filter((product: Product) => product.isFeatured);
    return (
        <div className="py-12 bg-gradient-to-b from-pink-100 to-white">
            <div className="text-center">
                <h2 className="text-base text-pink-700 font-semibold tracking-wide uppercase">Cake Corner</h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    Taste with Love
                </p>
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                {productsDetails.map((product: Product) => (
                    <motion.div 
                        key={product.id} 
                        className="flex justify-center"
                        whileHover={{ scale: 1.05 }}
                    >
                        <BackgroundGradient className="flex flex-col rounded-2xl bg-white shadow-lg overflow-hidden h-full max-w-sm">
                            <img 
                            src={product.image}
                            alt={product.title} 
                            className="w-80 h-90 object-cover rounded-t-2xl"
                            />
                            {/* <div className="p-6 flex flex-col items-center text-center flex-grow">
                                <p className="text-lg sm:text-xl text-pink-700 font-bold mt-4 mb-2">{product.title}</p>
                                <p className="text-sm text-gray-600 flex-grow">{product.description}</p>
                            </div> */}
                        </BackgroundGradient>
                    </motion.div>
                ))}
            </div>
            <div className="mt-20 text-center">
                <Link 
                    href={"/products"} 
                    className="px-4 py-2 rounded-2xl border border-pink-500 text-pink-700 bg-white hover:bg-pink-500 hover:text-white transition duration-200"
                >
                    View all products
                </Link>
            </div>
        </div>
    );
}

export default ProductsDetails;
