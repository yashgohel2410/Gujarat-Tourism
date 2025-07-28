import { cn } from "@/lib/utils"
import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  imageSrc?: string
  link?: string
  hoverEffect?: boolean
  rating?: number
  badge?: string
  className?: string
  aspectRatio?: "portrait" | "square" | "video" | "wide"
}

export function GlassCard({
  title,
  description,
  imageSrc,
  link,
  hoverEffect = true,
  rating,
  badge,
  className,
  aspectRatio = "square",
  children,
}: GlassCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const cardContent = (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-xl backdrop-blur-md border",
        "bg-white/20 dark:bg-gray-950/30 shadow-lg touch-manipulation",
        "h-full flex flex-col", // Added flex column and full height
        hoverEffect && "transition-all duration-300 ease-in-out",
        "active:scale-95 active:shadow-sm",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {imageSrc && (
        <div className={cn(
          "overflow-hidden flex-shrink-0", // Added flex-shrink-0 to prevent image from shrinking
          aspectRatio === "portrait" && "aspect-[2/3]",
          aspectRatio === "square" && "aspect-square",
          aspectRatio === "video" && "aspect-video",
          aspectRatio === "wide" && "aspect-[3/1]",
          // Default aspect ratio for consistent sizing
          !aspectRatio && "aspect-[4/3]"
        )}>
          <img
            src={imageSrc}
            alt={title}
            className={cn(
              "w-full h-full object-cover",
              hoverEffect && "group-hover:scale-110 transition-transform duration-700",
            )}
          />
        </div>
      )}
      <div className="p-5 flex-1 flex flex-col"> {/* Added flex-1 and flex-col to fill remaining space */}
        <div className="space-y-2 flex-1"> {/* Added flex-1 to push content to fill space */}
          {badge && (
            <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
              {badge}
            </span>
          )}
          <h3 className="font-medium text-lg line-clamp-2">{title}</h3> {/* Added line-clamp for consistent title height */}
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-3">{description}</p> /* Added line-clamp for consistent description height */
          )}
          {rating && (
            <div className="flex items-center space-x-1 mt-auto"> {/* Added mt-auto to push rating to bottom */}
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={cn(
                    "w-4 h-4",
                    i < rating ? "text-yellow-400" : "text-gray-300",
                  )}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs font-medium ml-1">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        {children && <div className="mt-4">{children}</div>}
      </div>
      {isHovered && hoverEffect && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-white font-medium">Explore {title}</span>
        </motion.div>
      )}
    </motion.div>
  )

  if (link) {
    return <Link to={link} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded-xl">{cardContent}</Link>
  }

  return cardContent
}