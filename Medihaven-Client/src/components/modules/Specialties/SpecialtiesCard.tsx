import { ISpecialties } from '@/types/specialties';
import Image from 'next/image';

const SpecialtiesCard = ({specialties}:{specialties:ISpecialties}) => {
    return (
        <div className="w-full bg-white rounded-2xl p-6 text-center border transition">
            <div className="w-14 h-14 mx-auto flex items-center justify-center bg-violet-50 rounded-xl mb-2">
                <Image src={specialties?.icon} height={30} width={30} alt='icon'/>
            </div>
            <h2 className='text-md font-semibold text-gray-800'>{specialties.title}</h2>
            <p className="text-sm text-gray-500 mt-1">{specialties?.doctorSpecialties?.length} doctors</p>
        </div>
    );
};

export default SpecialtiesCard;