// https://wongelim424.users.earthengine.app/view/tailing-dams

var sen2 = ee.ImageCollection("COPERNICUS/S2_SR"),
    dem = ee.Image("NASA/NASADEM_HGT/001"),
    aoi = 
    /* color: #d63000 */
    /* locked: true */
    ee.Geometry.Point([120.656, 16.4919]);
   

var dem_ = ee.Image(dem.select('elevation'));

// Set elevation <= 0 as transparent to mask out the sea
var dem_masked = dem_.updateMask(dem_.gt(0));

var para_dem = {  //Set parameters
  bands : 'elevation',
  min : 0,
  max : 3500,
  palette: ['0000ff', '00ffff', 'ffff00', 'ff0000', 'ffffff']
};

Map.addLayer(dem_masked, para_dem, 'DEM');  // Add to map


var sen2_median = sen2.filterBounds(aoi)
  .filterDate('2021-05-01', '2021-07-31')
  .sort('CLOUDY_PIXEL_PERCENTAGE')  // Sort from the least cloudy images
  .limit(5) // then calculate the median of the 5 least cloudy image
  .reduce(ee.Reducer.median());


// Select the cloud precentage band from sentinel-2 and set 40% as the limit
var sen2_mask = sen2_median.select(['MSK_CLDPRB_median']).lte(40);

// Mask out the sea and calculate a NDVI indices
var sen2_ndvi = sen2_median.updateMask(dem_.gt(0))
  .updateMask(sen2_mask.gt(0))
  .normalizedDifference(['B5_median', 'B4_median']);

Map.addLayer(sen2_ndvi, {'min': 0, 'max': 1},'NDVI');

// Ferric iron, Fe2+ Index
var sen2_fe = sen2_median.expression('swir / nir + g / r',{
  'swir' : sen2_median.select('B12_median'),
  'nir' : sen2_median.select('B8_median'),
  'g' : sen2_median.select('B3_median'),
  'r' : sen2_median.select('B4_median')});

sen2_fe = sen2_fe.updateMask(dem_.gt(0)).updateMask(sen2_mask.gt(0));

Map.addLayer(sen2_fe, {'min':0.3, 'max':4}, 'Fe2+');

// Center the map to the area of interest
Map.centerObject(aoi, 9)

var visParams = {bands: ['B4', 'B3', 'B2'], max: 0.3};

var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA');
var landsat2016 = l8.filterDate('2016-01-01', '2016-12-31');
Map.addLayer(landsat2016, visParams, 'l8 collection');
