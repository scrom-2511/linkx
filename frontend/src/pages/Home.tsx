
import HomeRight from '../components/HomeRight'
import HomeLeft from '../components/HomeLeft'

const Home = () => {
  return (
    <div className='w-screen h-screen flex flex-row items-center gap-60 max-[1575px]:flex-col max-[1575px]:gap-20'>
        <HomeLeft/>
        <HomeRight/>
    </div>
  )
}

export default Home
