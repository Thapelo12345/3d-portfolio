type PROP = { 
    imageUrls: string;
    leftPosition: number;
 };

export default function MobileProjectImage({ imageUrls, leftPosition }: PROP) {
  return (
    <div className={`left-[${leftPosition}%]absolute top-0 hover:scale-125 transition-all duration-500 bg-transparent w-[59%] h-full md:h-80 rounded-lg`}>
      <img className="w-50 h-full" src={imageUrls} alt="Project image" />
    </div>
  );
}
