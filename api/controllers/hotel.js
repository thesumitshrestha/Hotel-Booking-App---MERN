import Hotel from '../models/Hotel.js';

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
  const id = req.params.id;
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

export const getHotel = async (req, res, next) => {
  const id = req.params.id;
  try {
    const hotel = await Hotel.findById(id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};
export const getAllHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {

const hotels = await Hotel.find({featured:req.query.featured}).limit(req.query.limit)

res.status(200).json(hotels)

} catch(err) {

next(err)

}

}
  // try {
  //   const { limit, featured } = req.query;
  //   const hotels = await Hotel.find({ featured: featured }).limit(limit);
  //   return res.status(200).json(hotels);
  // } catch (err) {
  //   next(err);
  // }
};

export const deleteHotel = async (req, res) => {
  const id = req.params.id;
  try {
    await Hotel.findByIdAndDelete(id);
    res.status(200).json('Hotel has been deleted');
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(',');
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  const hotelCount = await Hotel.countDocuments({ type: 'hotel' });
  const apartmentCount = await Hotel.countDocuments({ type: 'apartment' });
  const resortCount = await Hotel.countDocuments({ type: 'resort' });
  const villaCount = await Hotel.countDocuments({ type: 'villa' });
  const cabinCount = await Hotel.countDocuments({ type: 'cabin' });
  res.status(200).json([
    { type: 'hotel', count: hotelCount },
    { type: 'apartments', count: apartmentCount },
    { type: 'resorts', count: resortCount },
    { type: 'villas', count: villaCount },
    { type: 'cabins', count: cabinCount },
  ]);
};
