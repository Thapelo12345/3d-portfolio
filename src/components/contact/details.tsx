import { MapPinIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline"
import DetailsCell from "./detailsCell"

export default function Details(){
    return(
        <div className="p-4 m-2 mt-8 font-titillium text-sm backdrop-blur-[2px] border border-white/20 rounded-sm">
        <h1 className="text-white/30 ml-4">DIRECT CHANNELS</h1>
        <DetailsCell detailsTitle="Email" icon={EnvelopeIcon} userInfo="pmanskhosana@gmail.com" />
        <DetailsCell detailsTitle="Phone" icon={PhoneIcon} userInfo="063 893 7422" />
        <DetailsCell detailsTitle="Location" icon={MapPinIcon} userInfo="42 Angus Court 58 Kempton Road CBD Kempton Park Gauteng 1619" />
        </div>
    )
}