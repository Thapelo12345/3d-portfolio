import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type PROP = { imageUrl: string };

export default function ProjectImage({ imageUrl }: PROP) {
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useGSAP(() => {
    const container = imageContainerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      
      // Get mouse position relative to the element container
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Find the center point of the container
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate percentage distance from center (-1 to 1)
      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;

      // Maximum rotation angles in degrees
      const maxRotation = 20; 

      // Note: Moving mouse UP (negative percentY) tilts card FORWARD (positive rotateX)
      // Moving mouse RIGHT (positive percentX) tilts card RIGHT (positive rotateY)
      gsap.to(image, {
        scale: 0.94,
        rotateX: -percentY * maxRotation,
        rotateY: percentX * maxRotation,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(image, {
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
        overwrite: "auto"
      });
    };

    // Attach listeners directly to avoid unnecessary state triggers
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Clean up event listeners automatically
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, { scope: imageContainerRef });

  return (
    <div
      ref={imageContainerRef}
      className="image-container flex items-center justify-center w-full md:w-1/2 h-full [perspective:1000px]"
    >
      <img
        ref={imageRef}
        className="project-image w-full md:w-150 h-80 rounded-lg [transform-style:preserve-3d]"
        src={imageUrl}
        alt="Project image"
      />
    </div>
  );
}
