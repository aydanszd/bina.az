import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import PropertyDetail from './view';

export default async function PropertyDetailPage({
  searchParams
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const params = await searchParams;
  const propertyId = params?.id;

  if (!propertyId) {
    notFound();
  }

  const property = await prisma.building.findUnique({
    where: {
      id: propertyId
    }
  });

  if (!property) {
    notFound();
  }

  const relatedProperties = await prisma.building.findMany({
    where: {
      location: property.location,
      id: {
        not: propertyId
      }
    },
    take: 16,
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <PropertyDetail 
      property={property} 
      relatedProperties={relatedProperties || []} 
    />
  );
}