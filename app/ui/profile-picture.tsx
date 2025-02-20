import Image from 'next/image';

export default function ProfilePicture({
  username,
  src,
  size,
}: {
  username: string;
  src: string;
  size: number;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-full"
      style={{ height: size, width: size }}
    >
      <Image
        src={src}
        alt={`${username}'s profile picture`}
        fill
        className="object-cover"
        sizes={`${size}px`}
      />
    </div>
  );
}
