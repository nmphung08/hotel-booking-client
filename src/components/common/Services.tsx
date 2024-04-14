import WifiIcon from '@mui/icons-material/Wifi';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import AcUnitIcon from '@mui/icons-material/AcUnit';
export default function Services() {
  return (
    <>
      <div>
        <span>Our Services</span>
      </div>

      <div>
        Service at <span className="mr-4 text-pink-600">Hoziv</span>
        <span>24/24 Front Desk</span>
      </div>

      <div className="divide-solid divide-y-2"></div>

      <div className="flex flex-row flex-wrap gap-2 w-[90%]">
        <div className="w-1/4">
          <div><WifiIcon /> Wifi</div>
          <div>Stay connected with high-speed internet access.</div>
        </div>
        <div className="w-1/4">
          <div><RestaurantIcon /> Breakfast</div>
          <div>Start your day with a delicious breakfast buffet.</div>
        </div>
        <div className="w-1/4">
          <div><LocalLaundryServiceIcon /> Laundry</div>
          <div>Keep your clothes clean and fresh with our laundry service.</div>
        </div>
        <div className="w-1/4">
          <div><LocalBarIcon /> Mini-bar</div>
          <div>Enjoy a refreshing drink or snack from our in-room mini-bar.</div>
        </div>
        <div className="w-1/4">
          <div><LocalParkingIcon /> Parking</div>
          <div>Park your car conveniently in our on-site parking lot.</div>
        </div>
        <div className="w-1/4">
          <div><AcUnitIcon /> Air conditioning</div>
          <div>Stay cool and comfortable with our air conditioning system.</div>
        </div>
      </div>
    </>
  )
}
