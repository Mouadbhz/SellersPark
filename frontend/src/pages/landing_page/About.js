import React from 'react';
import { useInView } from 'react-intersection-observer';
import Footer from '../../components/footer/footer'; // Adjust the path as per your project structure
import shopImage from '../../pages/images/variety.png';
import sellerImage from '../../pages/images/selleer.png';
import varietyImage from '../../pages/images/varity.png';
import secureImage from '../../pages/images/security.png';
import './about.css';  // Import the CSS file

const AboutUs = () => {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref4, inView4] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <div className="about-us-container mx-auto p-4" style={{ marginTop: '68px' }}>
        <div className="flex flex-col space-y-8">
          {/* Why You Should Shop on Our Site */}
          <div ref={ref1} className={`flex flex-row items-center transition-opacity duration-1000 ${inView1 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="about-us-text w-1/2 p-4">
              <h2 className="text-4xl font-rowdies font-bold mb-4">Why You Should Shop on Our Site</h2>
              <p className="text-xl font-urbanist">
                Shopping on our site offers you unbeatable prices, a wide range of products, and a seamless shopping experience. Our customer service is dedicated to providing the best support to ensure your satisfaction.
              </p>
              <p className="text-xl font-urbanist mt-4">
                Enjoy exclusive deals and discounts, easy returns, and fast shipping when you shop with us. We aim to make your shopping experience as pleasant as possible.
              </p>
            </div>
            <div className="about-us-image w-1/2 p-4">
              <img src={shopImage} alt="Why You Should Shop on Our Site" className="rounded" />
            </div>
          </div>

          {/* Why You Should Be a Seller */}
          <div ref={ref2} className={`flex flex-row-reverse items-center transition-opacity duration-1000 ${inView2 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="about-us-text w-1/2 p-4">
              <h2 className="text-4xl font-rowdies font-bold mb-4">Why You Should Be a Seller</h2>
              <p className="text-xl font-urbanist">
                Becoming a seller on our platform allows you to reach a vast audience, benefit from our marketing efforts, and grow your business with our supportive seller community. We provide the tools and resources needed to succeed.
              </p>
              <p className="text-xl font-urbanist mt-4">
                Join our platform to take advantage of our secure payment system, comprehensive analytics, and dedicated seller support team. We're here to help you thrive.
              </p>
            </div>
            <div className="about-us-image w-1/2 p-4">
              <img src={sellerImage} alt="Why You Should Be a Seller" className="rounded" />
            </div>
          </div>

          {/* Variety of Products */}
          <div ref={ref3} className={`flex flex-row items-center transition-opacity duration-1000 ${inView3 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="about-us-text w-1/2 p-4">
              <h2 className="text-4xl font-rowdies font-bold mb-4">Variety of Products</h2>
              <p className="text-xl font-urbanist">
                We offer a diverse range of products from various categories including electronics, fashion, home goods, and more. Our platform ensures that you find exactly what you need, all in one place.
              </p>
              <p className="text-xl font-urbanist mt-4">
                Our ever-expanding inventory is sourced from trusted sellers and brands, ensuring quality and reliability with every purchase. Discover new products and find your favorites with ease.
              </p>
            </div>
            <div className="about-us-image w-1/2 p-4">
              <img src={varietyImage} alt="Variety of Products" className="rounded" />
            </div>
          </div>

          {/* Secure and Easy Shopping */}
          <div ref={ref4} className={`flex flex-row-reverse items-center transition-opacity duration-1000 ${inView4 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="about-us-text w-1/2 p-4">
              <h2 className="text-4xl font-rowdies font-bold mb-4">Secure and Easy Shopping</h2>
              <p className="text-xl font-urbanist">
                Our website offers a secure shopping experience with multiple payment options and a user-friendly interface. We prioritize your security and convenience, ensuring a smooth and enjoyable shopping experience.
              </p>
              <p className="text-xl font-urbanist mt-4">
                Your data is protected with top-notch encryption, and our intuitive design makes shopping quick and hassle-free. Shop with confidence knowing your information is safe with us.
              </p>
            </div>
            <div className="about-us-image w-1/2 p-4">
              <img src={secureImage} alt="Secure and Easy Shopping" className="rounded" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
