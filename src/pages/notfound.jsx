import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='text-white'>
            <h1 className='text-[40px]'>404</h1>
            <p className='text-[18px] mb-[20px]'>Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" className="p-[12px] bg-[#222C4F] rounded-[18px]">Go back to Home</Link>
        </div>
    );
};

export default NotFound