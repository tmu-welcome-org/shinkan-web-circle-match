import './App.css'
import appConfig from './config.json'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FaBars, FaArrowLeft, FaSearch, FaHeart } from 'react-icons/fa'
import { IoIosClose } from 'react-icons/io'

import CircleDataHandler, { type CircleData } from './CircleDataHandler'
import { useSelectedTag } from './contexts/selectedTag'

import SideMenuModeButton from './components/SideMenuModeButton'
import CircleSearchCheckBox from './components/CircleSearchCheckBox'
import CircleCard from './components/CircleCard'
import CircleModal from './components/CircleModal'


function App() {
  const [circleData, setCircleData] = useState<CircleData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCircleId, setSelectedCircleId] = useState<string | null>(null)
  const [isCircleModalOpen, setIsCircleModalOpen] = useState(false)
  const { getSelectedTags, filterCirclesByTags } = useSelectedTag()


  const location = useLocation()

  const currentMode = (() => {
    if (location.pathname === "/favorite") {
      return "favorite"
    } else {
      return "search"
    }
  })()

  const modeTitleMap = {
    search: "サークル検索",
    favorite: "お気に入り"
  } as const 

  const pageTitle = modeTitleMap[currentMode] || "サークル検索"

  useEffect(() => {
    CircleDataHandler.fetchData()
      .then((data) => {
        setCircleData(data)
        setIsLoading(false)
      })
      .catch((e: unknown) => {
        console.error(e)
        setIsLoading(false)
        setError(e instanceof Error ? e.message : 'Error fetching circle data')
        // show error modal
        ; (document.getElementById("modal-error") as HTMLDialogElement)?.showModal()
      })

  }, [])

  useEffect(() => {
    document.title = `${pageTitle || "サークル検索"} | ${circleData?.metadata.year || ""} サークル紹介Web`
  }, [pageTitle, circleData?.metadata.year])

  const handleCardClick = (id: string) => {
    setSelectedCircleId(id)
    setIsCircleModalOpen(true)
  }

  const closeCircleModal = () => {
    setIsCircleModalOpen(false)
  }


  return (
    <>
      
      {/* Loading Screen. will disappear gradiently */}
      <div className={isLoading ? "fixed inset-0 bg-white z-50 flex flex-col items-center justify-center transform-all duration-500 ease-in-out" : "fixed inset-0 bg-white z-50 flex flex-col items-center justify-center transform-all duration-500 ease-in-out opacity-0 pointer-events-none"}>
        <span className="loading loading-ring loading-xl text-green-700"></span>
        <span>Loading...</span>
      </div>

      <div className="drawer lg:drawer-open">
        <input id="slide-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-start ">
          <div className='z-80 flex flex-row sticky top-0 left-0 w-full items-center justify-between px-7 py-4 gap-x-8 bg-white/80 backdrop-blur-sm '>
              <label htmlFor="slide-drawer" className="drawer-button lg:hidden rounded-full">
                  <FaBars className="w-12 h-12 p-2 text-green-700 rounded-2 transition hover:bg-green-700 hover:text-white hover:cursor-pointer" />
              </label>
            <h1 className='text-xl font-bold'>
              {pageTitle}
              {currentMode === "search" && circleData ? ` - ${Object.keys(filterCirclesByTags(circleData)?.circles || {}).length}件` : ""}
            </h1>
          </div>
          <div className='w-full grid grid-cols-[repeat(auto-fit,minmax(--spacing(76),1fr))] gap-4 p-7 justify-items-center'>
            {/* {Object.entries(circleData?.circles || {}).map(([id, circleItem]) => (
              <CircleCard key={id} id={id} highlighted_tags={["週1〜2回", "運動系"]} circleItem={circleItem} onFavoriteClicked={(id) => {console.log(`${id} fav clicked!`)}} onCardClick={handleCardClick} />
            ))} */}
            {currentMode === "search" && (
              Object.entries(filterCirclesByTags(circleData as CircleData)?.circles || {}).map(([id, circleItem]) => (
                <CircleCard key={id} id={id} highlighted_tags={getSelectedTags()} circleItem={circleItem} onFavoriteClicked={(id) => {console.log(`${id} fav clicked!`)}} onCardClick={handleCardClick} />
              ))
            )}
            {currentMode === "favorite" && (
              Object.entries(circleData?.circles || {}).map(([id, circleItem]) => (
                <CircleCard key={id} id={id} highlighted_tags={[]} circleItem={circleItem} onFavoriteClicked={(id) => {console.log(`${id} fav clicked!`)}} onCardClick={handleCardClick} />
              )) 
            )}
          </div>
        </div>
        <div className="drawer-side z-200">
            <label htmlFor="slide-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <div className="menu bg-base-200 min-h-full lg:w-100 px-7 py-4  md:w-[60vw]">
            <div className='flex flex-col gap-y-4 items-center mb-8'>
              <div className='w-full relative flex gap-x-8 items-center justify-center'>
                  <IoIosClose className="w-12 h-12 py-2 scale-150 shrink-0 text-green-700 transform lg:hidden" onClick={() => (document.getElementById("slide-drawer") as HTMLInputElement)?.click()}/>
                  <a href={appConfig.home_url} className='group relative text-l flex gap-x-4 w-full pt-2 pb-2 items-center justify-center bg-white text-green-700 border-green-700 border rounded-full transition hover:bg-green-700 hover:text-white'>
                    <FaArrowLeft className="absolute inline-block w-5 h-5 left-5 group-hover:translate-x-[-0.4rem] transition-all" />
                    <span>{isLoading ? "--" : circleData?.metadata.year} 新歓Web</span>
                  </a>
              </div>
                  
                  <h1 className="text-2xl font-bold ">{isLoading ? "--" : circleData?.metadata.year} サークル紹介Web</h1>
                  <p className='w-fit border-b-0 transition-all hover:border-b cursor-pointer' onClick={()=>(document.getElementById("modal-license") as HTMLDialogElement)?.showModal()}>&copy; 東京都立大学 中央新歓</p>
              </div>
              <div className='flex flex-col gap-y-5'>
                {/* <SideMenuModeButton
                  key = "favorite"
                  button_label={<><FaHeart className="w-6 h-6 text-green-700" /><span className='font-bold'>お気に入り</span></>}
                  children={<></>}
                  targetPath="/favorite"
                >
                </SideMenuModeButton> */}
                <SideMenuModeButton
                  key = "search"
                  button_label={<><FaSearch className="w-6 h-6 text-green-700" /><span className='font-bold'>サークル検索</span></>}
                  children={<>
                    {Object.entries(appConfig.tags_category.single_select).map(([label, items]) => (
                      <CircleSearchCheckBox key={label} label={label} filterCategory="single" items={items} />
                    ))}
                    {Object.entries(appConfig.tags_category.multi_select).map(([label, items]) => (
                      <CircleSearchCheckBox key={label} label={label} filterCategory="multi" items={items} />
                    ))}
                  </>}
                  targetPath="/"
                >
                </SideMenuModeButton>
              </div>
          </div>
        </div>
      </div>
      <dialog id="modal-license" className="modal">
        <div className="modal-box">
          <div className='flex gap-x-[1rem] items-end'>
            <p>&copy; 東京都立大学 中央新歓</p>
            <span className='text-slate-500 text-xs'>Made by S.D B4 at TMU SD CS </span>
          </div>
          <p>※団体紹介文などの広報コンテンツは各団体に帰属します</p>
          <p>※掲載申請のあった団体のみ掲載しています</p>
          <div className="w-full h-px bg-slate-300 my-2"></div>
          <div>
            <p>Ver: {import.meta.env.VITE_APP_VERSION}</p>
            <p>Circle Data Build: {isLoading ? "Loading..." : circleData?.metadata.build}</p>
          </div>
          <a href={appConfig.repo_url} className="btn mt-4" >
            Source Github Repo
          </a>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">閉じる</button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="modal-error" className="modal">
        <div className="modal-box">
          <h1 className='text-2xl font-bold text-red-500'>エラー</h1>
          <p>{error}</p>
          <div className="w-full h-px bg-slate-300 my-2"></div>
          <div>
            <p>Ver: {import.meta.env.VITE_APP_VERSION}</p>
            <p>Circle Data Build: {isLoading ? "Loading..." : circleData?.metadata.build}</p>
          </div>
          <div className="w-full h-px bg-slate-300 my-2"></div>
          <p>時間を置いて再度アクセスしてください。<br />解消しない場合は中央新歓までご連絡ください</p>
          <a href={appConfig.home_url} className="btn">新歓Webへ戻る</a>
        </div>
      </dialog>

      <CircleModal
        id={selectedCircleId ?? ''}
        isOpen={isCircleModalOpen}
        circleItem={selectedCircleId ? circleData?.circles[selectedCircleId] : undefined}
        onClose={closeCircleModal}
      />
    </>
  )
}

export default App
