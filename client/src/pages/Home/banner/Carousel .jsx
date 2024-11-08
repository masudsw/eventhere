import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function App() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="carousel-item relative w-[80%] h-[250px] bg-green-600">
         
                <img src="https://i.ibb.co/BfBnqVq/drama.jpg" className="w-full rounded-xl" />
                <div className="absolute rounded-xl flex items-center h-full w-[90%] left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                    <div className='text-white space-y-7 pl-12 w-1/2'>
                        <h2 className='text-4xl font-bold'>Victory Day Program</h2>
                        <p>Join our victory day event. In Mirpur stadium dhaka. We will celebrate with different activities. Children have special activities</p>
                        {/* <div>
                            <button className="btn btn-primary mr-5">Discover More</button>
                        </div> */}
                    </div>
                </div>      
            </div>

        </SwiperSlide>
        <SwiperSlide>
        <div className="carousel-item relative w-[80%] h-[250px] bg-green-600">
                <img src="https://i.ibb.co/FXhS6FQ/software.jpg" className="w-full rounded-xl" />
                <div className="absolute rounded-xl flex items-center h-full w-[90%] left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                    <div className='text-white space-y-7 pl-12 w-1/2'>
                        <h2 className='text-2xl font-bold'>Catering</h2>
                        <p className='text-xl'>Our catering services provide delicious and diverse menus to satisfy every palate. From hors d'oeuvres to main courses and desserts, our culinary team ensures that your event is a gastronomic delight.</p>
                        {/* <div>
                            <button className="btn btn-primary mr-5">Discover More</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="carousel-item relative w-[80%] h-[250px] bg-green-600">
                <img src="https://i.ibb.co/xFhh95D/eid.jpg" className="w-full rounded-xl" />
                <div className="absolute rounded-xl flex items-center h-full w-[90%] left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                    <div className='text-white space-y-7 pl-12 w-1/2'>
                        <h2 className='text-4xl font-bold'>Eid Reunion</h2>
                        <p>Celebrate Eid Reunion in Chittagong Club. Song drama and other entertainment activities will be take place in the heart of Chittagong. All are invited</p>
                        {/* <div>
                            <button className="btn btn-primary mr-5">Discover More</button>
                        </div> */}
                    </div>
                </div>      
            </div>

        </SwiperSlide>
        <SwiperSlide>
          <div className="carousel-item relative w-[80%] h-[250px] bg-green-600">
                <img src="https://i.ibb.co/drk67pB/bakery.jpg" className="w-full rounded-xl" />
                <div className="absolute rounded-xl flex items-center h-full w-[90%] left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                    <div className='text-white space-y-7 pl-12 w-1/2'>
                        <h2 className='text-4xl font-bold'>Bake Competition</h2>
                        <p>Bring your cake, cookies and know each other to explore your reach on the community. Bring your kids and family. Have some free cake and cookies</p>
                        {/* <div>
                            <button className="btn btn-primary mr-5">Discover More</button>
                        </div> */}
                    </div>
                </div>      
            </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="carousel-item relative w-[80%] h-[250px] bg-green-600">
                <img src="https://i.ibb.co/GFJTk41/jobfair.jpg" className="w-full rounded-xl" />
                <div className="absolute rounded-xl flex items-center h-full w-[90%] left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                    <div className='text-white space-y-7 pl-12 w-1/2'>
                        <h2 className='text-4xl font-bold'>Job Fair</h2>
                        <p>HR manager from top company are comming in next 15 th december. Bring your resume, have direct intreview and get hired in various multinational company</p>
                        <div>
                            <button className="btn btn-primary mr-5">Discover More</button>
                        </div>
                    </div>
                </div>      
            </div>
        </SwiperSlide>
        
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
}
