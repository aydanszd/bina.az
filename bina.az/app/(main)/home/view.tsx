import FilterSection from "@/app/Sections/Home/Filter";
import BulidingCart from "@/app/Sections/Home/Building";
export default function HomePage() {
    return (
        <div>
            <FilterSection />
            <BulidingCart properties={[]}/>
        </div>
    )
}
