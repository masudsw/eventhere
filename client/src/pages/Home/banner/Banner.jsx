import Carousel  from "./Carousel ";


const images=[
  {
    url:'https://i.ibb.co/9w0T23T/venue-booking.jpg',
    alt:'image1',
    title:'title1',
    description:'description1'
  },
  {
    url:'https://i.ibb.co/xmKKZVM/Catering.jpg',
    alt:'image2',
    title:'title2',
    description:'description2'
  },
  {
    url:'https://i.ibb.co/x5VsgBf/Event-Decoration.jpg',
    alt:'image3',
    title:'title3',
    description:'description3'
  },
  {
    url:'https://i.ibb.co/99h0ZNf/entertainment.jpg',
    alt:'image4',
    title:'title4',
    description:'description4'
  },
  {
    url:'https://i.ibb.co/Wk2mcDK/event-plan.jpg',
    alt:'image5',
    title:'title5',
    description:'description5'
  },
  {
    url:'https://i.ibb.co/0m2FbtN/On-site-Staffing.jpg',
    alt:'image6',
    title:'title6',
    description:'description6'
  }

]
const Bannar = () => {
  
    return (
      <div>
        <Carousel />
      </div>
    );
};

export default Bannar;