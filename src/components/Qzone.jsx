import Class from '../assets/class.png'
import swimming from '../assets/swimming.png'
import playground from '../assets/playground.png'

const Qzone = () => {
    return (
        <div className='p-3 bg-base-200 w-full'>
            <h2 className="font-semibold">Q-Zone</h2>
            <div className='flex flex-col justify-center items-center'>

                <div><img src={swimming} alt="" /></div>
                <div><img src={Class} alt="" /></div>
                <div><img src={playground} alt="" /></div>
            </div>
        </div>
    );
};

export default Qzone;