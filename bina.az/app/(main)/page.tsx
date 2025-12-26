import { prisma } from "@/lib/prisma";
import PropertyGrid from "@/app/Sections/Home/Building";

export default async function Home() {
  let buildings: any[] = [];

  try {
    // Bazadan məlumatı çəkirik
    buildings = await prisma.building.findMany();
  } catch (error) {
    console.error("Baza qoşulma xətası:", error);
    // Xəta olsa, buildings boş array olaraq qalacaq
  }

  return (
    <main>
      <PropertyGrid properties={buildings} />
    </main>
  );
}