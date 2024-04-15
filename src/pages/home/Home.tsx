import {
  AvailableRoomsSearch,
  Carousel,
  Parallax,
  Services,
} from "../../components/common";

export default function Home() {
  return (
    <div className="w-full h-full below-navbar">
      <Carousel />
      <AvailableRoomsSearch />
      <Services />
      <Parallax />
    </div>
  );
}
