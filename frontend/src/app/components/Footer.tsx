import Link from 'next/link';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-pink-500 text-gray-100 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">About Us</h2>
          <p className="mb-4">
            We use only the finest, carefully selected ingredients to ensure our treats are not just delicious but also wholesome. From rich Belgian chocolate to farm-fresh dairy, every bite is a celebration of flavors.
          </p>
        </div>
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Quick Links</h2>
          <ul>
            <li>
              <Link href="/" className="hover:text-white transition-colors duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="products" className="hover:text-white transition-colors duration-300">
                Products
              </Link>
            </li>
            <li>
              <Link href="contact" className="hover:text-white transition-colors duration-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <Link href="https://www.facebook.com/share/18bSLnakAh/" className="hover:text-white transition-colors duration-300">
              <FaFacebook className="inline-block mr-2" />
              Facebook
            </Link>
            <Link href="https://www.instagram.com/kajalgroup_pvt_ltd?igsh=MXJvNjVlMGh2M240NA==" className="hover:text-white transition-colors duration-300">
              <FaInstagram className="inline-block mr-2" />
              Instagram
            </Link>
          </div>
        </div>
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Contact Us</h2>
          <p>Giridih, Jharkhand</p>
          <p>Giridih 815301</p>
          <p>Email: kajalproducts@gmail.com</p>
          <p>Phone: +91 9470 050 9040</p>
        </div>
      </div>
      <p className="text-center text-xs pt-8">© 2025 Kajal Bakery's Cakes & Snacks. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
