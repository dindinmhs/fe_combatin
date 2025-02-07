import Image from "next/image"
import { DropDown } from "./dropdown";
import Link from "next/link";
import { IoMdPerson } from "react-icons/io";

interface Props {
    otherStyles? : string;
    type : 'border' | 'default';
    src? : string;
}

export const ProfileIcon = ({ otherStyles='w-12', type, src='/profile.jpg' } : Props) => {
    if (type === 'border') {
        return (
            <Image
                src={src}
                className={`${otherStyles} aspect-square rounded-full border-4 border-black`}
                width={200}
                height={200}
                alt="profile"
            />
        )
    }
    return (
        <div className="p-1 rounded-full hover:bg-gray-300 bg-transparent">
            <Image
                src={src}
                className={`${otherStyles} aspect-square rounded-full`}
                width={200}
                height={200}
                alt="profile"
            />
        </div>
    )
}

export const ProfileDropdown = () => {
    return (
        <DropDown trigger={<ProfileIcon type="default"/>}>
            <Link href={'/profile'} className="flex gap-2 hover:bg-gray-200 px-3 py-2 items-center">
                <IoMdPerson size={25}/>
                <p>Profile</p>
            </Link>
        </DropDown>
    )
}