import appConfig from '../config.json'
import { type CircleItem } from '../CircleDataHandler'
import CircleLinkButton from './CircleLinkButton'
import LazyImageWithSpinner from './LazyImageWithSpinner'

import { Swiper, SwiperSlide } from 'swiper/react'
import type { SwiperClass } from 'swiper/react'
import { useRef } from 'react'

import { IoIosClose } from 'react-icons/io'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { Pagination, Autoplay, EffectFade } from 'swiper/modules'
import CircleMailButton from './CircleMailButton'

type CircleModalProps = {
	id: string
	isOpen: boolean
	circleItem: CircleItem | undefined
	onClose: () => void
}

export default function CircleModal({ id, isOpen, circleItem, onClose }: CircleModalProps) {
	const swiperRef = useRef<SwiperClass | null>(null)

	if (!isOpen || !circleItem) {
		return null
	}

	const imagesDir = `${import.meta.env.BASE_URL}${appConfig.circle_data_dir}/${appConfig.circle_images_dir}/${id}/`

	return (
		<div className="modal modal-open" role="dialog" aria-modal="true">
			<div className="modal-box w-[80vw] h-[80vh] p-0 flex flex-col lg:max-w-[75vw] lg:h-[60vh] lg:flex-row " >
				<div className='absolute top-4 left-4 z-20'>
					<button className="btn btn-sm btn-circle bg-white/55" onClick={onClose}>
						<IoIosClose className="w-10 h-10" />
					</button>
				</div>
				{/* Swiper for multiple images */}
				{circleItem.images.length > 1 ? 
					<div className='cursor-pointer  lg:h-full lg:w-fit'>
						<style>
							{`
								#circle-modal-swiper .swiper-pagination{
									width: fit-content;
									padding: 0.4rem 0.5rem;
									border-radius: 100rem;
									background-color: rgba(255, 255, 255, 0.8);
									display: flex;
									align-items: center;
									left: 1rem;
									bottom: 1rem;
								}
								#circle-modal-swiper .swiper-pagination .swiper-pagination-bullet {
									background-color: #000000fe;
								}
								#circle-modal-swiper .swiper-pagination .swiper-pagination-bullet.swiper-pagination-bullet-active {
									background-color: #16a34a;
								}
							`}
						</style>
						<div className='modal_swiper_wrapper h-full overflow-clip w-full lg:w-fit aspect-square' onClick={() => swiperRef.current?.slideNext()}>
							<Swiper
								id='circle-modal-swiper'
								modules={[Pagination, Autoplay, EffectFade]}
								pagination={true}
								loop={true}
								effect="fade"
								fadeEffect={{ crossFade: true }}
								allowTouchMove={false}
								autoplay={{ delay: 3000, disableOnInteraction: false }}
								onSwiper={(swiper) => { swiperRef.current = swiper }}
								className='aspect-square max-h-full'
							>
								{circleItem.images.map((image, index) => (
									<SwiperSlide key={index} className='h-full h-min-1 w-min-1'>
										<LazyImageWithSpinner
											src={`${imagesDir}${image}`}
											alt={`Image ${index + 1}`}
											className="w-full h-full object-cover"
										/>
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					</div>
					: 
					// single image
					<div className='h-full overflow-clip aspect-square w-full lg:w-fit'>
						<LazyImageWithSpinner
							src={`${imagesDir}${circleItem.images[0]}`}
							alt={`Image 1`}
							className="w-full h-full object-cover"
						/>
					</div>
				}
				<div className='flex w-full justify-between gap-y-8 flex-col lg:overflow-y-auto py-5'>
					<div className='flex flex-col gap-y-8 mx-5'>
						<div>
							<h2 className="text-xl font-bold">{circleItem.circle_name}</h2>
							<p>{circleItem.catchphrase}</p>
						</div>
						<div>
							{circleItem.tags.map((tag, index) => (
								<span key={index} className="inline-block rounded-[0.3rem] bg-white text-green-700 border-green-700 border px-3 py-1 text-sm mr-2 mb-2">
									{tag}
								</span>
							))}
						</div>
						<div>
							<p className='whitespace-pre-wrap'>{circleItem.description}</p>
						</div>
					</div> 
					
					<div className='flex flex-col gap-y-3 mx-5'>
						{circleItem.links.map((link, index) => (
							<CircleLinkButton key={index} {...link} />
						))}
						{circleItem.mail &&
							<>
								<CircleMailButton email={circleItem.mail} />
							<span className='text-xs'>※ {appConfig.mail_antiSpam_char}を@に置き換えてください</span>
							</>
						}
					</div>
				</div>
			</div>
			<div className="modal-backdrop" onClick={onClose}></div>
		</div>
	)
}
