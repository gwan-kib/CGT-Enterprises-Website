import { Star } from "lucide-react";

export function StarIllustration() {
  return (
    <div className="star-illustration" aria-hidden="true">
      <div className="star-illustration__star star-illustration__star--left">
        <Star aria-hidden="true" fill="currentColor" size="100%" strokeWidth={1.25} />
      </div>
      <div className="star-illustration__star star-illustration__star--center">
        <Star aria-hidden="true" fill="currentColor" size="100%" strokeWidth={1.25} />
      </div>
      <div className="star-illustration__star star-illustration__star--right">
        <Star aria-hidden="true" fill="currentColor" size="100%" strokeWidth={1.25} />
      </div>
    </div>
  );
}
