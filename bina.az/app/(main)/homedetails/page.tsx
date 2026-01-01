import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { PropertyHeader } from '@/features/propertydetails/PropertyDetailHeader';
import { PropertyGallery } from '@/features/propertydetails/PropertyDetailGallery';
import { PropertyPlans } from '@/features/propertydetails/PropertyDetailPlans';
import { PropertyInfo } from '@/features/propertydetails/PropertyIDetailnfo';
import { PropertyFeatures } from '@/features/propertydetails/PropertyDetailFeatures';
import { PropertyParameters } from '@/features/propertydetails/PropertyDetailParameters';
import { PropertyAbout } from '@/features/propertydetails/PropertyDetailsAbout';
import { PropertyLocation } from '@/features/propertydetails/PropertyDeatilLocation';
import { PropertyListings } from '@/features/propertydetails/PropertyDetailListings';
import { PropertySidebar } from '@/features/propertydetails/PropertyDetailSidebar';
import { Property } from '@/types/homepage';

interface PageProps {
  searchParams?: Promise<{ id?: string }>;
}

export default async function PropertyDetailPage({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const propertyId = resolvedSearchParams?.id;

  if (!propertyId) {
    notFound();
  }

  const buildingData = await prisma.building.findUnique({
    where: {
      id: propertyId
    }
  });

  if (!buildingData) {
    notFound();
  }

  const relatedBuildingsData = await prisma.building.findMany({
    where: {
      location: buildingData.location,
      id: {
        not: propertyId
      }
    },
    take: 16,
    orderBy: {
      createdAt: 'desc'
    }
  });
  const property: Property = {
    id: buildingData.id,
    title: buildingData.title,
    price: buildingData.price ?? 0,
    location: buildingData.location,
    rooms: buildingData.rooms ?? undefined,
    area: buildingData.area ?? undefined,
    floor: buildingData.floor ?? undefined,
    image1: buildingData.image1 ?? undefined,
    image2: buildingData.image2 ?? undefined,
    image3: buildingData.image3 ?? undefined,
    createdAt: buildingData.createdAt.toISOString(),
    type: buildingData.type,
    property: buildingData.property,
    isNew: buildingData.isNew
  };

  const relatedProperties: Property[] = relatedBuildingsData.map(building => ({
    id: building.id,
    title: building.title,
    price: building.price ?? 0,
    location: building.location,
    rooms: building.rooms ?? undefined,
    area: building.area ?? undefined,
    floor: building.floor ?? undefined,
    image1: building.image1 ?? undefined,
    image2: building.image2 ?? undefined,
    image3: building.image3 ?? undefined,
    createdAt: building.createdAt.toISOString(),
    type: building.type,
    property: building.property,
    isNew: building.isNew
  }));

  return (
    <div className="min-h-screen mt-18 bg-white text-[#212326] antialiased max-w-7xl mx-auto">
      <PropertyHeader title={property.title} />

      <div className="max-w-350 mx-auto px-4 pb-20">
        <PropertyGallery 
          property={property} 
          relatedProperties={relatedProperties} 
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PropertyPlans />
            <PropertyInfo title={property.title} />
            <PropertyFeatures />
            <PropertyParameters />
            <PropertyAbout />
            <PropertyLocation 
              location={property.location}
              coordinates={{ lat: 40.3913, lng: 49.8571 }}
            />
            <PropertyListings propertyTitle={property.title} />
          </div>
          <div className="lg:col-span-1">
            <PropertySidebar property={property} />
          </div>
        </div>
      </div>
    </div>
  );
}