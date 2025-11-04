import Link from "next/link"
import { Spotlight } from "./ui/Spotlight"
import { Button } from "./ui/moving-border";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";


const clientTestimonials = [
  {
    quote:
      'Their guidance transformed a stressful legal process into a clear path forward. I felt supported and well-informed at every step — outstanding representation.',
    name: 'Alex Johnson',
    title: 'Personal Injury Client',
  },
  {
    quote:
      "The team’s communication and attention to detail were exceptional. They prepared me thoroughly for every meeting and helped secure a favorable outcome.",
    name: 'Samantha Lee',
    title: 'Family Law Client',
  },
  {
    quote:
      "I gained confidence thanks to their expert advice. They crafted a strong strategy and negotiated on my behalf with professionalism and care.",
    name: 'Michael Chen',
    title: 'Employment Law Client',
  },
  {
    quote:
      'They understood the complexities of my case and advocated decisively. Their experience made all the difference in reaching the resolution I needed.',
    name: 'Emily Taylor',
    title: 'Civil Litigation Client',
  },
  {
    quote:
      'Their legal team protected my business interests and handled negotiations skillfully. I highly recommend them for commercial and contract matters.',
    name: 'Chris Morales',
    title: 'Corporate Client',
  },
];

function HeroSection() {
    return (
    <div
    className="h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-visible mx-auto py-10 md:py-0"
    >
        <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
        <div className="pb-10 pt-40 m-0 relative z-10 w-full text-center" >
            <h1
            className="mt-20 md:mt-0 mb-0 pb-5 text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-normal"
            >Care Legal</h1>
            <p
            className="mt-0 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto"
            >Dedicated to justice, Committed to you.</p>
            
        </div>

         <div className=" w-full  relative flex flex-col items-center justify-center overflow-hidden">
                 <h2 className="text-3xl font-bold text-center mb-8 z-10">Our Clients</h2>
                 <div className="flex justify-center w-full overflow-hidden px-4 sm:px-6 lg:px-8">
                     <div className="w-full max-w-6xl">
                     <InfiniteMovingCards
                         items={clientTestimonials}
                         direction="right"
                         speed="slow"
               />
                     </div>
                 </div>
             </div>
        </div>
     
  )
}

export default HeroSection
