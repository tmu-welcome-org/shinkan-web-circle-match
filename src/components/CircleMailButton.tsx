import { IoMailOutline } from "react-icons/io5";

import CircleContactButton from "./CircleContactButton";

export default function CircleMailButton({ email }: { email: string }) {

    return (
        <CircleContactButton url={null} label={email} contactIcon={<IoMailOutline className="w-6 h-6 text-gray-700 group-hover:text-white" />} textClass="text-gray-700 group-hover:text-white" bgClass="bg-white border-gray-700 hover:bg-gray-700" />
    )
}