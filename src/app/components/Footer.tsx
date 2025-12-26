import Link from 'next/link';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-pink-50 text-gray-800 py-12 border-t border-pink-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-pink-600 text-lg font-bold mb-4">About Us</h2>
          <p className="mb-4 text-sm leading-relaxed text-gray-600">
            We currently deliver our handcrafted treats exclusively in <span className="font-semibold text-pink-700">Giridih, Jharkhand</span>. 
            We are working hard to bring our delicious cakes and snacks to you Pan-India very soon!
          </p>
        </div>
        <div>
          <h2 className="text-pink-600 text-lg font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm font-medium">
            <li>
              <Link href="/" className="hover:text-pink-600 hover:translate-x-1 transition-all duration-300 inline-block">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-pink-600 hover:translate-x-1 transition-all duration-300 inline-block">
                Products
              </Link>
            </li>
             <li>
              <Link href="/about" className="hover:text-pink-600 hover:translate-x-1 transition-all duration-300 inline-block">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-pink-600 hover:translate-x-1 transition-all duration-300 inline-block">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-pink-600 text-lg font-bold mb-4">Follow Us</h2>
          <div className="flex flex-col space-y-2 text-sm font-medium">
            <Link href="https://www.facebook.com/share/18bSLnakAh/" className="hover:text-pink-600 hover:translate-x-1 transition-all duration-300 inline-flex items-center">
              <FaFacebook className="mr-2 text-lg" />
              Facebook
            </Link>
            <Link href="https://www.instagram.com/kajalgroup_pvt_ltd?igsh=MXJvNjVlMGh2M240NA==" className="hover:text-pink-600 hover:translate-x-1 transition-all duration-300 inline-flex items-center">
              <FaInstagram className="mr-2 text-lg" />
              Instagram
            </Link>
          </div>
        </div>
        <div>
          <h2 className="text-pink-600 text-lg font-bold mb-4">Contact Us</h2>
          <div className="space-y-2 text-sm text-gray-600">
             <p className="font-medium text-gray-800">Kajal Bakery</p>
            <p>Giridih, Jharkhand - 815301</p>
            <p>Email: <a href="mailto:kajalproducts@gmail.com" className="hover:text-pink-600 transition-colors">kajalproducts@gmail.com</a></p>
            <div className="flex items-start gap-1">
              <span>Phone:</span>
              <div className="flex flex-col">
                <span>+91 9470 509 040</span>
                <span>+91 9570 188 409</span>
                <span>+91 9471 768 028</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-pink-100 mt-12 pt-8 text-center bg-transparent">
        <p className="text-sm text-gray-500">© 2025 Kajal Bakery&apos;s Cakes & Snacks. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
