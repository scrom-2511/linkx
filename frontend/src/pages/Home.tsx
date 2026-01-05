import HomeBottom from "@/components/HomeBottom"
import HomeTop from "@/components/HomeTop"

const Home = () => {
  return (
    <div className="w-screen h-screen grid grid-rows-[250px_auto] sm:grid sm:grid-rows-2 p-10">
        <HomeTop/>
        <HomeBottom/>
    </div>
  )
}

export default Home
