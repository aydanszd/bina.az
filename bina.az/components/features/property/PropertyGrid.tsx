"use client"
import { PropertyCard } from './PropertyCard';
import { BinaFilter } from './BinaFilters';
import { useProperties } from '@/hooks/useProperties';
import { usePropertyFilters } from '@/hooks/usePropertyFilters';

export function PropertyGrid() {
    const { properties, isLoading, isError, error } = useProperties();
    const { filteredProperties, handleFilterChange } = usePropertyFilters(properties);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Yüklənir...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-lg shadow-md">
                    <p className="text-red-600 text-lg mb-4">Xəta baş verdi</p>
                    <p className="text-gray-600">{error instanceof Error ? error.message : 'Məlumatlar yüklənmədi'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <BinaFilter
                onFilterChange={handleFilterChange}
                totalCount={filteredProperties.length}
                isLoading={isLoading}
            />

            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Ev alqı-satqısı elanları</h1>
                    <p className="text-gray-600">{filteredProperties.length} elan tapıldı</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProperties.length > 0 ? (
                        filteredProperties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20">
                            <p className="text-gray-500 text-lg mb-2">Axtarış nəticəsi tapılmadı</p>
                            <p className="text-gray-400">Filter parametrlərini dəyişdirərək yenidən cəhd edin</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}