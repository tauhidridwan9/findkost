'use client'
import Container from "../Container";
import { BiSolidHotel } from "react-icons/bi";
import {MdApartment,MdSportsCricket, MdOutlineCardTravel,MdVilla} from "react-icons/md";
import CategoryBox from '../CategoryBox';
import {ImHome, ImOffice} from 'react-icons/im';
import { usePathname, useSearchParams } from "next/navigation";
import {GiForestCamp} from 'react-icons/gi'


export const categories=[{
label: "Penginapan",
icon: MdOutlineCardTravel,
description: "Tempat untuk menemani perjalanan anda"

},
{
label: "Apatement",
icon: MdApartment,
description: "Sewa apartement untuk penunjang kegiatan anda"

},
{
label: "GOR",
icon: MdSportsCricket,
description: "Penunjang kegiatan hidup sehat"

},
{
label: "Rumah",
icon: ImHome,
description: "Penunjang kegiatan hidup sehat"

},
{
label: "Kostan",
icon: BiSolidHotel,
description: "Teman mahasiswa dan buruh"

},
{
label: "Gedung",
icon: ImOffice,
description: "Sewa gedung untuk acara"

},
{
label: "Villa",
icon: MdVilla,
description: "Sewa villa untuk refreshing anda"

},
{
label: "Camping",
icon: GiForestCamp,
description: "Wisata alam tanpa takut kebasahan"

},

]
const Categories = () => {

    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage= pathname === '/'

    if(!isMainPage){
        return null
    }
    return ( 
        <Container>
             <div
        className="
        pt-4
        flex
        flex-row
        items-center
        justify-between
        overflow-x-auto
        ">
            {categories.map((item)=>(
                <CategoryBox
                key={item.label}
                label={item.label}
                selected={category === item.label}
                icon={item.icon}/>
            ))}

        </div>
        </Container> 
       
    );
}
 
export default Categories;