// app/homedetails/page.tsx
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import PropertyDetail from './view';

export default async function PropertyDetailPage({
  searchParams
}: {
  searchParams: { id?: string }
}) {
  const propertyId = searchParams?.id;

  // ID yoxdursa 404
  if (!propertyId) {
    notFound();
  }

  // Əsas elanı gətir
  const property = await prisma.building.findUnique({
    where: {
      id: propertyId
    }
  });

  // Elan tapılmazsa 404
  if (!property) {
    notFound();
  }

  // Oxşar elanları gətir
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