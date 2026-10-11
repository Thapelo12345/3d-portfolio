type PROP = {
    imageUrl: string;
}
export default function ImageHolder({ imageUrl }:PROP){
    return(
        <div
        className="w-10 h-10 mx-10"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        >

        </div>
    )
}