import { prisma } from "@/lib/prisma";
import PropertyGrid from "@/app/Sections/Home/Building";

export default async function Home() {
  let buildings: any[] = [];

  try {
    buildings = await prisma.building.findMany();
  } catch (error) {
    console.error("Prisma qoşulma xətası:", error);
  }

  return (
    <main>
      <PropertyGrid properties={buildings} />
    </main>
  );
}