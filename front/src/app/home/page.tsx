import Image from "next/image";
import window from '../../../public/paisagens/window.png'
import start from '../../../public/2.png'
import menu from '../../../public/3.png'
import signIn from '../../../public/4.png'
import arrow from '../../../public/arrow.png'
import account from '../../../public/createaccount.png'
import clould from '../../../public/clould.png'
import { ROUTES } from "@/constants/routes";
import Link from "next/link";

const Home = () => {

    return(
        <>

        <div className="flex overflow-hidden min-h-screen flex-col items-center justify-center bg-blue-400 relative">
            <div className="flex justify-between z-0 flex-col w-full object-contain p-4">
                <div className="max-w-96 self-start object-contain">
                <Image className="w-full object-contain" src={clould} alt="" />
                </div>
            </div>
            <div className="flex max-w-4/5 z-10 p-2 m-2 rounded-xl flex-col items-center justify-center bg-blue-200">
                <Image className="bg-white w-110 rounded-xl m-2 p-2" src={window} alt="" />
                
                <div className="flex w-full items-center justify-center max-w-4/5 gap-3 rounded-xl">
                <Link href={ROUTES.start}>
                    <Image className="min-w-20 max-w-22 h-auto cursor-pointer hover:scale-x-110 p-2" src={start} alt="" />
                </Link>
                <Link href={ROUTES.home}>
                    <Image className="min-w-20 max-w-22 h-auto cursor-pointer hover:scale-x-110 p-2" src={menu} alt="" />
                </Link>
                <Link href={ROUTES.login}>
                    <Image className="min-w-20 max-w-22 h-auto cursor-pointer hover:scale-x-110 p-2" src={signIn} alt="" />
                </Link>
                </div>

                <div className="flex gap-3 items-center justify-center max-w-4/5">
                    <Image className="min-w-5 max-w-10 h-auto animate-bounce" src={arrow} alt="" />
                    <Link href={ROUTES.register} >
                        <Image className="min-w-10 max-w-40 h-auto cursor-pointer hover:scale-x-110" src={account} alt="" />
                    </Link>
                </div>
            </div>
            <div className="flex justify-between  z-0 relative flex-col w-full object-cover p-4">
                <div className="max-w-96 self-end object-cover">
                <Image className="w-full object-cover" src={clould} alt="" />
                </div>
            </div>

            </div>
      </>
    )
}

export default Home;