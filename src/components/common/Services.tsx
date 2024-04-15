import WifiIcon from "@mui/icons-material/Wifi";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import AcUnitIcon from "@mui/icons-material/AcUnit";
export default function Services() {
  return (
    <div className="w-[80vw] flex flex-col justify-center items-center m-auto mt-8">
      <div className="font-bold text-3xl text-gray-600">Our Services</div>

      <div className="mt-4 font-semibold text-xl">
        Service at <span className="text-primary">Hoziv</span>
        <span> - 24/24 Front Desk</span>
      </div>

      <div className="flex flex-row flex-wrap gap-6 w-full justify-center items-center mt-4 mx-[-1.5rem]">
        <div className="w-1/4 p-4 border-2 rounded-md h-32">
          <div className="text-primary font-semibold mb-2">
            <WifiIcon /> Wifi
          </div>
          <div>Stay connected with high-speed internet access.</div>
        </div>
        <div className="w-1/4 p-4 border-2 rounded-md h-32">
          <div className="text-primary font-semibold mb-2">
            <RestaurantIcon /> Breakfast
          </div>
          <div>Start your day with a delicious breakfast buffet.</div>
        </div>
        <div className="w-1/4 p-4 border-2 rounded-md h-32">
          <div className="text-primary font-semibold mb-2">
            <LocalLaundryServiceIcon /> Laundry
          </div>
          <div>Keep your clothes clean and fresh with our laundry service.</div>
        </div>
        <div className="w-1/4 p-4 border-2 rounded-md h-32">
          <div className="text-primary font-semibold mb-2">
            <LocalBarIcon /> Mini-bar
          </div>
          <div>
            Enjoy a refreshing drink or snack from our in-room mini-bar.
          </div>
        </div>
        <div className="w-1/4 p-4 border-2 rounded-md h-32">
          <div className="text-primary font-semibold mb-2">
            <LocalParkingIcon /> Parking
          </div>
          <div>Park your car conveniently in our on-site parking lot.</div>
        </div>
        <div className="w-1/4 p-4 border-2 rounded-md h-32">
          <div className="text-primary font-semibold mb-2">
            <AcUnitIcon /> Air conditioning
          </div>
          <div>Stay cool and comfortable with our air conditioning system.</div>
        </div>
      </div>
    </div>
  );
}
