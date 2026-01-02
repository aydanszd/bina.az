import { PropertyGrid } from "@/components/features/property/PropertyGrid";
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Property } from "@/types/homepage";
import { prisma } from "@/lib/prisma";

async function getBuildings(): Promise<Property[]> {
  try {
    const data = await prisma.building.findMany();
    return data.map((building) => ({
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
    })) as unknown as Property[];
  } catch (error) {
    console.error("Prisma qoşulma xətası:", error);
    return [];
  }
}

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['properties'],
    queryFn: getBuildings,
  });

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PropertyGrid />
      </HydrationBoundary>
    </main>
  );
}