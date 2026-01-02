import React from 'react';
// import { Heart } from 'lucide-react';
// import './styles.css';
import './FeaturedInterests.module.scss';

interface CategoryCardProps {
  image: string;
  title: string;
  subtitle: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ image, title, subtitle }) => {
  return (
    <div className="category-card">
      <div className="category-card__image-wrapper">
        <img src={image} alt={title} className="category-card__image" />
      </div>
      <div className="category-card__content">
        <h3 className="category-card__title">{title}</h3>
        <p className="category-card__subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

const FeaturedInterests: React.FC = () => {
  const categories = [
    {
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=600&fit=crop',
      title: 'Kayaking Essentials',
      subtitle: "Don't row past this"
    },
    {
      image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&h=600&fit=crop',
      title: 'Needlepoint Essentials',
      subtitle: 'Patterns to thread'
    },
    {
      image: 'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=600&h=600&fit=crop',
      title: 'Cornhole Essentials',
      subtitle: 'Perfect-throw picks'
    },
    {
      image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=600&fit=crop',
      title: 'Music Essentials',
      subtitle: 'For all genres'
    }
  ];

  return (
    <section className="featured-section">
      <div className="featured-section__header">
        <h2 className="featured-section__title">Jump into featured interests</h2>
      </div>
      <div className="categories-grid">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            image={category.image}
            title={category.title}
            subtitle={category.subtitle}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedInterests;