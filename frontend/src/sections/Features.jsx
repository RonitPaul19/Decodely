import FeatureCard from "../components/features/FeatureCard";
import FeaturesHeading from "../components/features/FeaturesHeading";
import featuresData from "../data/featuresData";

// Features section: lists product capabilities. The `id="features"` is
// important for anchor navigation (nav links point to '/#features').
export default function Features() {
  return (
    <section id="features" className="px-6 py-24">
      {/* Section Heading */}
      <FeaturesHeading />

      {/* Feature Cards: rendered from data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {featuresData.map((feature) => (
          <FeatureCard
            key={feature.id}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}
