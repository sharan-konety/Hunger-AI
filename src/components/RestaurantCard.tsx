import Link from 'next/link';
import Image from 'next/image';

interface RestaurantCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  cuisine: string[];
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ id, name, image, rating, cuisine }) => {
  return (
    <Link href={`/restaurants/${id}`} className="block group">
      <div className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 flex flex-col h-full group-hover:border-cyan-200 relative">
        {/* Image container with overlay effect */}
        <div className="h-48 w-full overflow-hidden relative">
          <Image
            src={image}
            alt={`${name} restaurant interior`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            priority={false}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+pP5+XsH4/mm2x8ZhUDsJA1A3OIl9TrUMeqlqUAIHIHBJ5HU/FMDcjZd8XkPbzjsjxtOTf/9k="
          />
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Rating badge */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
            <span className="text-cyan-600 font-medium text-sm flex items-center gap-1">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
              {rating.toFixed(1)}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-medium text-slate-900 mb-3 group-hover:text-slate-800 transition-colors duration-300 leading-tight" title={name}>
            {name}
          </h3>
          
          <div className="mb-4">
            <p className="text-slate-600 text-sm font-light">
              {cuisine.join(' • ')}
            </p>
          </div>
          
          {/* View Menu button */}
          <div className="mt-auto">
            <div className="inline-flex items-center text-cyan-600 text-sm font-medium group-hover:text-cyan-700 transition-colors duration-300">
              <span>View Menu</span>
              <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Subtle border effect on hover */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-100 rounded-3xl transition-colors duration-500 pointer-events-none"></div>
      </div>
    </Link>
  );
};

export default RestaurantCard; 