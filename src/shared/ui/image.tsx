import NextImage, { type ImageProps as NextImageProps } from "next/image";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@shared/lib/utils/cn";

const imageVariants = cva("", {
  variants: {
    /**
     * Controls the object-fit behavior of the image.
     */
    fit: {
      cover: "object-cover",
      contain: "object-contain",
      fill: "object-fill",
      none: "object-none",
      "scale-down": "object-scale-down",
    },
    /**
     * Controls the border-radius of the image.
     */
    rounded: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      full: "rounded-full",
    },
    /**
     * Aspect ratio of the image wrapper.
     */
    aspect: {
      auto: "",
      square: "aspect-square",
      video: "aspect-video",
      "4/3": "aspect-[4/3]",
      "3/2": "aspect-[3/2]",
      "16/9": "aspect-[16/9]",
    },
  },
  defaultVariants: {
    fit: "cover",
    rounded: "md",
    aspect: "auto",
  },
});

type ImageVariants = VariantProps<typeof imageVariants>;

type ImageProps = Omit<NextImageProps, "className"> &
  ImageVariants & {
    /**
     * Extra classes for the outer wrapper div.
     * Used when `fill={true}` or `aspect` is set.
     */
    wrapperClassName?: string;
    /**
     * Extra classes for the <img> element itself.
     */
    className?: string;
  };

/**
 * Reusable Image component built on top of next/image.
 *
 * Supports all next/image optimization props plus:
 * - `fit`     — object-fit utility (cover | contain | fill | none | scale-down)
 * - `rounded` — border-radius shorthand
 * - `aspect`  — aspect-ratio wrapper preset (square | video | 4/3 | 3/2 | 16/9)
 *
 * When `fill` is used, the component automatically wraps the image in a
 * `relative` positioned div so the fill layout works correctly.
 *
 * @example
 * // Fixed size, rounded avatar
 * <Image src="/avatar.png" alt="User" width={48} height={48} rounded="full" fit="cover" />
 *
 * @example
 * // Responsive fill inside a known-height container
 * <Image src="/hero.jpg" alt="Hero" fill fit="cover" aspect="video" />
 *
 * @example
 * // Blur placeholder + quality
 * <Image src="/photo.jpg" alt="" width={800} height={600} placeholder="blur" blurDataURL="..." quality={90} />
 */
function Image({
  className,
  wrapperClassName,
  fit,
  rounded,
  aspect,
  fill,
  sizes,
  ...props
}: ImageProps) {
  const imgClass = cn(imageVariants({ fit, rounded }), className);

  // When `fill` is true next/image requires a positioned parent.
  if (fill) {
    return (
      <div
        data-slot="image-wrapper"
        className={cn(
          "relative overflow-hidden",
          imageVariants({ aspect }),
          wrapperClassName,
        )}
      >
        <NextImage
          data-slot="image"
          fill
          sizes={sizes ?? "100vw"}
          className={imgClass}
          {...props}
        />
      </div>
    );
  }

  // For fixed / responsive images (width + height supplied).
  return (
    <NextImage
      data-slot="image"
      sizes={sizes}
      className={cn(imageVariants({ aspect }), imgClass)}
      {...props}
    />
  );
}

export { Image, imageVariants };
export type { ImageProps };
