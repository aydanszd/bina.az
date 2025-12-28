import { prisma } from "@/lib/prisma";
import PropertyGrid from "@/app/Sections/Home/Building";
import type { Property } from "@/app/types/homepage";


export default async function Home() {
  let buildings: Property[] = [];

  try {
    const data = await prisma.building.findMany();
    buildings = data.map((building) => ({
      id: building.id,
      image1: building.image1 ?? undefined,
      title: building.title,
      price: building.price ?? undefined,
      rooms: building.rooms ?? undefined,
      area: building.area ?? undefined,
      floor: building.floor ?? undefined,
      location: building.location,
      createdAt: building.createdAt,
      type: building.type ?? undefined,
      property: building.property ?? undefined,
      isNew: building.isNew ?? undefined,
    })) as Property[];
    
  } catch (error) {
    console.error("Prisma qoşulma xətası:", error);
  }

  return (
    <main>
      <PropertyGrid properties={buildings} />
    </main>
  );
}