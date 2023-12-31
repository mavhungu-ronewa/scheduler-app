import moment from 'moment';
import { PiBookOpenTextLight } from "react-icons/pi";
import { FaLocationPin, FaLocationDot  } from "react-icons/fa6";
import { BsTextLeft, BsGlobe } from "react-icons/bs";
import { BiSolidVideo } from "react-icons/bi";
import { MdOutlineAccessTime } from "react-icons/md";
/*import { FaChevronDown, FaChevronUp } from "react-icons/fa";*/

const CardComponent = ({id, dates, title, description})=>{
  moment.locale();
  moment().format();

  //Function that return formatted Date and time
  const dateFormat = (item)=>{
    return moment(new Date(item)).format('YYYY-MM-DD HH:mm:ss');
  }
  return (
    <div className={'border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'}>
      <h2 className='absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg'>
        {dateFormat(dates)}
      </h2>
      <h4 className='my-2 text-gray-500'>{title}</h4>
      <div className='flex justify-start items-center gap-x-2'>
        <PiBookOpenTextLight className='text-gray-400 text-2xl' />
        <h2 className='my-1'>{dateFormat(dates)}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <MdOutlineAccessTime className='text-gray-400 text-2xl' />
        <h2 className='my-1'>{dateFormat(dates)}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <BiSolidVideo className='text-gray-400 text-2xl' />
        <h2 className='my-1'>{dateFormat(dates)}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <PiBookOpenTextLight className='text-gray-400 text-2xl' />
        <h2 className='my-1'>{dateFormat(dates)}</h2>
      </div>
      {description && (
        <div className={'flex justify-start items-center gap-x-2'}>
          <BsTextLeft className={'text-gray-400 text-2xl'} />
          <h2 className={'my-1'}>{description}</h2>
        </div>
      )}
    </div>
  )
}
export default CardComponent;