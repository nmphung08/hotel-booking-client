export default function Carousel() {
  return (
    <div className="carousel">
      <div className="overlay"></div>
      <div className="absolute translate-x-[-50%] translate-y-[-50%] top-1/2 left-1/2 text-white flex flex-col justify-center items-center drop-shadow-outline tracking-wider">
        <div className="text-2xl font-semibold">
          Welcome to <span className="text-teal-200">Hoziv Hotel</span>
        </div>
        <div>Experience the Best Hospitality in Town</div>
      </div>
    </div>
  );
}
