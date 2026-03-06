import appConfig from '../config.json'
import { type CircleLink } from "../CircleDataHandler";
import { FaLine, FaHome, FaYoutube } from "react-icons/fa";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";

import CircleContactButton from './CircleContactButton';

export default function CircleLinkButton({ type, label, uri }: CircleLink) {

    const iconClass = "z-50 w-6 h-6 transition-colors"
    const { linkIcon, textClass , bgClass } = (() => {
        switch (type) {
            case "lineOC":
            case "lineOfficial":
                return { linkIcon: <FaLine className={`${iconClass} text-[#06C755] group-hover:text-white`} />, textClass: "text-[#06C755] group-hover:text-white", bgClass: "border-[#06C755] bg-white hover:bg-[#06C755]" };
            case "twitter":
                return { linkIcon: <FaXTwitter className={`${iconClass} text-black group-hover:text-white`} />, textClass: "text-black group-hover:text-white", bgClass: "border-black bg-white hover:bg-black" };
            case "youtube":
                return { linkIcon: <FaYoutube className={`${iconClass} text-[#ff0000] group-hover:text-white`} />, textClass: "text-[#ff0000] group-hover:text-white", bgClass: "border-[#ff0000] bg-white hover:bg-[#ff0000]" };
            case "instagram":
                return { linkIcon: <FaInstagram className={`${iconClass} text-[#FCB045]  group-hover:text-white`} />, textClass: "text-[#FCB045] group-hover:text-white", bgClass: "border-[#FCB045] before:z-0 before:opacity-0 before:transition-opacity hover:before:opacity-100  before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-[#833ab4] before:via-[#fd1d1d] before:to-[#fcb045]" };
            case "website":
            default:
                return { linkIcon: <FaHome className={`${iconClass} text-green-700 group-hover:text-white`} />, textClass: "text-green-700 group-hover:text-white", bgClass: "bg-white border-green-700 hover:bg-green-700" };
        }
    })();

    const anchorUrl = (() => {
        const prefix = appConfig.links_uri_prefix[type] || "";
        return prefix + uri;
    })

    const displayLabel = () => { return label !== "" ? label : (appConfig.links_default_label[type] || type) }

    return (
        <CircleContactButton url={anchorUrl()} label={displayLabel()} contactIcon={linkIcon} textClass={textClass} bgClass={bgClass} />
    )
}
