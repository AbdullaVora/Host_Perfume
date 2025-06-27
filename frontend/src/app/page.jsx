'use client'
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, EffectFade } from 'swiper/modules'

// Import CSS files
import 'aos/dist/aos.css';
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

// Import Components
import AOS from 'aos'
import GalleryBox from '@/components/GalleryBox';
import PolicyCard from '@/components/PolicyCard';
import ArrivalCard from '@/components/ArrivalCard';
import GalleryBox_2 from '@/components/GalleryBox_2';
import OurProductBox from '@/components/OurProductBox';
import TestiminoalBox from '@/components/TestiminoalBox';
import FlahCard from '@/components/FlahCard';
import LatestNews from '@/components/LatestNews';
import GramGallery from '@/components/GramGallery';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { fetchProducts as fetchHomeProducts } from '@/redux/slice/CollectionSlice';
import { fetchBanners, fetchProducts, fetchSliders } from '@/redux/slice/HomeSlice';
import { getUserWishlist } from '@/redux/slice/wishSlice';
import VideoBanner from '@/components/BannerVideo';
import { generateMetadata, generateOrganizationSchema, staticPagesSEO } from '@/lib/SEO';
import { metadata } from '@/components/SEO/SEO';
import Script from 'next/script';


export default function Home() {

  // useEffect(() => {
  //   metadata(staticPagesSEO.home, '/');
  // },[])

  const frontendUrl = process.env.NEXT_FRONTEND_URL;

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "HQ PERFUME",
    "url": frontendUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${frontendUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = generateOrganizationSchema()



  const dispatch = useDispatch()
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // useEffect(() => {
  //   dispatch(fetchBanners());
  //   dispatch(fetchSliders());
  //   dispatch(fetchProducts())
  //   dispatch(fetchHomeProducts())
  // }, [dispatch])

  // useEffect(() => {
  //   const hasFetched = { current: false };

  //   if (!hasFetched.current) {
  //     dispatch(getUserWishlist());
  //     hasFetched.current = true;
  //   }
  // }, [dispatch])


  const { Home, loading: Loading } = useSelector((state) => state.Home)
  const data = Home;
  const {
    galleryImage,
    policy,
    products,
    gallery_2,
    product,
    gram,
    sliders,
    banners
  } = data;

  // useEffect(() => {
  //   // Only fetch data if it hasn't been loaded yet
  //   if (!banners || banners.length === 0) {
  //     dispatch(fetchBanners());
  //   }
  //   if (!sliders || sliders.length === 0) {
  //     dispatch(fetchSliders());
  //   }
  //   if (!products || products.length === 0) {
  //     dispatch(fetchProducts());
  //   }
  //   if (!Home || !Home.product) {
  //     dispatch(fetchHomeProducts());
  //   }
  // }, [dispatch, banners, sliders, products, Home]);

  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;

    if (!banners || banners.length === 0) {
      dispatch(fetchBanners());
    }
    if (!sliders || sliders.length === 0) {
      dispatch(fetchSliders());
    }
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
    if (!Home || !Home.product) {
      dispatch(fetchHomeProducts());
    }

    fetched.current = true;
  }, [dispatch, banners, sliders, products, Home]);


  // console.log(sliders)
  const banner = banners.filter((item) => item.forPage === 'Home' && item.forSection === 'Banner' && item.status === true);
  const testimonials = sliders.filter((item) => item.forPage === 'Home' && item.forSection === "Testimonials" && item.status === true);
  const flashDeals = products.filter((item) => item.forPage === 'Home' && item.forSection === "Flash Deals" && item.status === true);
  const news = sliders.filter((item) => item.forPage === 'Home' && item.forSection === "Latest News" && item.status === true);
  const arrival = products.filter((item) => item.forPage === 'Home' && item.forSection === "New Arrival" && item.status === true);
  const Ourproduct = products.filter((item) => item.forPage === 'Home' && item.forSection === "Our Products" && item.status === true);
  console.log(banner)
  // console.log(arrival)

  // Set the target date for the countdown (e.g., 24 hours from now)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  console.log("arrival:", arrival)

  useEffect(() => {
    // Set the target date (e.g., end of the current day)
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999); // Set to end of current day

      const difference = endOfDay - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({
          days: days.toString().padStart(2, '0'),
          hours: hours.toString().padStart(2, '0'),
          minutes: minutes.toString().padStart(2, '0'),
          seconds: seconds.toString().padStart(2, '0')
        });
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(timer);
  }, []);

  if (Loading) {
    return (
      <div className='loader-container'>
        <span className="loader"></span>
      </div>
    );
  }


  return (

    <>
      {/* SEO  */}
      <Script
        id="website-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {/* Banner Start */}
      {/* <div className="banner pb-5" data-aos="zoom-out" style={{ backgroundImage: banner[0]?.desktopImage ? `url(${banner[0]?.desktopImage})` : 'none' }}>
        <div className="contents">
          <h1 className='text-white h1-response fw-normal'>Modern Living Room</h1>
          <p className='text-white p-response text-capitalize'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          <Link href="/collection"><button className='bg-transparent border-light py-2 px-3 py-sm-3 px-sm-5 text-white rounded-1'>SHOP NOW</button></Link>
        </div>
      </div> */}
      <VideoBanner videoss={banner} />
      {/* Banner End */}

      {/* Gallery Start */}
      <div className="gallery py-2 my-5" data-aos="fade-up">
        <div className="container">
          <div className="img-group row g-4">
            {galleryImage.map((img, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <GalleryBox
                  img={img.img}
                  title_1={img.title_1}
                  title_2={img.title_2}
                  category={img.category}      // Pass category
                  subcategory={img.subcategory} // Pass subcategory
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Gallery End */}

      {/* Policy Start */}
      <div className="policy py-2 mt-5">
        <div className="container">
          <div className="row">
            {policy.map((card, key) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <PolicyCard
                  img={`/images/policy_${key + 1}.webp`}
                  title={card.title}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Policy End */}

      {/* New Arrival Start */}
      {/* <div className="arrival py-5 mt-5" data-aos="zoom-in">
        <div className="container">
          <h2 className='text-center display-5 fw-normal mb-5'>New Arrival</h2>
          <div className="cardGroup row">
            <div className="main-card col-4 px-2">
              <Image
                src="/images/arrival_1.webp"
                alt="image"
                className='img-fluid'
                width={500}
                height={500}
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="sideCards col-8 d-flex flex-wrap">
              {arrival.map((card, index) => (
                <ArrivalCard
                  key={index}
                  id={card.id}
                  img={card.img}
                  price={card.price}
                  title={card.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div> */}
      <div className="container">
        <div className="arrival py-3 py-md-5 mt-3 mt-md-5">
          <h2 className='text-center display-5 fw-normal mb-3 mb-md-5'>New Arrival</h2>
          <div className="sideCards col-12 d-flex flex-wrap justify-content-between">
            {arrival.map((card, index) => (
              <div
                key={index}
                className="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3"
                style={{ maxWidth: '250px' }}
              >
                <ArrivalCard
                  id={card._id}
                  img={card.thumbnail}
                  price={card.variants?.variants[0]?.price.toFixed(2) || card.price}
                  title={card.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* New Arrival End */}

      {/* ****************************** Gallery_2 Start ***************************** */}
      <div className="gallery_2 mt-3">
        <div className="container">
          <div className="row">
            {gallery_2.map((box, index) => (
              <div key={index} className="col-lg-6 col-md-6 col-12 mb-3">
                <GalleryBox_2 img={box.img} title={box.title} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ****************************** Gallery_2 End ***************************** */}



      {/* Our Products Start */}
      {/* <div className="ourProducts py-5 mt-5" data-aos="fade-right">
        <div className="container">
          <h2 className='text-center display-5 fw-normal mb-5'>Our Products</h2>
          <div className="product-cards d-flex flex-row flex-wrap">
            <div className="rightCards d-flex flex-wrap col-4 justify-content-evenly">
              {Ourproduct.slice(0, 4).map((card, index) => (
                <OurProductBox
                  key={index}
                  id={card._id}
                  img={card.thumbnail}
                  price={card.price}
                  title={card.name}
                />
              ))}
            </div>
            <div className="centerCard col-4" data-aos="zoom-in">
              <OurProductBox
                img={'/images/product_5.jpg'}
                title={'Uiamond Halo Stud Cum'}
                price={1299}
                Cwidth={'100%'}
              />
              <Link
                href="/collection"
                className='text-decoration-none'
              >
                <button className='bg-transparent py-2 px-5 position-absolute start-50 translate-middle-x'>
                  View All
                </button>
              </Link>
            </div>
            <div className="LeftCards d-flex flex-wrap col-4 justify-content-evenly">
              {Ourproduct.slice(3, 8).map((card, index) => (
                <OurProductBox
                  key={index}
                  id={card._id}
                  price={card.price}
                  img={card.thumbnail}
                  title={card.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="ourProducts py-5 mt-5" data-aos="fade-right">
        <div className="container">
          <h2 className='text-center display-5 fw-normal mb-5'>Our Products</h2>
          <div className="product-cards">
         
            <div className="d-block d-lg-none">
              <div className="row">
                {Ourproduct.map((card, index) => (
                  <div className="col-6 col-md-4" key={index}>
                    <ArrivalCard
                      id={card._id}
                      img={card.thumbnail}
                      price={card.price}
                      title={card.name}
                    />
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <Link href="/collection" className='text-decoration-none'>
                  <button className='bg-transparent py-2 px-5'>
                    View All
                  </button>
                </Link>
              </div>
            </div>


            <div className="d-none d-lg-flex flex-row flex-wrap">
              <div className="LeftCards d-flex flex-wrap justify-content-between">
                {Ourproduct.map((card, index) => (
                  <ArrivalCard
                    key={index}
                    id={card._id}
                    price={card.price}
                    img={card.thumbnail}
                    title={card.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="container">
        <div className="our-products py-3 py-md-5 mt-3 mt-md-5">
          <h2 className='text-center display-5 fw-normal mb-3 mb-md-5'>Our Products</h2>
          <div className="sideCards col-12 d-flex flex-wrap justify-content-between">
            {Ourproduct.map((card, index) => (
              <div
                key={index}
                className="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3"
                style={{ maxWidth: '250px' }}
              >
                <ArrivalCard
                  id={card._id}
                  img={card.thumbnail}
                  // price={card.price}
                  price={card.variants?.variants[0]?.price.toFixed(2) || card.price}
                  title={card.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Our Products End */}

      {/* Testimonial Start */}
      <div className="testimonial">
        <div className="container">
          <h2 className="text-center display-5 fw-normal mb-5">Testimonials</h2>
          <Swiper
            modules={[Pagination, Autoplay, EffectFade]}
            spaceBetween={20}
            slidesPerView={3}
            autoplay={{ delay: 2000 }}
            loop={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            speed={2000}
            fadeEffect={{ crossFade: true }}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <TestiminoalBox
                  title={testimonial.title}
                  author={testimonial.subTitle}
                  img={testimonial.image}
                  description={testimonial.description}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {/* Testimonial End */}

      {/* ****************************** Flash Deals Start ***************************** */}
      <div className="flashDeals py-5 mt-5">
        <div className="container">
          <h2 className="text-center display-5 fw-normal mb-5">Flash Deals</h2>
          <Swiper
            modules={[Pagination, Autoplay, EffectFade]}
            spaceBetween={10}  // Adjust spacing between slides
            slidesPerView={4}  // Set 4 slides per view
            autoplay={{ delay: 1000, reverseDirection: true }}
            loop={true}
            breakpoints={{
              0: { slidesPerView: 1 },   // 1 slide for small screens
              768: { slidesPerView: 2 }, // 2 slides for tablets
              1024: { slidesPerView: 3 }, // 3 slides for desktops
              1440: { slidesPerView: 4 }, // 4 slides for larger screens
            }}
            speed={2000}
            fadeEffect={{ crossFade: true }}
          >
            {flashDeals.map((flash, index) => (
              <SwiperSlide key={index}>
                <FlahCard id={flash._id} title={flash.name} price={flash.variants?.variants[0].price.toFixed(2) || flas.price.toFixed(2)} img={flash.thumbnail} />
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </div>
      {/* ****************************** Flash Deals End ***************************** */}

      {/* ****************************** Latest News Start ***************************** */}
      {/* <div className="latestNews py-5 mt-5">
        <div className="container">
          <h2 className="text-center display-5 fw-normal mb-5">Latest News</h2>
          <Swiper
            modules={[Pagination, Autoplay, EffectFade]}
            spaceBetween={10}  // Adjust spacing between slides
            slidesPerView={1}  // Set 4 slides per view
            autoplay={{ delay: 2000 }}
            loop={true}

            speed={2000}
            fadeEffect={{ crossFade: true }}
          >
            {news.map((news, index) => (
              <SwiperSlide key={index}>
                <LatestNews title={news.title} img={news.image} description={news.description} author={news.publisherName} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div> */}
      <div className="latestNews mt-5">
        <div className="container">
          <h2 className="text-center display-5 fw-normal mb-5">Latest News</h2>
          <Swiper
            modules={[Pagination, Autoplay, EffectFade]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false
            }}
            loop={true}
            speed={2000}
            fadeEffect={{ crossFade: true }}
            breakpoints={{
              // when window width is >= 576px
              576: {
                slidesPerView: 1,
                spaceBetween: 20
              },
              // when window width is >= 768px
              768: {
                slidesPerView: 1,
                spaceBetween: 30
              },
              // when window width is >= 992px
              992: {
                slidesPerView: 1,
                spaceBetween: 40
              },
              // when window width is >= 1200px
              1200: {
                slidesPerView: 1,
                spaceBetween: 50
              }
            }}
          >
            {news.map((news, index) => (
              <SwiperSlide key={index}>
                <LatestNews
                  title={news.title}
                  img={news.image}
                  description={news.description}
                  author={news.publisherName}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {/* ****************************** Latest News End ***************************** */}


      {/* Deal Start */}
      {/* <div className="deal py-3 py-md-5 mt-3 mt-md-5">
        <div className="container">
          <div className="bg py-3 py-md-5 shadow-lg rounded-2">
            <div className="row g-3 g-md-5 px-3 px-md-5 align-items-center">

              <div className="col-12 col-md-6 order-2 order-md-1">
                <div className="img d-flex justify-content-center">
                  <Image
                    src="/images/deal.png"
                    alt="deal"
                    className='img-fluid rounded'
                    width={600}
                    height={600}
                    style={{
                      objectFit: 'cover',
                      maxHeight: '400px',
                      width: '100%'
                    }}
                    priority
                  />
                </div>
              </div>


              <div className="col-12 col-md-6 order-1 order-md-2">
                <div className="content text-center text-md-start">
                  <h2 className='display-5 display-md-4 fw-bold mb-3'>Deal Of The Day</h2>
                  <p className='text-muted mb-4 mb-md-5'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptates...
                  </p>


                  <div className="timer row g-2 justify-content-center justify-content-md-start">
                    {['days', 'hours', 'minutes', 'seconds'].map((label, index) => (
                      <div
                        key={index}
                        className="box col-5 col-sm-3 col-md-5 col-lg-3 text-center mx-1 bg-light py-2 rounded fs-4 fw-bold" style={{ minWidth: '80px' }}
                      >
                        <span className="d-block">{timeLeft[label]}</span>
                        <small className='text-muted fw-normal text-uppercase' style={{ fontSize: '0.65rem' }}>
                          {label}
                        </small>
                      </div>
                    ))}
                  </div>


                  <div className="d-flex justify-content-center justify-content-md-start mt-4 mt-md-5">
                    <Link href="/collection" className='text-decoration-none'>
                      <button className='btn fw-semibold px-4 py-2 px-md-5 py-md-3'>
                        Shop Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* Deal End */}


      {/* ****************************** Gallery Start ***************************** */}
      {/* <div className="gramGallery py-5 mt-5 ">
        <div className="container">
          <h2 className="text-center display-5 fw-normal mb-5">Gram Gallery</h2>
          <div className="row">
            {gram.map((gram, index) => (
              <div className="col-6 mb-2 px-1 col-sm-4 col-md-3 col-lg-2" key={index}>
                <GramGallery img={gram.img} />
              </div>
            ))}
          </div>
        </div>
      </div> */}
      {/* ****************************** Gallery End ***************************** */}

      {/* Footer Start */}
      {/* <Footer /> */}
      {/* Footer End */}
    </>
  )
}

