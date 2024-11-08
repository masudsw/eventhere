import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import useAxiosCommon from "../../hooks/useAxiosCommon";


const FindEvents = () => {
    const [count, setCount] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(4)
    const [currentPage, setCurrentPage] = useState(1)
    const [events, setEvents] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [searchLocation,setSearchLocation]=useState('');
    const axiosSecure = useAxiosSecure();
    const axiosCommon=useAxiosCommon();


    useEffect(() => {
        const getCount = async () => {
            try {
                const response = await axiosCommon.get(`/totalevents?title=${searchTitle}&location=${searchLocation}`);
                setCount(response.data.count);
            } catch (error) {
                console.error('Error fetching number of searched tasks:', error);
            }
        }
        getCount()
    }, [searchTitle,searchLocation])

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axiosCommon.get(`/findmyevents?title=${searchTitle}&location=${searchLocation}&page=${currentPage}&size=${itemsPerPage}`);

                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        getData();
        console.log('events',events);
    }, [searchTitle,searchLocation, currentPage, itemsPerPage]);
    


    const numberOfPages = Math.ceil(count / itemsPerPage)
    const pages = [...Array(numberOfPages).keys()].map(element => element + 1)
    const handlePaginationButton = value => {
        console.log(value)
        setCurrentPage(value)
    }

    return (
        <div className="overflow-x-auto">
            <Helmet>
                <title>EventsHere | Find my events</title>
            </Helmet>
            <h1 className="text-2xl">Total Events ({events.length})</h1>

            <div className="lg:w-[70%] mx-auto">
                <form>
                    <h1 className="text-2xl font-bold text-center">Search events by</h1>
                    <div className='flex justify-center p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
                        <input
                            className='px-6 py-2 text-gray-700 placeholder-gray-500 
                            bg-white outline-none focus:placeholder-transparent w-80'
                            type='text'
                            onChange={e => setSearchTitle(e.target.value)}
                            value={searchTitle}
                            name='searchtitle'
                            placeholder='Search a event by title name'
                            aria-label='Enter service Title'
                        />
                        <input
                            className='px-6 py-2 text-gray-700 placeholder-gray-500 
                            bg-white outline-none focus:placeholder-transparent w-80'
                            type='text'
                            onChange={e => setSearchLocation(e.target.value)}
                            value={searchLocation}
                            name='searchlocation'
                            placeholder='Search a event by location'
                            aria-label='Enter event location'
                        />
                    </div>
                </form>
            </div>

            {events.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Even Creator</th>
                            <th>Event Title</th>
                            <th>Event Locatin</th>
                            <th>Ticket Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map(event => (
                            <tr key={event._id}>
                                <td>
                                    <label>

                                    </label>
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={event.user_img} alt="User Avatar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{event.userName}</div>
                                            <div className="text-sm opacity-50">{event.userEmail}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {event.title}
                                    <img className="mask mask-squircle w-12 h-12" src={event.image} alt="Service Image" />
                                    {/* <span className="badge badge-ghost badge-sm">{event.specialnote.length > 20 ? `${service.description.slice(0, 20)}...` : service.description}</span> */}
                                </td>
                                <td>
                                    
                                    <p>{event.location}</p>
                                </td>
                                <td>
                                    <p>{event.entryFee}</p>
                                </td>
                                <td>
                                    <Link to={`/event/${event._id}`}>
                                        <button className="btn btn-ghost btn-xs">Details</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    {/* <tfoot>
                        <tr>
                            <th></th>
                            <th>Event title</th>
                            <th>Event Location</th>
                            <th>price</th>
                            <th></th>
                        </tr>
                    </tfoot> */}
                </table>
            )}
            {/* Pagination Section */}
            <div className='flex justify-center mt-12'>
                {/* Previous Button */}
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePaginationButton(currentPage - 1)}
                    className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white'
                >
                    <div className='flex items-center -mx-1'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6 mx-1 rtl:-scale-x-100'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M7 16l-4-4m0 0l4-4m-4 4h18'
                            />
                        </svg>

                        <span className='mx-1'>previous</span>
                    </div>
                </button>
                {/* Numbers */}
                {pages.map(btnNum => (
                    <button
                        onClick={() => handlePaginationButton(btnNum)}
                        key={btnNum}
                        className={`hidden ${currentPage === btnNum ? 'bg-blue-500 text-white' : ''
                            } px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
                    >
                        {btnNum}
                    </button>
                ))}
                {/* Next Button */}
                <button
                    disabled={currentPage === numberOfPages}
                    onClick={() => handlePaginationButton(currentPage + 1)}
                    className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'
                >
                    <div className='flex items-center -mx-1'>
                        <span className='mx-1'>Next</span>

                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6 mx-1 rtl:-scale-x-100'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M17 8l4 4m0 0l-4 4m4-4H3'
                            />
                        </svg>
                    </div>
                </button>
            </div>

        </div>

    );
};

export default FindEvents;
