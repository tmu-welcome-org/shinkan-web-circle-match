import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/opacity.css'

type LazyImageWithSpinnerProps = {
    src: string;
    alt: string;
    className?: string | null;
}

export default function LazyImageWithSpinner({ src, alt, className }: LazyImageWithSpinnerProps) {
    return (
        <div className={`relative z-10 ${className}`}>
            <div className='z-50 absolute top-0 left-0 w-full h-full'>
                    <LazyLoadImage
                        className="z-50 w-full h-full object-cover"
                        height="100%"
                        width="100%"
                        src={src}
                        alt={alt}
                        placeholder={<span>Loading</span>}
                        effect="opacity"
                        style={{ zIndex : 50 }}
                    />
                </div>
                <div className='z-1 absolute top-0 left-0 w-full h-full flex items-center justify-center'>
                    <span className="z-1 text-green-700 loading loading-ring loading-xl scale-125"></span>  
                </div>
        </div>
    )
}