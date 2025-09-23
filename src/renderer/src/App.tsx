import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import SharedLayout from './components/SharedLayout'

import ErrNotFound from './components/ErrNotFound'
import NetWork from './components/NetWork'

function App(): React.JSX.Element {
  // const isLoading = useAtomValue(isLoadingAtom)
  // if (isLoading) {
  //   console.log(isLoading)
  //   return (
  //     <div className="font-extrabold w-full h-full flex items-center justify-center text-white">
  //       Analize your PC <Cog className="animate-sping" />
  //     </div>
  //   )
  // }
  return (
    <>
      <div className="p-3 w-full h-full  ">
        <div className="sm:block xl:hidden w-full h-full bg-background sm:z-100 -xl:z-100 absolute  top-0 left-0 text-white font-extrabold flex justify-center items-cen    ">
          <div className="text-xl text-center my-[30%] ">
            This application is not available in small screens
          </div>
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SharedLayout />}>
              <Route index element={<Home />} />
              <Route path="network" element={<NetWork />} />
            </Route>
            <Route path="*" element={<ErrNotFound err={'Err'} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
