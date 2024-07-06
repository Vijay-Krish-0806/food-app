'use client'
import Image from "next/image";
import Right from "../icons/Right";
import { useRouter } from "next/navigation";

const Hero = () => {
    const router = useRouter()
    return (
        <section className="hero md:mt-4 min-h-screen ">
            <div className="py-4 md:py-12 flex flex-col md:flex-row justify-center items-center">
                <div className="text-center md:text-left md:flex-1">
                    <h1 className="font-semibold text-4xl">
                        Everything will be better with one <span className="text-primary">Pizza</span>
                    </h1>
                    <p className="my-6 text-sm text-gray-500">
                        Pizza is the missing piece that makes every day complete, a simple yet delicious joy in life.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 text-sm justify-center md:justify-start">
                        <button className="bg-primary uppercase text-white px-4 py-2 rounded-full flex gap-2 items-center" onClick={() => { router.push('/menu') }}>
                            Order Now <Right />
                        </button>
                        <button className="flex items-center gap-2 py-2 border-0 font-semibold text-gray-600" onClick={() => { router.push('/about') }}>
                            Learn More <Right />
                        </button>
                    </div>
                </div>
            </div>
            <div className="relative hidden md:block">
                <Image src={'/pizza.png'} alt={'pizza'} layout="fill" objectFit={'contain'} />
            </div>
            <div className="flex flex-col mt-3">
                <div className="absolute left-0 right-0 w-full justify-start">
                    <div className="absolute left-0 -top-[70px] -z-10">
                        <Image src={'/sallad1.png'} alt={'sallad'} width={109} height={189} />
                    </div>
                    <div className="absolute -top-[100px] right-0 -z-10">
                        <Image src={'/sallad2.png'} alt={'sallad'} width={107} height={195} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
